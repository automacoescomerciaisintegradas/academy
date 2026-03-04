#!/bin/bash

# ============================================
# Build & Deploy Script - Escola Paz e Vida
# ============================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}============================================${NC}"
    echo -e "${BLUE}  Build & Deploy - Escola Paz e Vida${NC}"
    echo -e "${BLUE}============================================${NC}"
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

# Check dependencies
check_deps() {
    print_info "Verificando dependências..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker não está instalado"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose não está instalado"
        exit 1
    fi
    
    print_success "Dependências verificadas"
}

# Build application
build() {
    print_info "Construindo imagem Docker..."
    
    cd /root/academy
    docker-compose build app
    
    print_success "Imagem construída com sucesso"
}

# Deploy
deploy() {
    print_info "Iniciando deploy..."
    
    # Stop old containers
    print_info "Parando containers antigos..."
    docker-compose down
    
    # Remove old images
    print_info "Limpando imagens antigas..."
    docker image prune -f
    
    # Start new containers
    print_info "Iniciando novos containers..."
    docker-compose up -d app
    
    # Wait for app to be ready
    print_info "Aguardando aplicação iniciar..."
    sleep 10
    
    # Health check
    print_info "Verificando saúde da aplicação..."
    if curl -f http://localhost:3000/health > /dev/null 2>&1; then
        print_success "Aplicação está saudável!"
    else
        print_error "Aplicação não respondeu ao health check"
        print_info "Verificando logs..."
        docker-compose logs app
        exit 1
    fi
    
    print_success "Deploy concluído com sucesso!"
}

# Rollback
rollback() {
    print_info "Iniciando rollback..."
    
    # Get previous image
    PREVIOUS_IMAGE=$(docker images paz-e-vida-app --format "{{.Tag}}" | sed -n '2p')
    
    if [ -z "$PREVIOUS_IMAGE" ]; then
        print_error "Nenhuma imagem anterior encontrada para rollback"
        exit 1
    fi
    
    print_info "Rollback para versão: $PREVIOUS_IMAGE"
    
    docker-compose down
    docker-compose up -d app
    
    print_success "Rollback concluído"
}

# Backup database
backup_db() {
    print_info "Criando backup do banco de dados..."
    
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    BACKUP_FILE="backup_${TIMESTAMP}.sql"
    
    docker-compose exec -T postgres pg_dump -U pazebem pazebem > "/tmp/${BACKUP_FILE}"
    
    print_success "Backup criado: /tmp/${BACKUP_FILE}"
}

# Main
main() {
    print_header
    check_deps
    
    case "${1:-deploy}" in
        build)
            build
            ;;
        deploy)
            build
            deploy
            ;;
        rollback)
            rollback
            ;;
        backup)
            backup_db
            ;;
        *)
            echo "Uso: $0 {build|deploy|rollback|backup}"
            exit 1
            ;;
    esac
}

main "$@"
