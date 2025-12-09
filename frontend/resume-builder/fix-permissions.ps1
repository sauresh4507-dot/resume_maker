# Fix permissions for Vite temp directory on Windows
$ErrorActionPreference = "Stop"

Write-Host "Fixing Vite temp directory permissions..." -ForegroundColor Cyan

$projectPath = $PSScriptRoot
$viteTempPath = Join-Path $projectPath "node_modules\.vite-temp"

# Ensure directory exists
if (-not (Test-Path $viteTempPath)) {
    Write-Host "Creating .vite-temp directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $viteTempPath -Force | Out-Null
}

# Try to fix permissions
try {
    Write-Host "Setting permissions..." -ForegroundColor Yellow
    
    # Get current user
    $currentUser = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
    
    # Remove inheritance and grant full control to current user
    $acl = Get-Acl $viteTempPath
    $acl.SetAccessRuleProtection($true, $false)
    
    $accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule(
        $currentUser,
        "FullControl",
        "ContainerInherit,ObjectInherit",
        "None",
        "Allow"
    )
    $acl.SetAccessRule($accessRule)
    
    Set-Acl -Path $viteTempPath -AclObject $acl
    
    Write-Host "✓ Permissions set successfully!" -ForegroundColor Green
    
    # Test write
    $testFile = Join-Path $viteTempPath ".test-write"
    "test" | Out-File -FilePath $testFile -Force
    Remove-Item $testFile -Force
    Write-Host "✓ Write test successful!" -ForegroundColor Green
    
} catch {
    Write-Host "✗ Failed to set permissions: $_" -ForegroundColor Red
    Write-Host "`nTry running this script as Administrator, or manually:" -ForegroundColor Yellow
    Write-Host "1. Right-click the 'node_modules\.vite-temp' folder" -ForegroundColor Yellow
    Write-Host "2. Select Properties > Security > Edit" -ForegroundColor Yellow
    Write-Host "3. Give your user 'Full Control' permissions" -ForegroundColor Yellow
    exit 1
}

Write-Host "`nYou can now run: npm start" -ForegroundColor Cyan

