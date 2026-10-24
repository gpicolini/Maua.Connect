@echo off
setlocal

title Maua.Connect
set "PROJECT_ROOT=%~dp0Maua.Connect"
if exist "%~dp0backend\mvnw.cmd" set "PROJECT_ROOT=%~dp0"
if not exist "%PROJECT_ROOT%\backend\mvnw.cmd" (
    echo Coloque este arquivo ao lado da pasta Maua.Connect ou dentro dela.
    pause
    exit /b 1
)
if /i "%~1"=="backend" goto backend
if /i "%~1"=="frontend" goto frontend
where python >nul 2>&1
if errorlevel 1 (
    echo Python nao encontrado. Instale o Python e adicione ao PATH.
    pause
    exit /b 1
)
start "Maua.Connect - Backend" cmd /k ""%~f0" backend"
start "Maua.Connect - Frontend" cmd /k ""%~f0" frontend"
timeout /t 3 /nobreak >nul
start "" "http://localhost:5500/html/inicio/inicial.html"
exit /b

:backend
title Maua.Connect - Backend
cd /d "%PROJECT_ROOT%\backend"
echo Para parar o backend, pressione Ctrl+C.
call mvnw.cmd spring-boot:run
exit /b
