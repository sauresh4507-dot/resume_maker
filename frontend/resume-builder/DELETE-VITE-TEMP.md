# How to Delete the Locked .vite-temp Directory

The `.vite-temp` directory is locked and cannot be deleted automatically. Follow these steps:

## Method 1: Manual Deletion (Easiest)

1. **Close ALL programs**:
   - Close VS Code/Cursor
   - Close all terminal/PowerShell windows
   - Close any browser windows with the dev server
   - Close File Explorer windows in that folder

2. **Open File Explorer**:
   - Navigate to: `C:\Users\Saure\Music\new CC Project\frontend\resume-builder\node_modules\`
   - Look for the `.vite-temp` folder

3. **Delete the folder**:
   - Right-click on `.vite-temp` folder
   - Select **Delete**
   - If it asks for permission, click **Yes** or **Continue**

4. **If it still won't delete**:
   - Restart your computer
   - After restart, delete the folder immediately before opening any programs

## Method 2: Using PowerShell as Administrator

1. **Right-click on PowerShell** (in Start Menu)
2. Select **"Run as Administrator"**
3. Run these commands:
   ```powershell
   cd "C:\Users\Saure\Music\new CC Project\frontend\resume-builder"
   Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
   Remove-Item "node_modules\.vite-temp" -Recurse -Force
   ```

## Method 3: Safe Mode

If nothing else works:
1. Restart your computer
2. Boot into **Safe Mode** (hold Shift while clicking Restart)
3. Delete the folder: `node_modules\.vite-temp`
4. Restart normally

## After Deleting

Once deleted, run:
```powershell
npm start
```

The pre-start script will create a fresh directory with proper permissions.

## Why This Happens

Vite 7 on Windows sometimes locks the `.vite-temp` directory, especially when:
- The dev server crashes
- Path contains spaces
- Multiple Node processes were running
- Windows file handles weren't released properly

