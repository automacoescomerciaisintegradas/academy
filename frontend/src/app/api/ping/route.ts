import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET /api/ping — mantém o projeto Supabase ativo
// Chamado pelo cron a cada 4 dias
export async function GET() {
  const inicio = Date.now();

  try {
    // Query leve que só confirma que o banco responde
    const { error } = await supabase
      .from('inscricoes')
      .select('id')
      .limit(1);

    const ms = Date.now() - inicio;

    if (error) {
      console.error('[ping] Supabase erro:', error.message);
      return NextResponse.json(
        { ok: false, erro: error.message, ms },
        { status: 503 }
      );
    }

    console.log(`[ping] Supabase OK em ${ms}ms — ${new Date().toISOString()}`);
    return NextResponse.json({ ok: true, ms, ts: new Date().toISOString() });

  } catch (err) {
    const ms = Date.now() - inicio;
    console.error('[ping] Erro inesperado:', err);
    return NextResponse.json(
      { ok: false, erro: String(err), ms },
      { status: 500 }
    );
  }
}
