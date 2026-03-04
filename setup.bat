@echo off
mkdir src
cd src
call npx create-next-app@latest paz-e-bem --typescript --eslint --tailwind --src-dir --app --import-alias "@/*" --use-npm --skip-git --no-turbopack
if %errorlevel% neq 0 exit /b %errorlevel%
exit /b 0
