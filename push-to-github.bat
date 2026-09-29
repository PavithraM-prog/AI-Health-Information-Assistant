@echo off
set "PATH=%PATH%;C:\Users\admin\nodejs;C:\Users\admin\mingit\cmd"
echo ========================================================
echo Pushing AI Health Information Assistant to GitHub...
echo Repository: https://github.com/PavithraM-prog/AI-Health-Information-Assistant
echo ========================================================
echo.
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] Code pushed to GitHub successfully!
) else (
    echo [NOTICE] If prompted for authentication:
    echo   Username: PavithraM-prog
    echo   Password: Use your GitHub Personal Access Token (PAT)
    echo             generated from https://github.com/settings/tokens
)
pause
