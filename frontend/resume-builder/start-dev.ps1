# Start Frontend Development Server
Write-Host "Starting Frontend Development Server..." -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectPath

# Stop any existing Node processes
Write-Host "[1/3] Checking for running Node processes..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "  Found running Node processes. Stopping..." -ForegroundColor Gray
    $nodeProcesses | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
    Write-Host "  ✓ Stopped" -ForegroundColor Green
} else {
    Write-Host "  ✓ No running processes" -ForegroundColor Green
}

# Ensure .vite-temp directory exists
Write-Host "[2/3] Ensuring .vite-temp directory..." -ForegroundColor Yellow
$viteTempPath = Join-Path $projectPath "node_modules\.vite-temp"

try {
    if (-not (Test-Path $viteTempPath)) {
        New-Item -ItemType Directory -Path $viteTempPath -Force | Out-Null
        Write-Host "  ✓ Created .vite-temp directory" -ForegroundColor Green
    } else {
        Write-Host "  ✓ Directory exists" -ForegroundColor Green
    }
} catch {
    Write-Host "  ⚠ Warning: Could not create directory: $_" -ForegroundColor Yellow
    Write-Host "  You may need to delete node_modules\.vite-temp manually" -ForegroundColor Yellow
}

# Start the dev server
Write-Host "[3/3] Starting Vite dev server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Server will start on: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

npm start

