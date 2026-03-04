import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// POST - Aceitar convite
export async function POST(request: NextRequest) {
  try {
    const { inviteToken, userData } = await request.json();

    if (!inviteToken) {
      return NextResponse.json(
        { error: 'Token do convite é obrigatório' },
        { status: 400 }
      );
    }

    // Busca o convite
    const { data: invite, error: inviteError } = await supabase
      .from('invites')
      .select('*')
      .eq('invite_token', inviteToken)
      .single();

    if (inviteError || !invite) {
      return NextResponse.json(
        { error: 'Convite não encontrado ou inválido' },
        { status: 404 }
      );
    }

    // Verifica se o convite já foi usado
    if (invite.status === 'accepted') {
      return NextResponse.json(
        { error: 'Este convite já foi utilizado' },
        { status: 400 }
      );
    }

    // Verifica se o convite expirou
    const expiresAt = new Date(invite.expires_at);
    if (expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Este convite expirou' },
        { status: 400 }
      );
    }

    // Cria o usuário se não existir
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', invite.email)
      .single();

    let userId = existingUser?.id;

    if (!existingUser && userData) {
      // Cria novo usuário
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert({
          email: invite.email,
          name: userData.name,
          role: userData.role || 'student',
          status: 'active'
        })
        .select()
        .single();

      if (userError) {
        console.error('Erro ao criar usuário:', userError);
        return NextResponse.json(
          { error: 'Erro ao criar usuário' },
          { status: 500 }
        );
      }

      userId = newUser.id;
    }

    // Atualiza o status do convite
    const { error: updateError } = await supabase
      .from('invites')
      .update({
        status: 'accepted',
        accepted_at: new Date().toISOString(),
        user_id: userId
      })
      .eq('id', invite.id);

    if (updateError) {
      console.error('Erro ao atualizar convite:', updateError);
      return NextResponse.json(
        { error: 'Erro ao atualizar convite' },
        { status: 500 }
      );
    }

    // Se houver curso associado, matricula o usuário
    if (invite.course_id) {
      const { error: enrollmentError } = await supabase
        .from('enrollments')
        .insert({
          user_id: userId,
          course_id: invite.course_id,
          enrolled_at: new Date().toISOString(),
          status: 'active'
        });

      if (enrollmentError) {
        console.error('Erro ao matricular no curso:', enrollmentError);
        // Não falha a requisição, apenas loga o erro
      }
    }

    return NextResponse.json({
      message: 'Convite aceito com sucesso!',
      userId,
      courseId: invite.course_id
    });

  } catch (error) {
    console.error('Erro na API:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// GET - Verificar validade do convite
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token é obrigatório' },
        { status: 400 }
      );
    }

    const { data: invite, error } = await supabase
      .from('invites')
      .select('email, course_id, status, expires_at, created_at')
      .eq('invite_token', token)
      .single();

    if (error || !invite) {
      return NextResponse.json(
        { valid: false, error: 'Convite não encontrado' },
        { status: 404 }
      );
    }

    const isExpired = new Date(invite.expires_at) < new Date();
    const isValid = invite.status === 'pending' && !isExpired;

    return NextResponse.json({
      valid: isValid,
      expired: isExpired,
      used: invite.status === 'accepted',
      email: invite.email,
      expiresAt: invite.expires_at
    });

  } catch (error) {
    console.error('Erro na API:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', valid: false },
      { status: 500 }
    );
  }
}
