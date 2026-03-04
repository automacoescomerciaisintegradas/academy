@echo off
C:\Windows\System32\wsl.exe -d Ubuntu -u root -- bash -c "cd ~/academy/frontend && npm run dev -- -p 3000 -H 0.0.0.0"
