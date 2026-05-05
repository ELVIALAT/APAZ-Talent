import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    const { record } = await req.json()

    if (!record) {
      return new Response(JSON.stringify({ error: 'No record found' }), { status: 400 })
    }

    // 1. Enviar correo al Usuario (Confirmación)
    // Nota: El remitente 'onboarding@resend.dev' es solo para pruebas. 
    // Para producción, verifica tu dominio en Resend.
    const userRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'APAZ Talent Search <onboarding@resend.dev>', 
        to: record.email,
        subject: 'Hemos recibido tu mensaje - APAZ Talent Search',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 40px; color: #1a1a1a;">
            <div style="text-align: center; margin-bottom: 30px;">
               <h1 style="font-size: 24px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin: 0;">APAZ Talent Search</h1>
               <div style="height: 2px; width: 50px; background: #C5A059; margin: 10px auto;"></div>
            </div>
            
            <h2 style="font-size: 18px; font-weight: 700; text-transform: uppercase;">Hola ${record.name},</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #444;">
              Gracias por contactar a <strong>APAZ Talent Search</strong>.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #444;">
              Hemos recibido tu mensaje con éxito. Nuestro equipo revisará tu solicitud y se pondrá en contacto contigo a la brevedad posible para explorar cómo podemos colaborar.
            </p>
            
            <div style="background: #f9f9f9; padding: 20px; border-left: 4px solid #C5A059; margin: 30px 0;">
               <p style="font-size: 12px; margin: 0; color: #888; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Tu mensaje:</p>
               <p style="font-size: 14px; font-style: italic; margin: 10px 0 0;">"${record.message}"</p>
            </div>

            <hr style="border: 0; border-top: 1px solid #eee; margin: 40px 0;" />
            <p style="font-size: 11px; color: #999; text-align: center;">
              <strong>APAZ Talent Search</strong><br/>
              Talento Humano Redefinido.<br/>
              CDMX | Bogotá | Latam
            </p>
          </div>
        `,
      }),
    })

    // 2. Enviar correo a TI (Notificación)
    // Cambia 'tu-email@ejemplo.com' por tu correo real
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Web Notification <onboarding@resend.dev>',
        to: 'tu-email@ejemplo.com', 
        subject: `NUEVO LEAD: ${record.name}`,
        html: `
          <h3>Nuevo registro desde la web</h3>
          <p><strong>Nombre:</strong> ${record.name}</p>
          <p><strong>Email:</strong> ${record.email}</p>
          <p><strong>Mensaje:</strong> ${record.message}</p>
          <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
        `,
      }),
    })

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
