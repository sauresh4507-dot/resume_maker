# Force delete .vite-temp directory
# Run this as Administrator for best results

Write-Host "Force Deleting Vite Temp Directory" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

$viteTempPath = Join-Path $PSScriptRoot "node_modules\.vite-temp"

# Step 1: Stop all Node processes
Write-Host "[1/4] Stopping all Node processes..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    $nodeProcesses | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
    Write-Host "✓ Stopped Node processes" -ForegroundColor Green
} else {
    Write-Host "✓ No Node processes running" -ForegroundColor Green
}

# Step 2: Check if directory exists
if (-not (Test-Path $viteTempPath)) {
    Write-Host "✓ Directory doesn't exist - nothing to delete!" -ForegroundColor Green
    exit 0
}

Write-Host "[2/4] Directory exists, attempting deletion..." -ForegroundColor Yellow

# Step 3: Try multiple deletion methods
$success = $false

# Method 1: PowerShell Remove-Item
try {
    Write-Host "  Trying PowerShell Remove-Item..." -ForegroundColor Gray
    Remove-Item -Path $viteTempPath -Recurse -Force -ErrorAction Stop
    if (-not (Test-Path $viteTempPath)) {
        Write-Host "✓ SUCCESS: Deleted using PowerShell" -ForegroundColor Green
        $success = $true
    }
} catch {
    Write-Host "  ✗ PowerShell method failed: $($_.Exception.Message)" -ForegroundColor Gray
}

# Method 2: CMD rmdir
if (-not $success) {
    try {
        Write-Host "  Trying CMD rmdir..." -ForegroundColor Gray
        $cmdPath = $viteTempPath -replace "'", "''"
        $result = cmd /c "rmdir /s /q `"$cmdPath`"" 2>&1
        Start-Sleep -Milliseconds 500
        if (-not (Test-Path $viteTempPath)) {
            Write-Host "✓ SUCCESS: Deleted using CMD" -ForegroundColor Green
            $success = $true
        } else {
            Write-Host "  ✗ CMD method failed" -ForegroundColor Gray
        }
    } catch {
        Write-Host "  ✗ CMD method error: $_" -ForegroundColor Gray
    }
}

# Method 3: .NET Directory.Delete
if (-not $success) {
    try {
        Write-Host "  Trying .NET Directory.Delete..." -ForegroundColor Gray
        [System.IO.Directory]::Delete($viteTempPath, $true)
        Start-Sleep -Milliseconds 500
        if (-not (Test-Path $viteTempPath)) {
            Write-Host "✓ SUCCESS: Deleted using .NET" -ForegroundColor Green
            $success = $true
        }
    } catch {
        Write-Host "  ✗ .NET method failed: $($_.Exception.Message)" -ForegroundColor Gray
    }
}

# Step 4: Final result
Write-Host ""
if ($success) {
    Write-Host "[3/4] Creating fresh directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $viteTempPath -Force | Out-Null
    Write-Host "✓ Created fresh .vite-temp directory" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "[4/4] Testing write permissions..." -ForegroundColor Yellow
    $testFile = Join-Path $viteTempPath "test.txt"
    try {
        "test" | Out-File -FilePath $testFile -Force
        Remove-Item $testFile -Force
        Write-Host "✓ Write test passed!" -ForegroundColor Green
        
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "SUCCESS! You can now run: npm start" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
    } catch {
        Write-Host "⚠ Directory created but write test failed" -ForegroundColor Yellow
        Write-Host "  You may need to set permissions manually" -ForegroundColor Yellow
    }
} else {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "FAILED: Could not delete directory" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Manual Steps:" -ForegroundColor Yellow
    Write-Host "1. Close ALL programs (VS Code, terminals, browsers, etc.)" -ForegroundColor Yellow
    Write-Host "2. Open File Explorer and navigate to:" -ForegroundColor Yellow
    Write-Host "   $viteTempPath" -ForegroundColor Cyan
    Write-Host "3. Right-click the '.vite-temp' folder" -ForegroundColor Yellow
    Write-Host "4. Select 'Delete' or press Delete key" -ForegroundColor Yellow
    Write-Host "5. If it asks for admin permission, allow it" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "OR run this script as Administrator:" -ForegroundColor Yellow
    Write-Host "  Right-click PowerShell > Run as Administrator" -ForegroundColor Yellow
    Write-Host "  Then run this script again" -ForegroundColor Yellow
    exit 1
}

