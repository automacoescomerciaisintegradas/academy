import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// POST — salva inscrição no banco
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nome, email, whatsapp, como_conheceu, turma, turma_datas, valor, curso } = body;

    // Validações básicas
    if (!nome || !email || !whatsapp) {
      return NextResponse.json(
        { error: 'Nome, email e WhatsApp são obrigatórios.' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Email inválido.' },
        { status: 400 }
      );
    }

    // Verificar inscrição duplicada (mesmo email + mesmo curso)
    const { data: existente } = await supabase
      .from('inscricoes')
      .select('id, status')
      .eq('email', email.toLowerCase().trim())
      .eq('curso', curso || 'Perguntas Difíceis da Bíblia')
      .in('status', ['pendente', 'confirmada'])
      .maybeSingle();

    if (existente) {
      return NextResponse.json(
        {
          error: 'Este email já possui uma inscrição ativa para este curso.',
          inscricaoExistente: true,
          inscricaoId: existente.id,
        },
        { status: 409 }
      );
    }

    // Inserir inscrição
    const { data: inscricao, error: insertError } = await supabase
      .from('inscricoes')
      .insert({
        nome: nome.trim(),
        email: email.toLowerCase().trim(),
        whatsapp: whatsapp.trim(),
        como_conheceu: como_conheceu || null,
        turma: turma || null,
        turma_datas: turma_datas || null,
        valor: valor ? Number(valor) : null,
        curso: curso || 'Perguntas Difíceis da Bíblia',
        status: 'pendente',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      // Tabela pode não existir ainda — retorna erro claro
      console.error('Erro ao inserir inscrição:', insertError);
      return NextResponse.json(
        { error: 'Erro ao salvar inscrição. Verifique se a tabela foi criada no banco.' },
        { status: 500 }
      );
    }

    // Notificação de WhatsApp / email (simulado por ora)
    console.log('=== NOVA INSCRIÇÃO ===');
    console.log('Nome:', inscricao.nome);
    console.log('Email:', inscricao.email);
    console.log('WhatsApp:', inscricao.whatsapp);
    console.log('Turma:', inscricao.turma);
    console.log('Valor:', inscricao.valor);
    console.log('Curso:', inscricao.curso);
    console.log('ID:', inscricao.id);
    console.log('=====================');

    return NextResponse.json(
      {
        message: 'Inscrição recebida com sucesso! Entraremos em contato em breve.',
        inscricao: {
          id: inscricao.id,
          nome: inscricao.nome,
          email: inscricao.email,
          turma: inscricao.turma,
          status: inscricao.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro interno na API de inscrições:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}

// GET — listar inscrições (admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status');
    const curso = searchParams.get('curso');
    const email = searchParams.get('email');

    let query = supabase
      .from('inscricoes')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) query = query.eq('status', status);
    if (curso) query = query.eq('curso', curso);
    if (email) query = query.eq('email', email);

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ inscricoes: data || [], total: data?.length ?? 0 });
  } catch (error) {
    console.error('Erro ao listar inscrições:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
