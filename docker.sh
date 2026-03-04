#!/bin/bash

# ============================================
# Docker Management Script - Escola Paz e Vida
# ============================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "${BLUE}============================================${NC}"
    echo -e "${BLUE}  Escola Paz e Vida - Docker Manager${NC}"
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

check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker não está instalado. Por favor, instale o Docker primeiro."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose não está instalado. Por favor, instale o Docker Compose."
        exit 1
    fi
    
    print_success "Docker e Docker Compose estão instalados"
}

start_app() {
    print_info "Iniciando a aplicação..."
    docker-compose up -d app
    print_success "Aplicação iniciada!"
    print_info "Acesse: http://localhost:3000"
}

stop_app() {
    print_info "Parando a aplicação..."
    docker-compose down
    print_success "Aplicação parada!"
}

restart_app() {
    print_info "Reiniciando a aplicação..."
    docker-compose restart app
    print_success "Aplicação reiniciada!"
}

build_app() {
    print_info "Construindo a aplicação..."
    docker-compose build --no-cache app
    print_success "Aplicação construída!"
}

start_all() {
    print_info "Iniciando todos os serviços..."
    docker-compose up -d
    print_success "Todos os serviços iniciados!"
    print_info "Aplicação: http://localhost:3000"
}

stop_all() {
    print_info "Parando todos os serviços..."
    docker-compose down
    print_success "Todos os serviços parados!"
}

clean_all() {
    print_info "Limpando todos os containers, volumes e imagens..."
    docker-compose down -v --rmi all
    print_success "Limpeza concluída!"
}

show_logs() {
    print_info "Mostrando logs..."
    docker-compose logs -f "${1:-app}"
}

show_status() {
    print_info "Status dos serviços:"
    docker-compose ps
}

run_migrations() {
    print_info "Executando migrações..."
    docker-compose exec app npm run db:migrate
    print_success "Migrações executadas!"
}

open_shell() {
    print_info "Abrindo shell no container..."
    docker-compose exec app sh
}

# Main menu
show_menu() {
    echo ""
    echo "Escolha uma opção:"
    echo "1) Iniciar Aplicação"
    echo "2) Parar Aplicação"
    echo "3) Reiniciar Aplicação"
    echo "4) Construir Aplicação"
    echo "5) Iniciar Todos os Serviços"
    echo "6) Parar Todos os Serviços"
    echo "7) Limpar Tudo"
    echo "8) Ver Logs"
    echo "9) Ver Status"
    echo "10) Abrir Shell"
    echo "0) Sair"
    echo ""
}

# Main script
main() {
    print_header
    check_docker
    
    case "${1:-menu}" in
        start)
            start_app
            ;;
        stop)
            stop_app
            ;;
        restart)
            restart_app
            ;;
        build)
            build_app
            ;;
        up)
            start_all
            ;;
        down)
            stop_all
            ;;
        clean)
            clean_all
            ;;
        logs)
            show_logs "$2"
            ;;
        status)
            show_status
            ;;
        shell)
            open_shell
            ;;
        menu|*)
            while true; do
                show_menu
                read -p "Opção: " choice
                case $choice in
                    1) start_app ;;
                    2) stop_app ;;
                    3) restart_app ;;
                    4) build_app ;;
                    5) start_all ;;
                    6) stop_all ;;
                    7) clean_all ;;
                    8) show_logs ;;
                    9) show_status ;;
                    10) open_shell ;;
                    0) exit 0 ;;
                    *) print_error "Opção inválida" ;;
                esac
            done
            ;;
    esac
}

main "$@"
