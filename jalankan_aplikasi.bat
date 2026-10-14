@echo off
title MurojaahKu - Hafalan Juz 30 Cerdas
echo ========================================================
echo   MurojaahKu - Aplikasi Hafalan Juz 30 Cerdas
echo   Sistem Repetisi 10x, Mode Blok, Rekam & Bandingkan
echo ========================================================
echo.
echo Membuka aplikasi di peramban (browser)...
start http://localhost:8080/
echo.
echo Jika server belum aktif, skrip akan menjalankannya secara otomatis:
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
