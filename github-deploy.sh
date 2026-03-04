# ============================================
# GitHub Deploy Script - Escola Paz e Vida
# ============================================

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}╔════════════════════════════════════════════╗${NC}"
echo -e "${YELLOW}║  GitHub Deploy - Escola Paz e Vida        ║${NC}"
echo -e "${YELLOW}╚════════════════════════════════════════════╝${NC}"
echo ""

# Check if git is configured
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo -e "${RED}✗ Não está em um repositório Git${NC}"
    exit 1
fi

# Check for changes
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}ℹ Existem mudanças não commitadas${NC}"
    git status --short
    echo ""
    read -p "Deseja commitar e fazer push? (y/N): " confirm
    if [ "$confirm" = "y" ]; then
        git add .
        git commit -m "deploy: Auto commit - $(date '+%Y-%m-%d %H:%M')"
        echo -e "${GREEN}✓ Changes commitadas${NC}"
    else
        echo -e "${YELLOW}⚠ Continuando sem commitar mudanças${NC}"
    fi
fi

# Get current branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "${GREEN}✓ Branch: $BRANCH${NC}"

# Push to GitHub
echo -e "${YELLOW}ℹ Fazendo push para GitHub...${NC}"
git push origin $BRANCH || {
    echo -e "${RED}✗ Erro no push${NC}"
    exit 1
}

echo -e "${GREEN}✓ Push realizado com sucesso!${NC}"
echo ""
echo "╔════════════════════════════════════════════╗"
echo "║  ✓ Push para GitHub Concluído!           ║"
echo "╚════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}Próximos passos:${NC}"
echo "  1. Vá para EasyPanel"
echo "  2. Selecione o projeto"
echo "  3. Clique em 'Redeploy'"
echo "  4. Aguarde o build completar"
echo ""
echo -e "Domínio: https://academy.automacoescomerciais.com.br"
echo ""
