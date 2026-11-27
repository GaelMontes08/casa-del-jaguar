import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { formatRetreatDate, getDepartureDate, isValidArrival } from '@/utils/retreat-dates';
import { escapeHtml } from '@/utils/html';

export const prerender = false;

// In-memory rate limits do not hold on Vercel: each serverless instance has
// its own memory and a cold start clears it, so a "3 per day" promise was false.
// Honeypot and field checks stay. A real shared limit needs a store such as
// Upstash Redis (free tier) or Vercel KV. Neither is wired up here.

const BUSINESS_PHONE_TEL = '+51917811803';

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export const POST: APIRoute = async ({ request }) => {
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
    const arrivalDate = data.get('arrivalDate');

    if (arrivalDate !== null && arrivalDate !== '' &&
        (typeof arrivalDate !== 'string' || !isValidArrival(arrivalDate))) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Please choose a valid arrival date, today or later (Iquitos time).'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const preferredDatesHtml = typeof arrivalDate === 'string' && arrivalDate
      ? `<div style="background: #fffbf0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <strong>Fechas preferidas (sujetas a confirmación):</strong>
          <p>Llegada: ${escapeHtml(formatRetreatDate(arrivalDate, 'es'))}<br>
          Salida: ${escapeHtml(formatRetreatDate(getDepartureDate(arrivalDate), 'es'))}<br>
          7 días y 6 noches</p>
        </div>`
      : '';

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

    const age = Number(data.get('age'));
    if (!Number.isInteger(age) || age < 18 || age > 120) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Age must be between 18 and 120'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const medications = String(data.get('medications') ?? '').trim();
    const doctor = String(data.get('doctor') ?? '').trim();
    if (medications.length < 2 || doctor.length < 2) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Medications and doctor contact are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const yesNoFields = ['antidepressants', 'heart', 'bloodPressure', 'seizures', 'psychiatric', 'recentDrugs'] as const;
    const answers: Record<string, string> = {};
    for (const field of yesNoFields) {
      const value = String(data.get(field) ?? '');
      if (value !== 'yes' && value !== 'no') {
        return new Response(JSON.stringify({
          success: false,
          error: 'Please answer every health question'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      answers[field] = value;
    }
    const pregnancy = String(data.get('pregnancy') ?? '');
    if (pregnancy !== 'yes' && pregnancy !== 'no' && pregnancy !== 'na') {
      return new Response(JSON.stringify({
        success: false,
        error: 'Please answer the pregnancy question'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const fullPhone = `${countryCode}${phone}`;
    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(fullPhone);
    const safeMedications = escapeHtml(medications);
    const safeDoctor = escapeHtml(doctor);
    const healthRows = [
      ['Edad', String(age)],
      ['Medicamentos', safeMedications],
      ['Antidepresivos o IMAO', escapeHtml(answers.antidepressants)],
      ['Embarazo o lactancia', escapeHtml(pregnancy)],
      ['Corazón', escapeHtml(answers.heart)],
      ['Presión arterial', escapeHtml(answers.bloodPressure)],
      ['Convulsiones', escapeHtml(answers.seizures)],
      ['Psicosis, bipolar o esquizofrenia', escapeHtml(answers.psychiatric)],
      ['Drogas recientes', escapeHtml(answers.recentDrugs)],
      ['Médico', safeDoctor],
    ].map(([label, value]) => `<tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px 0; color: #4A5568; font-weight: 600;">${label}</td><td style="padding: 8px 0; color: #2D3748;">${value}</td></tr>`).join('');

    // Variables to store email IDs
    let notificationEmailId = null;
    let confirmationEmailId = null;

    // Send notification email to the business
    try {
      const notificationEmail = await resend.emails.send({
        from: 'Casa del Jaguar <noreply@casadeljaguariquitos.com>',
        to: ['info@casadeljaguariquitos.com'],
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
                <td style="padding: 12px 0; color: #2D3748;">${safeFirstName} ${safeLastName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 0; color: #4A5568; font-weight: 600;">Email:</td>
                <td style="padding: 12px 0; color: #2D3748;">
                  <a href="mailto:${safeEmail}" style="color: #D99D55; text-decoration: none;">${safeEmail}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 0; color: #4A5568; font-weight: 600;">Teléfono:</td>
                <td style="padding: 12px 0; color: #2D3748;">
                  <a href="tel:${safePhone}" style="color: #D99D55; text-decoration: none;">${safePhone}</a>
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
            <h2 style="color: #2D3748; margin: 24px 0 12px; font-size: 20px;">Solicitud de salud</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              ${healthRows}
            </table>
            <p style="color: #4A5568;">El depósito de $100 USD se devuelve si la solicitud se rechaza por seguridad. La plaza no está confirmada.</p>
            ${preferredDatesHtml}
            
            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #D99D55;">
              <p style="color: #4A5568; margin: 0; font-style: italic;">
                📩 Recuerda contactar al huésped lo antes posible para confirmar la disponibilidad y coordinar los detalles de su retiro espiritual.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${safeEmail}" style="background: #D99D55; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
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

    notificationEmailId = notificationEmail.data?.id;
    
    } catch {
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
              ¡Gracias por tu interés, ${safeFirstName}!
            </h2>
            
            <p style="color: #4A5568; line-height: 1.6; margin-bottom: 20px;">
              Recibimos tu solicitud de salud para el retiro de 7 días y 6 noches ($2,800 USD). La plaza todavía no está confirmada. Vamos a leer tus respuestas. Si la ceremonia no es segura para ti, devolvemos el depósito de $100 USD.
            </p>
            ${preferredDatesHtml}
            
            <div style="background: #f0fff4; padding: 20px; border-radius: 8px; border-left: 4px solid #38a169; margin: 20px 0;">
              <h3 style="color: #2f855a; margin: 0 0 10px 0; font-size: 18px;">
                ✅ Tu solicitud ha sido enviada exitosamente
              </h3>
              <p style="color: #4A5568; margin: 0; line-height: 1.5;">
                Nuestro equipo revisará tu solicitud y se pondrá en contacto contigo dentro de las próximas 24 horas para:
              </p>
            </div>
            
            <ul style="color: #4A5568; line-height: 1.6; margin: 20px 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Leer tu solicitud de salud</li>
              <li style="margin-bottom: 8px;">Decirte si la plaza puede confirmarse</li>
              <li style="margin-bottom: 8px;">Devolver los $100 USD si la rechazamos por seguridad</li>
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
              <a href="tel:${BUSINESS_PHONE_TEL}" style="background: #D99D55; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; margin-right: 10px;">
                📞 Llamanos
              </a>
              <a href="mailto:info@casadeljaguariquitos.com" style="background: #2D3748; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
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

    confirmationEmailId = confirmationEmail.data?.id;
    
    } catch {
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
      } catch {
        // Audience sync is optional; do not fail the request if it cannot be updated.
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Booking request sent successfully',
      notificationId: notificationEmailId,
      confirmationId: confirmationEmailId,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch {
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
