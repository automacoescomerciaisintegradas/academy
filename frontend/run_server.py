import subprocess
import os

def run():
    # Caminho absoluto no WSL
    wsl_path = "/root/academy/frontend"
    command = f"cd {wsl_path} && nohup npm run dev > {wsl_path}/server.log 2>&1 &"
    
    print(f"Executando no WSL: {command}")
    
    # Usando lista para evitar o shell do Windows
    result = subprocess.run(
        ["wsl", "-d", "Ubuntu", "bash", "-c", command],
        capture_output=True,
        text=True
    )
    
    print(f"Resultado: {result.returncode}")
    print(f"Saída: {result.stdout}")
    print(f"Erro: {result.stderr}")

if __name__ == "__main__":
    run()
