#!/bin/bash

# ============================================
# EasyPanel Installation Script
# Escola Paz e Vida
# ============================================
# Este script configura a aplicação para rodar no EasyPanel
# com porta dinâmica (3000 já está em uso)

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║  EasyPanel Install - Escola Paz e Vida    ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if running as root
check_root() {
    if [ "$EUID" -ne 0 ]; then
        print_error "Por favor, execute como root (sudo ./install.sh)"
        exit 1
    fi
    print_success "Executando como root"
}

# Find available port
find_available_port() {
    local start_port=${1:-3001}
    local end_port=${2:-3100}
    
    print_info "Buscando porta disponível entre $start_port e $end_port..."
    
    for port in $(seq $start_port $end_port); do
        if ! ss -tulpn | grep -q ":$port "; then
            print_success "Porta $port disponível encontrada"
            echo $port
            return 0
        fi
    done
    
    print_error "Nenhuma porta disponível encontrada"
    exit 1
}

# Check system requirements
check_requirements() {
    print_info "Verificando requisitos do sistema..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker não está instalado"
        print_info "Instalando Docker..."
        curl -fsSL https://get.docker.com | sh
        print_success "Docker instalado"
    else
        print_success "Docker instalado ($(docker --version))"
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose não está instalado"
        print_info "Instalando Docker Compose..."
        curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        chmod +x /usr/local/bin/docker-compose
        print_success "Docker Compose instalado"
    else
        print_success "Docker Compose instalado ($(docker-compose --version))"
    fi
    
    # Check Git
    if ! command -v git &> /dev/null; then
        print_warning "Git não está instalado (opcional)"
    else
        print_success "Git instalado"
    fi
}

# Create .env file
create_env() {
    print_info "Criando arquivo .env..."
    
    if [ -f ".env" ]; then
        print_warning "Arquivo .env já existe"
        read -p "Deseja sobrescrever? (y/N): " overwrite
        if [ "$overwrite" != "y" ]; then
            print_info "Mantendo .env existente"
            return 0
        fi
    fi
    
    # Find available port
    APP_PORT=$(find_available_port 3001 3100)
    
    cat > .env << EOF
# ============================================
# Escola Paz e Vida - EasyPanel Configuration
# Domain: academy.automacoescomerciais.com.br
# ============================================

# Application
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=${APP_PORT}
HOSTNAME=0.0.0.0

# Supabase
NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL:-}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY:-}
SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY:-}

# Email Services
RESEND_API_KEY=${RESEND_API_KEY:-}
SENDGRID_API_KEY=${SENDGRID_API_KEY:-}
EMAIL_FROM="Escola Paz e Vida <convites@pazeevida.com>"

# Application URLs
NEXT_PUBLIC_APP_URL=https://academy.automacoescomerciais.com.br
NEXT_PUBLIC_ADMIN_EMAIL=automacoescomerciais@gmail.com
ADMIN_EMAIL=automacoescomerciais@gmail.com

# Database (if using local PostgreSQL)
POSTGRES_USER=pazebem
POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-$(openssl rand -base64 32)}
POSTGRES_DB=pazebem

# Redis (if using)
REDIS_URL=redis://redis:6379
EOF

    print_success ".env criado com PORT=${APP_PORT}"
    echo ""
    print_warning "IMPORTANTE: Atualize as variáveis do Supabase no .env"
}

# Clone or update repository
setup_repository() {
    print_info "Configurando repositório..."
    
    if [ -d "frontend" ]; then
        print_info "Diretório frontend já existe"
        read -p "Deseja atualizar do Git? (y/N): " update
        if [ "$update" = "y" ]; then
            if [ -d ".git" ]; then
                git pull origin main
                print_success "Repositório atualizado"
            else
                print_warning "Não é um repositório Git"
            fi
        fi
    else
        read -p "Deseja clonar o repositório? (y/N): " clone
        if [ "$clone" = "y" ]; then
            read -p "URL do repositório Git: " repo_url
            git clone "$repo_url" .
            print_success "Repositório clonado"
        fi
    fi
}

