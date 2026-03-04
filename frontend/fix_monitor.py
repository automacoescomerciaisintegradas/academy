import subprocess
import time
import sys

def fix_it():
    cmd = ["wsl", "-d", "Ubuntu", "-u", "root", "bash", "/root/academy/frontend/fix_node.sh"]
    print("Iniciando correção de dependências Node.js...")
    process = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1,
        universal_newlines=True
    )
    
    while True:
        line = process.stdout.readline()
        if not line and process.poll() is not None:
            break
        if line:
            print(f"[REPARAÇÃO] {line.strip()}")
            sys.stdout.flush()
            
    print(f"Finalizado com código: {process.returncode}")

if __name__ == "__main__":
    fix_it()
