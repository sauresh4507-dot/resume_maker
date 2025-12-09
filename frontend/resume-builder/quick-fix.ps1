# Quick fix for Vite temp directory issue
# Run this script as Administrator for best results

Write-Host "Vite Permission Fix Script" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

$viteTempPath = Join-Path $PSScriptRoot "node_modules\.vite-temp"

# Stop any Node processes
Write-Host "Stopping Node processes..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

# Try to delete the problematic directory
if (Test-Path $viteTempPath) {
    Write-Host "Removing existing .vite-temp directory..." -ForegroundColor Yellow
    try {
        Remove-Item -Path $viteTempPath -Recurse -Force -ErrorAction Stop
        Write-Host "✓ Removed successfully" -ForegroundColor Green
    } catch {
        Write-Host "✗ Could not remove: $_" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please manually:" -ForegroundColor Yellow
        Write-Host "1. Close all programs using Node.js" -ForegroundColor Yellow
        Write-Host "2. Right-click 'node_modules\.vite-temp' folder" -ForegroundColor Yellow
        Write-Host "3. Select 'Delete' or run this script as Administrator" -ForegroundColor Yellow
        exit 1
    }
}

# Create fresh directory
Write-Host "Creating fresh .vite-temp directory..." -ForegroundColor Yellow
try {
    New-Item -ItemType Directory -Path $viteTempPath -Force | Out-Null
    Write-Host "✓ Created successfully" -ForegroundColor Green
    
    # Test write
    $testFile = Join-Path $viteTempPath "test.txt"
    "test" | Out-File -FilePath $testFile -Force -ErrorAction Stop
    Remove-Item $testFile -Force -ErrorAction Stop
    Write-Host "✓ Write test passed" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Success! You can now run: npm start" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to create/write: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try running this script as Administrator" -ForegroundColor Yellow
    exit 1
}

