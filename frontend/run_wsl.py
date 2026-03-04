import subprocess
import os

def run_wsl():
    cmd = ["wsl", "-d", "Ubuntu", "-u", "root", "bash", "-c", "cd /root/academy/frontend && chmod +x start_debug.sh && ./start_debug.sh"]
    print(f"Executando: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    print(f"Retorno: {result.returncode}")
    print(f"Saída: {result.stdout}")
    print(f"Erro: {result.stderr}")

if __name__ == "__main__":
    run_wsl()
