import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Inicializa cliente Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email, courseId, invitedBy } = await request.json();

    // Validações
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Verifica se o email já está cadastrado
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, email, role')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { 
          error: 'Este email já está cadastrado na plataforma',
          userExists: true,
          userId: existingUser.id
        },
        { status: 409 }
      );
    }

    // Verifica se já existe convite pendente
    const { data: existingInvite } = await supabase
      .from('invites')
      .select('*')
      .eq('email', email)
      .eq('status', 'pending')
      .single();

    if (existingInvite) {
      return NextResponse.json(
        { 
          message: 'Convite já enviado para este email',
          inviteId: existingInvite.id,
          exists: true
        },
        { status: 200 }
      );
    }

    // Gera token único para o convite
    const inviteToken = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Válido por 7 dias

    // Cria o convite no banco
    const { data: invite, error: inviteError } = await supabase
      .from('invites')
      .insert({
        email,
        course_id: courseId || null,
        invited_by: invitedBy || null,
        invite_token: inviteToken,
        expires_at: expiresAt.toISOString(),
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (inviteError) {
      console.error('Erro ao criar convite:', inviteError);
      return NextResponse.json(
        { error: 'Erro ao criar convite' },
        { status: 500 }
      );
    }

    // TODO: Enviar email real (integração com Resend/SendGrid)
    // Por enquanto, simulamos o envio
    await sendInviteEmail({
      email,
      inviteToken,
      courseName: courseId ? 'Curso Selecionado' : 'Escola Paz e Vida',
      invitedBy: invitedBy || 'Equipe Paz e Vida'
    });

    return NextResponse.json({
      message: 'Convite enviado com sucesso!',
      invite
    }, { status: 201 });

  } catch (error) {
    console.error('Erro na API de convites:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// Função para enviar email de convite
async function sendInviteEmail(data: {
  email: string;
  inviteToken: string;
  courseName: string;
  invitedBy: string;
}) {
  // Opção 1: Usando Resend (recomendado)
  if (process.env.RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'Escola Paz e Vida <convites@pazeevida.com>',
          to: data.email,
          subject: `Convite para ${data.courseName}`,
          html: createInviteEmailHTML(data)
        })
      });
      console.log('Email enviado via Resend para:', data.email);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
    }
  } 
  // Opção 2: Usando SendGrid
  else if (process.env.SENDGRID_API_KEY) {
    try {
      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: data.email }],
            subject: `Convite para ${data.courseName}`
          }],
          from: {
            email: 'convites@pazeevida.com',
            name: 'Escola Paz e Vida'
          },
          content: [{
            type: 'text/html',
            value: createInviteEmailHTML(data)
          }]
        })
      });
      console.log('Email enviado via SendGrid para:', data.email);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
    }
  }
  // Opção 3: Simulação (desenvolvimento)
  else {
    console.log('=== EMAIL SIMULADO ===');
    console.log('Para:', data.email);
    console.log('Assunto:', `Convite para ${data.courseName}`);
    console.log('Token:', data.inviteToken);
    console.log('=====================');
  }
}

// Template HTML do email
function createInviteEmailHTML(data: {
  email: string;
  inviteToken: string;
  courseName: string;
  invitedBy: string;
}) {
  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/aceitar-convite/${data.inviteToken}`;

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Manrope', sans-serif; background-color: #EAE6DF; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #F4F1EB; }
    .header { background-color: #A84B2B; padding: 40px 20px; text-align: center; }
    .header h1 { color: #F4F1EB; font-family: 'Instrument Serif', serif; font-size: 32px; margin: 0; }
    .content { padding: 40px 30px; }
    .greeting { font-size: 18px; color: #1C1B1A; margin-bottom: 20px; }
    .message { font-size: 16px; color: #827C75; line-height: 1.6; margin-bottom: 30px; }
    .button { display: inline-block; background-color: #A84B2B; color: #F4F1EB; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; }
    .details { background-color: #EAE6DF; padding: 20px; border-radius: 10px; margin: 30px 0; border-left: 4px solid #A84B2B; }
    .detail-item { margin-bottom: 10px; color: #1C1B1A; }
    .footer { background-color: #1C1B1A; color: #827C75; padding: 30px; text-align: center; font-size: 14px; }
    .footer a { color: #A84B2B; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📚 Escola Paz e Vida</h1>
    </div>
    
    <div class="content">
      <div class="greeting">Olá! 👋</div>
      
      <div class="message">
        Você recebeu um convite especial para se juntar à <strong>Escola Paz e Vida</strong>. 
        ${data.courseName !== 'Escola Paz e Vida' ? `Para o curso: <strong>${data.courseName}</strong>.` : ''}
        <br><br>
        Seu convite foi enviado por <strong>${data.invitedBy}</strong>.
      </div>

      <div class="details">
        <div class="detail-item"><strong>📖 Curso:</strong> ${data.courseName}</div>
        <div class="detail-item"><strong>👤 Convidado por:</strong> ${data.invitedBy}</div>
        <div class="detail-item"><strong>⏰ Validade:</strong> 7 dias</div>
      </div>

      <div style="text-align: center; margin: 40px 0;">
        <a href="${inviteUrl}" class="button">Aceitar Convite</a>
      </div>

      <div class="message" style="font-size: 14px;">
        Ou copie e cole este link no seu navegador:<br>
        <a href="${inviteUrl}" style="color: #A84B2B; word-break: break-all;">${inviteUrl}</a>
      </div>
    </div>

    <div class="footer">
      <p>© 2026 Escola Paz e Vida. Todos os direitos reservados.</p>
      <p>Formando obreiros fundamentados na Palavra desde 2017.</p>
      <p><a href="mailto:contato@pazeevida.com">contato@pazeevida.com</a></p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
