import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder');

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'placeholder') {
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await request.json();
    const { name, email, phone, subject, message, language = 'es' } = data;

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Language-specific content
    const isSpanish = language === 'es';
    const emailSubject = isSpanish 
      ? `Nuevo mensaje de contacto: ${subject}`
      : `New contact message: ${subject}`;
    
    const emailTemplate = isSpanish ? `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #D99D55; margin: 0; font-size: 24px;">Casa del Jaguar</h1>
            <p style="color: #666; margin: 5px 0 0 0;">Nuevo mensaje de contacto</p>
          </div>
          
          <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Información de contacto</h2>
            <p style="margin: 8px 0; color: #555;"><strong>Nombre:</strong> ${name}</p>
            <p style="margin: 8px 0; color: #555;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #D99D55;">${email}</a></p>
            <p style="margin: 8px 0; color: #555;"><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
            <p style="margin: 8px 0; color: #555;"><strong>Asunto:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #D99D55;">
            <h3 style="color: #333; margin: 0 0 10px 0; font-size: 16px;">Mensaje:</h3>
            <p style="color: #555; line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px; margin: 0;">Este mensaje fue enviado desde el formulario de contacto de Casa del Jaguar</p>
          </div>
        </div>
      </div>
    ` : `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #D99D55; margin: 0; font-size: 24px;">Casa del Jaguar</h1>
            <p style="color: #666; margin: 5px 0 0 0;">New contact message</p>
          </div>
          
          <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Contact Information</h2>
            <p style="margin: 8px 0; color: #555;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0; color: #555;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #D99D55;">${email}</a></p>
            <p style="margin: 8px 0; color: #555;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p style="margin: 8px 0; color: #555;"><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #D99D55;">
            <h3 style="color: #333; margin: 0 0 10px 0; font-size: 16px;">Message:</h3>
            <p style="color: #555; line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px; margin: 0;">This message was sent from the Casa del Jaguar contact form</p>
          </div>
        </div>
      </div>
    `;

    // Send email notification
    const emailPromise = resend.emails.send({
      from: 'Casa del Jaguar <noreply@casadeljaguariquitos.com>',
      to: ['info@casadeljaguariquitos.com'],
      subject: emailSubject,
      html: emailTemplate,
    });

    // Add to audience if RESEND_AUDIENCE_ID is provided
    let audiencePromise;
    if (process.env.RESEND_AUDIENCE_ID) {
      try {
        audiencePromise = resend.contacts.create({
          email: email,
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' ') || '',
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });
      } catch (audienceError) {
        // Log but don't fail the entire request if audience addition fails
        console.warn('Failed to add contact to audience:', audienceError);
      }
    }

    // Wait for email to send (audience addition is optional)
    await emailPromise;
    
    // Try to add to audience but don't fail if it doesn't work
    if (audiencePromise) {
      try {
        await audiencePromise;
      } catch (audienceError) {
        console.warn('Failed to add contact to audience:', audienceError);
      }
    }

    const successMessage = isSpanish 
      ? 'Mensaje enviado exitosamente. Te contactaremos pronto.'
      : 'Message sent successfully. We will contact you soon.';

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: successMessage 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    const errorMessage = 'Failed to send message. Please try again later.';
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
