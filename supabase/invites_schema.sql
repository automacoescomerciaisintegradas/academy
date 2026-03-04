-- ============================================
-- SISTEMA DE CONVITES - Escola Paz e Vida
-- ============================================

-- Tabela de Convites
CREATE TABLE IF NOT EXISTS invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  invited_by VARCHAR(255),
  invite_token UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_invites_email ON invites(email);
CREATE INDEX IF NOT EXISTS idx_invites_token ON invites(invite_token);
CREATE INDEX IF NOT EXISTS idx_invites_status ON invites(status);
CREATE INDEX IF NOT EXISTS idx_invites_course_id ON invites(course_id);

-- RLS (Row Level Security)
ALTER TABLE invites ENABLE ROW LEVEL SECURITY;

-- Policy: Admins podem ver todos os convites
CREATE POLICY "Admins podem ver todos os convites"
  ON invites FOR SELECT
  USING (auth.jwt() ->> 'email' = 'akshayman224@gmail.com');

-- Policy: Admins podem criar convites
CREATE POLICY "Admins podem criar convites"
  ON invites FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = 'akshayman224@gmail.com');

-- Policy: Admins podem deletar convites
CREATE POLICY "Admins podem deletar convites"
  ON invites FOR DELETE
  USING (auth.jwt() ->> 'email' = 'akshayman224@gmail.com');

-- Policy: Usuários podem ver seus próprios convites
CREATE POLICY "Usuários podem ver seus convites"
  ON invites FOR SELECT
  USING (email = auth.jwt() ->> 'email');

-- Policy: Qualquer um pode aceitar convite (via API)
CREATE POLICY "Qualquer um pode atualizar convite aceito"
  ON invites FOR UPDATE
  USING (status = 'pending')
  WITH CHECK (status = 'accepted');

-- ============================================
-- FUNÇÕES E TRIGGERS
-- ============================================

-- Função para limpar convites expirados
CREATE OR REPLACE FUNCTION expire_old_invites()
RETURNS void AS $$
BEGIN
  UPDATE invites
  SET status = 'expired'
  WHERE status = 'pending'
    AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Trigger para auto-expirar convites (opcional, pode ser feito via cron)
-- CREATE EXTENSION IF NOT EXISTS pg_cron;
-- SELECT cron.schedule(
--   'expire-invites-daily',
--   '0 0 * * *',
--   $$SELECT expire_old_invites()$$
-- );

-- ============================================
-- DADOS INICIAIS (OPCIONAL)
-- ============================================

-- Inserir alguns convites de exemplo (remover em produção)
-- INSERT INTO invites (email, invited_by, expires_at, status)
-- VALUES 
--   ('teste1@example.com', 'Admin', NOW() + INTERVAL '7 days', 'pending'),
--   ('teste2@example.com', 'Admin', NOW() + INTERVAL '7 days', 'pending'),
--   ('teste3@example.com', 'Admin', NOW() - INTERVAL '1 day', 'expired');

-- ============================================
-- VIEW PARA DASHBOARD
-- ============================================

CREATE OR REPLACE VIEW invites_stats AS
SELECT 
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE status = 'pending') as pending,
  COUNT(*) FILTER (WHERE status = 'accepted') as accepted,
  COUNT(*) FILTER (WHERE status = 'expired') as expired,
  COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled
FROM invites;

-- ============================================
-- COMENTÁRIOS
-- ============================================

COMMENT ON TABLE invites IS 'Convites enviados para novos usuários';
COMMENT ON COLUMN invites.email IS 'Email do usuário convidado';
COMMENT ON COLUMN invites.course_id IS 'Curso associado ao convite (opcional)';
COMMENT ON COLUMN invites.invite_token IS 'Token único para aceitar o convite';
COMMENT ON COLUMN invites.status IS 'pending, accepted, expired, cancelled';
COMMENT ON COLUMN invites.expires_at IS 'Data de expiração do convite';
COMMENT ON COLUMN invites.user_id IS 'ID do usuário após aceitar o convite';
