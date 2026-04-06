import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

// Simple in-memory rate limiting storage
// In production, consider using Redis or a database
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = {
  maxRequests: 3,
  windowMs: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
};

function getRealIP(request: Request): string {
  // Try to get real IP from common headers (for production behind proxy/CDN)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip'); // Cloudflare
  
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, get the first one
    return forwardedFor.split(',')[0].trim();
  }
  
  if (realIP) return realIP;
  if (cfConnectingIP) return cfConnectingIP;
  
  // Fallback for development
  return 'unknown-ip';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitStore.get(ip);
  
  if (!userLimit) {
    // First request from this IP
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
    return false;
  }
  
  // Check if the time window has expired
  if (now > userLimit.resetTime) {
    // Reset the limit
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
    return false;
  }
  
  // Check if under the limit
  if (userLimit.count < RATE_LIMIT.maxRequests) {
    userLimit.count++;
    return false;
  }
  
  // Over the limit
  return true;
}

function getResetTimeRemaining(ip: string): number {
  const userLimit = rateLimitStore.get(ip);
  if (!userLimit) return 0;
  
  const remaining = Math.max(0, userLimit.resetTime - Date.now());
  return Math.ceil(remaining / 1000); // Return seconds
}

// Clean up old entries periodically (basic cleanup)
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, 60 * 60 * 1000); // Clean up every hour

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.error('RESEND_API_KEY is not defined in environment variables');
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export const POST: APIRoute = async ({ request }) => {
  console.log('=== BOOKING API CALLED ===');
  console.log('Request method:', request.method);
  console.log('Request headers:', Object.fromEntries(request.headers.entries()));
  
  // Get client IP and check rate limit
  const clientIP = getRealIP(request);
  console.log('Client IP:', clientIP);
  
  if (isRateLimited(clientIP)) {
    const resetTimeRemaining = getResetTimeRemaining(clientIP);
    const hoursRemaining = Math.floor(resetTimeRemaining / 3600);
    const minutesRemaining = Math.floor((resetTimeRemaining % 3600) / 60);
    
    console.log(`Rate limit exceeded for IP: ${clientIP}`);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Límite de solicitudes excedido. Has alcanzado el máximo de 3 solicitudes por día.',
      rateLimitExceeded: true,
      resetTime: `${hoursRemaining}h ${minutesRemaining}m`,
      message: `Podrás enviar nuevas solicitudes en ${hoursRemaining > 0 ? hoursRemaining + ' horas y ' : ''}${minutesRemaining} minutos.`
    }), {
      status: 429, // Too Many Requests
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': Math.ceil(Date.now() / 1000 + resetTimeRemaining).toString(),
      },
    });
  }
  
  console.log('Environment check:');
  console.log('- RESEND_API_KEY exists:', !!import.meta.env.RESEND_API_KEY);
  console.log('- RESEND_API_KEY preview:', import.meta.env.RESEND_API_KEY?.substring(0, 10) + '...');
  console.log('- RESEND_AUDIENCE_ID:', import.meta.env.RESEND_AUDIENCE_ID);
  
  try {
    // Check if Resend is properly configured
    if (!resend) {
      console.error('Resend is not configured. Please check your RESEND_API_KEY environment variable.');
      return new Response(JSON.stringify({
        success: false,
        error: 'Email service is not configured. Please contact support.'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const data = await request.formData();
    const firstName = data.get('firstName') as string;
    const lastName = data.get('lastName') as string;
    const email = data.get('email') as string;
    const countryCode = data.get('countryCode') as string;
    const phone = data.get('phone') as string;
    const honeypot = data.get('honeypot') as string;

    // Honeypot check — bots fill hidden fields; respond with fake success
    if (honeypot) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !countryCode) {
      return new Response(JSON.stringify({
        success: false,
        error: 'All fields are required'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // First and last name must be at least 2 characters
    if (firstName.trim().length < 2 || lastName.trim().length < 2) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Please write at least a first name and a last name'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Spam detection on name fields
    const fullName = `${firstName} ${lastName}`;
    const nameLetters = fullName.replace(/[^a-zA-Z]/g, '');
    if (nameLetters.length > 4 && (fullName.match(/[A-Z]/g) || []).length / nameLetters.length > 0.7) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Please enter a valid name'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid email format'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const fullPhone = `${countryCode}${phone}`;

    console.log('Starting email sending process...', { firstName, lastName, email, fullPhone });

    // Variables to store email IDs
    let notificationEmailId = null;
    let confirmationEmailId = null;

    // Send notification email to the business
    try {
      const notificationEmail = await resend.emails.send({
        from: 'Casa del Jaguar <noreply@casadeljaguariquitos.com>',
        to: ['ayahuascamother@gmail.com'], // Replace with your business email
        subject: '🏛️ Nueva Solicitud de Reserva - Casa del Jaguar',
        html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
          <div style="background: linear-gradient(135deg, #D99D55 0%, #B8854A 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
              🏛️ Casa del Jaguar
            </h1>
            <p style="color: #fffcf6; margin: 10px 0 0 0; font-size: 16px;">
              Nueva Solicitud de Reserva
            </p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #2D3748; margin-bottom: 20px; font-size: 22px;">
              Detalles del Huésped
            </h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 0; color: #4A5568; font-weight: 600; width: 30%;">Nombre:</td>
                <td style="padding: 12px 0; color: #2D3748;">${firstName} ${lastName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 0; color: #4A5568; font-weight: 600;">Email:</td>
                <td style="padding: 12px 0; color: #2D3748;">
                  <a href="mailto:${email}" style="color: #D99D55; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 0; color: #4A5568; font-weight: 600;">Teléfono:</td>
                <td style="padding: 12px 0; color: #2D3748;">
                  <a href="tel:${fullPhone}" style="color: #D99D55; text-decoration: none;">${fullPhone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #4A5568; font-weight: 600;">Fecha:</td>
                <td style="padding: 12px 0; color: #2D3748;">${new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</td>
              </tr>
            </table>
            
            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #D99D55;">
              <p style="color: #4A5568; margin: 0; font-style: italic;">
                📩 Recuerda contactar al huésped lo antes posible para confirmar la disponibilidad y coordinar los detalles de su retiro espiritual.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}" style="background: #D99D55; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
                Responder al Huésped
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #718096; font-size: 14px;">
            <p>© ${new Date().getFullYear()} Casa del Jaguar - Centro de Medicina Ancestral</p>
          </div>
        </div>
      `,
    });

    console.log('Notification email sent successfully:', notificationEmail.data);
    notificationEmailId = notificationEmail.data?.id;
    
    } catch (emailError) {
      console.error('Error sending notification email:', emailError);
      console.error('Error details:', JSON.stringify(emailError, null, 2));
      // Don't throw here, continue with confirmation email
    }

    // Send confirmation email to the customer
    try {
      const confirmationEmail = await resend.emails.send({
        from: 'Casa del Jaguar <noreply@casadeljaguariquitos.com>',
      to: [email],
      subject: '🙏 Confirmación de Solicitud - Casa del Jaguar',
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
          <div style="background: linear-gradient(135deg, #D99D55 0%, #B8854A 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
              🏛️ Casa del Jaguar
            </h1>
            <p style="color: #fffcf6; margin: 10px 0 0 0; font-size: 16px;">
              Centro de Medicina Ancestral
            </p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #2D3748; margin-bottom: 20px; font-size: 22px;">
              ¡Gracias por tu interés, ${firstName}!
            </h2>
            
            <p style="color: #4A5568; line-height: 1.6; margin-bottom: 20px;">
              Hemos recibido tu solicitud de reserva para participar en nuestro retiro de medicina ancestral. Nos complace saber de tu interés en este viaje de transformación personal.
            </p>
            
            <div style="background: #f0fff4; padding: 20px; border-radius: 8px; border-left: 4px solid #38a169; margin: 20px 0;">
              <h3 style="color: #2f855a; margin: 0 0 10px 0; font-size: 18px;">
                ✅ Tu solicitud ha sido enviada exitosamente
              </h3>
              <p style="color: #4A5568; margin: 0; line-height: 1.5;">
                Nuestro equipo revisará tu solicitud y se pondrá en contacto contigo dentro de las próximas 24 horas para:
              </p>
            </div>
            
            <ul style="color: #4A5568; line-height: 1.6; margin: 20px 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">📅 <strong>Confirmar disponibilidad</strong> para las fechas de tu preferencia</li>
              <li style="margin-bottom: 8px;">💬 <strong>Realizar una entrevista</strong> personal para conocerte mejor</li>
              <li style="margin-bottom: 8px;">📋 <strong>Proporcionar información detallada</strong> sobre el retiro y preparación</li>
              <li style="margin-bottom: 8px;">💳 <strong>Coordinar el proceso de reserva</strong> y métodos de pago</li>
            </ul>
            
            <div style="background: #fffbf0; padding: 20px; border-radius: 8px; border-left: 4px solid #D99D55; margin: 20px 0;">
              <h3 style="color: #B8854A; margin: 0 0 10px 0; font-size: 18px;">
                🌿 ¿Qué sigue ahora?
              </h3>
              <p style="color: #4A5568; margin: 0; line-height: 1.5;">
                Mientras esperás nuestro contacto, te recomendamos prepararte mentalmente y espiritualmente para esta experiencia transformadora. Mantén una mente abierta y un corazón dispuesto al cambio.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #4A5568; margin-bottom: 20px;">
                Si tenés alguna pregunta urgente, no dudes en contactarnos:
              </p>
              <a href="tel:${fullPhone}" style="background: #D99D55; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; margin-right: 10px;">
                📞 Llamanos
              </a>
              <a href="mailto:info@casadeljaguar.com" style="background: #2D3748; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
                📧 Email
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #718096; font-size: 14px;">
            <p>© ${new Date().getFullYear()} Casa del Jaguar - Centro de Medicina Ancestral</p>
            <p>Iquitos, Perú | Un viaje hacia tu verdadero ser</p>
          </div>
        </div>
      `,
    });

    console.log('Confirmation email sent successfully:', confirmationEmail.data);
    confirmationEmailId = confirmationEmail.data?.id;
    
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      console.error('Error details:', JSON.stringify(emailError, null, 2));
      // Don't throw here, as the notification email was successful
    }

    // Add to audience/mailing list if RESEND_AUDIENCE_ID is provided
    if (import.meta.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email: email,
          firstName: firstName,
          lastName: lastName,
          audienceId: import.meta.env.RESEND_AUDIENCE_ID,
        });
      } catch (audienceError) {
        console.log('Note: Could not add to audience, but emails were sent successfully', audienceError);
      }
    }

    // Get current rate limit status for headers
    const currentLimit = rateLimitStore.get(clientIP);
    const remaining = currentLimit ? Math.max(0, RATE_LIMIT.maxRequests - currentLimit.count) : RATE_LIMIT.maxRequests - 1;

    return new Response(JSON.stringify({
      success: true,
      message: 'Booking request sent successfully',
      notificationId: notificationEmailId,
      confirmationId: confirmationEmailId,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': currentLimit ? Math.ceil(currentLimit.resetTime / 1000).toString() : Math.ceil((Date.now() + RATE_LIMIT.windowMs) / 1000).toString(),
      },
    });

  } catch (error) {
    console.error('Booking form error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to send booking request. Please try again.',
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
