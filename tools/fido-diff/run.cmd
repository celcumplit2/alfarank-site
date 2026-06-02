@echo off
setlocal
set "FIDO_CLI=D:\MS\fido\src\cli.mjs"
set "PROJECT=%~dp0alfa-fido-diff.json"
node "%FIDO_CLI%" fido-diff --project "%PROJECT%" %*
endlocal
