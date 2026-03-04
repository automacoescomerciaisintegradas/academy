import subprocess
import time
import sys

def start_server():
    # Entrando explicitamente na pasta frontend onde o package.json reside
    bash_command = "cd /root/academy/frontend && npm run dev"
    
    print("Monitorando inicialização do servidor (PAZ e BEM)...")
    process = subprocess.Popen(
        ["wsl", "-d", "Ubuntu", "-u", "root", "bash", "-c", bash_command],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1,
        universal_newlines=True
    )
    
    start_time = time.time()
    while time.time() - start_time < 40: # 40 segundos para dar tempo de build
        line = process.stdout.readline()
        if line:
            print(f"[NODE] {line.strip()}")
            sys.stdout.flush()
            # Se virmos a mensagem de pronto, podemos parar de monitorar
            if "Ready in" in line or "started server" in line:
                print("\n✅ O servidor parece estar pronto!")
                break
        if process.poll() is not None:
            print(f"❌ O processo encerrou prematuramente com código: {process.poll()}")
            break
            
    print("\n🌐 Acesse: http://localhost:3000")

if __name__ == "__main__":
    start_server()
