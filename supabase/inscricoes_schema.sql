-- ============================================
-- TABELA DE INSCRIÇÕES — Escola Paz e Bem
-- ============================================

CREATE TABLE IF NOT EXISTS inscricoes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome          VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL,
  whatsapp      VARCHAR(50)  NOT NULL,
  como_conheceu VARCHAR(100),
  curso         VARCHAR(255) NOT NULL DEFAULT 'Perguntas Difíceis da Bíblia',
  turma         VARCHAR(255),
  turma_datas   VARCHAR(255),
  valor         NUMERIC(10,2),
  status        VARCHAR(50)  NOT NULL DEFAULT 'pendente',
  -- pendente | confirmada | cancelada | reembolsada
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para buscas rápidas
CREATE INDEX IF NOT EXISTS idx_inscricoes_email   ON inscricoes(email);
CREATE INDEX IF NOT EXISTS idx_inscricoes_status  ON inscricoes(status);
CREATE INDEX IF NOT EXISTS idx_inscricoes_curso   ON inscricoes(curso);
CREATE INDEX IF NOT EXISTS idx_inscricoes_created ON inscricoes(created_at DESC);

-- Bloquear duplicatas ativas (mesmo email + mesmo curso)
CREATE UNIQUE INDEX IF NOT EXISTS idx_inscricoes_email_curso_ativa
  ON inscricoes(email, curso)
  WHERE status IN ('pendente', 'confirmada');

-- Atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_inscricoes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_inscricoes_updated_at ON inscricoes;
CREATE TRIGGER trg_inscricoes_updated_at
  BEFORE UPDATE ON inscricoes
  FOR EACH ROW EXECUTE FUNCTION update_inscricoes_updated_at();

-- RLS
ALTER TABLE inscricoes ENABLE ROW LEVEL SECURITY;

-- Admin vê tudo
CREATE POLICY "Admin vê todas inscrições"
  ON inscricoes FOR SELECT
  USING (auth.jwt() ->> 'email' = current_setting('app.admin_email', true));

-- Admin gerencia tudo
CREATE POLICY "Admin gerencia inscrições"
  ON inscricoes FOR ALL
  USING (auth.jwt() ->> 'email' = current_setting('app.admin_email', true));

-- Qualquer um pode inserir (formulário público)
CREATE POLICY "Público pode se inscrever"
  ON inscricoes FOR INSERT
  WITH CHECK (true);

-- ============================================
-- VIEW para dashboard admin
-- ============================================
CREATE OR REPLACE VIEW inscricoes_stats AS
SELECT
  curso,
  COUNT(*)                                              AS total,
  COUNT(*) FILTER (WHERE status = 'pendente')           AS pendentes,
  COUNT(*) FILTER (WHERE status = 'confirmada')         AS confirmadas,
  COUNT(*) FILTER (WHERE status = 'cancelada')          AS canceladas,
  SUM(valor) FILTER (WHERE status = 'confirmada')       AS receita_confirmada
FROM inscricoes
GROUP BY curso
ORDER BY total DESC;
