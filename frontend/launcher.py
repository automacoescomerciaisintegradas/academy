import subprocess
import time
import os

def start_server():
    # Caminho absoluto dentro do Linux
    bash_command = "cd /root/academy/frontend && npm run dev"
    
    print("Tentando disparar o servidor no WSL...")
    # Usamos shell=False para evitar problemas com escape de caracteres
    try:
        # Iniciamos e deixamos rodar
        subprocess.Popen(
            ["wsl", "-d", "Ubuntu", "-u", "root", "bash", "-c", bash_command],
            creationflags=subprocess.CREATE_NEW_CONSOLE if os.name == 'nt' else 0
        )
        print("Comando disparado em nova console/processo.")
    except Exception as e:
        print(f"Erro: {e}")

if __name__ == "__main__":
    start_server()
