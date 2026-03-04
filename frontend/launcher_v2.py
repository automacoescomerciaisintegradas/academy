import subprocess
import time
import os

def start_server():
    log_file = "/root/academy/frontend/server_v2.log"
    bash_command = f"cd /root/academy/frontend && npm run dev > {log_file} 2>&1"
    
    print(f"Iniciando servidor. Log: {log_file}")
    # Usamos Popen para não bloquear o script Python
    subprocess.Popen(
        ["wsl", "-d", "Ubuntu", "-u", "root", "bash", "-c", bash_command]
    )

if __name__ == "__main__":
    start_server()
