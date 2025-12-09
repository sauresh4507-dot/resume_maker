# Fix Vite permissions issue on Windows
$viteTempDir = "node_modules\.vite-temp"

Write-Host "Attempting to fix Vite temp directory permissions..."

# Try to remove the directory if it exists and is locked
if (Test-Path $viteTempDir) {
    Write-Host "Removing existing .vite-temp directory..."
    try {
        Remove-Item -Path $viteTempDir -Recurse -Force -ErrorAction Stop
        Write-Host "Successfully removed .vite-temp directory" -ForegroundColor Green
    } catch {
        Write-Host "Could not remove directory. Please close any running Node processes and try again." -ForegroundColor Yellow
        Write-Host "You may need to run this script as Administrator or manually delete the folder." -ForegroundColor Yellow
    }
}

Write-Host "`nYou can now try running: npm start" -ForegroundColor Cyan