# Build Docker image
build_image() {
    print_info "Construindo imagem Docker..."
    
    docker-compose build app
    
    print_success "Imagem construída com sucesso"
}

# Start application
start_app() {
    print_info "Iniciando aplicação..."
    
    docker-compose up -d app
    
    # Wait for app to start
    print_info "Aguardando aplicação iniciar (30 segundos)..."
    sleep 30
    
    # Get port from .env
    APP_PORT=$(grep "^PORT=" .env | cut -d'=' -f2)
    
    # Health check
    print_info "Verificando saúde da aplicação..."
    if curl -f "http://localhost:${APP_PORT}/health" > /dev/null 2>&1; then
        print_success "Aplicação está saudável!"
    else
        print_warning "Aplicação não respondeu ao health check (pode estar iniciando)"
        print_info "Verifique os logs: docker-compose logs -f app"
    fi
}

# Show access information
show_info() {
    echo ""
    print_header
    print_success "Instalação concluída!"
    echo ""
    
    APP_PORT=$(grep "^PORT=" .env | cut -d'=' -f2)
    
    echo -e "${BLUE}════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  Informações de Acesso${NC}"
    echo -e "${BLUE}════════════════════════════════════════════${NC}"
    echo ""
    echo -e "  ${GREEN}IP do Servidor:${NC} 144.91.118.78"
    echo -e "  ${GREEN}Porta:${NC} ${APP_PORT}"
    echo -e "  ${GREEN}URL:${NC} http://144.91.118.78:${APP_PORT}"
    echo ""
    echo -e "  ${GREEN}API Base:${NC} http://144.91.118.78:${APP_PORT}/api"
    echo -e "  ${GREEN}Health Check:${NC} http://144.91.118.78:${APP_PORT}/health"
    echo ""
    echo -e "${BLUE}════════════════════════════════════════════${NC}"
    echo ""
    print_info "Comandos úteis:"
    echo "  • Ver logs:     docker-compose logs -f app"
    echo "  • Parar:        docker-compose down"
    echo "  • Reiniciar:    docker-compose restart app"
    echo "  • Status:       docker-compose ps"
    echo "  • Atualizar:    ./install.sh update"
    echo ""
}

# Update application
update_app() {
    print_info "Atualizando aplicação..."
    
    if [ -d ".git" ]; then
        git pull origin main
        print_success "Código atualizado"
    fi
    
    build_image
    docker-compose restart app
    
    print_success "Aplicação atualizada"
}

# Uninstall
uninstall() {
    print_warning "Esta ação irá remover todos os containers e volumes"
    read -p "Tem certeza? (y/N): " confirm
    
    if [ "$confirm" = "y" ]; then
        print_info "Removendo containers..."
        docker-compose down -v --rmi all
        print_success "Aplicação removida"
    fi
}

# Main menu
show_menu() {
    echo ""
    echo "Escolha uma opção:"
    echo "1) Instalar (Completo)"
    echo "2) Apenas Configurar (.env)"
    echo "3) Apenas Build"
    echo "4) Apenas Start"
    echo "5) Atualizar"
    echo "6) Desinstalar"
    echo "7) Ver Status"
    echo "0) Sair"
    echo ""
}

# Main
main() {
    print_header
    check_root
    check_requirements
    
    case "${1:-menu}" in
        install)
            create_env
            setup_repository
            build_image
            start_app
            show_info
            ;;
        config)
            create_env
            ;;
        build)
            build_image
            ;;
        start)
            start_app
            show_info
            ;;
        update)
            update_app
            ;;
        uninstall)
            uninstall
            ;;
        status)
            docker-compose ps
            docker stats --no-stream
            ;;
        menu|*)
            while true; do
                show_menu
                read -p "Opção: " choice
                case $choice in
                    1) create_env; setup_repository; build_image; start_app; show_info ;;
                    2) create_env ;;
                    3) build_image ;;
                    4) start_app; show_info ;;
                    5) update_app ;;
                    6) uninstall ;;
                    7) docker-compose ps; docker stats --no-stream ;;
                    0) exit 0 ;;
                    *) print_error "Opção inválida" ;;
                esac
            done
            ;;
    esac
}

main "$@"
