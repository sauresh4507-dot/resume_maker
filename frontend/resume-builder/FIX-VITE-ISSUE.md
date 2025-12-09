# Fixing Vite 7 Windows Permission Issue

## Problem
Vite 7 on Windows can have issues writing to `node_modules\.vite-temp` directory, especially with paths containing spaces.

## Quick Fix

### Option 1: Run as Administrator (Recommended)
1. Close all terminal windows
2. Open PowerShell **as Administrator**
3. Navigate to this directory:
   ```powershell
   cd "C:\Users\Saure\Music\new CC Project\frontend\resume-builder"
   ```
4. Run the fix script:
   ```powershell
   .\fix-permissions.ps1
   ```
5. Then try: `npm start`

### Option 2: Manual Permission Fix
1. Navigate to: `node_modules\.vite-temp` folder
2. Right-click → Properties → Security tab
3. Click "Edit" → Select your user
4. Check "Full control" → Apply → OK
5. Try: `npm start`

### Option 3: Delete and Recreate
Run these commands in PowerShell:
```powershell
cd "C:\Users\Saure\Music\new CC Project\frontend\resume-builder"
# Stop any running Node processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
# Delete the problematic directory
Remove-Item "node_modules\.vite-temp" -Recurse -Force -ErrorAction SilentlyContinue
# Create it fresh
New-Item -ItemType Directory -Path "node_modules\.vite-temp" -Force
# Try starting
npm start
```

## Alternative: Use npm run dev
You can also use `npm run dev` instead of `npm start` - it does the same thing.

## Still Having Issues?
- Make sure no Node processes are running
- Try moving the project to a path without spaces
- Check if your antivirus is blocking file access

