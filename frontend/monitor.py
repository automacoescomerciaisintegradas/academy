import subprocess
import time
import sys

def start_server():
    bash_command = "cd /root/academy/frontend && npm run dev"
    process = subprocess.Popen(
        ["wsl", "-d", "Ubuntu", "-u", "root", "bash", "-c", bash_command],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1,
        universal_newlines=True
    )
    
    print("Monitorando saída por 30 segundos...")
    start_time = time.time()
    while time.time() - start_time < 30:
        line = process.stdout.readline()
        if line:
            print(f"[NODE] {line.strip()}")
            sys.stdout.flush()
        if process.poll() is not None:
            print(f"Processo encerrou com código: {process.returncode}")
            break
    
    print("Fim do monitoramento. Se não houver erro acima, o servidor deve estar subindo.")

if __name__ == "__main__":
    start_server()
