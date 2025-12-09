# Quick Fix for Vite Permission Error

## The Problem
You're seeing: `EPERM, Permission denied` for `node_modules\.vite-temp`

## The Easiest Solution

**Just delete the folder manually:**

1. Close everything (VS Code, terminals, browsers)
2. Open File Explorer
3. Go to: `C:\Users\Saure\Music\new CC Project\frontend\resume-builder\node_modules\`
4. Find the `.vite-temp` folder
5. Right-click → Delete
6. Run `npm start` again

That's it! The pre-start script will create a fresh one.

## If You Can't Delete It

**Option 1: Restart Computer**
- Restart your PC
- Immediately after restart, delete the folder before opening any programs
- Then run `npm start`

**Option 2: Run as Administrator**
1. Right-click PowerShell → "Run as Administrator"
2. Run:
   ```powershell
   cd "C:\Users\Saure\Music\new CC Project\frontend\resume-builder"
   Remove-Item "node_modules\.vite-temp" -Recurse -Force
   npm start
   ```

## After Fixing

Once the folder is deleted, the `ensure-vite-temp.js` script will automatically create a fresh one with proper permissions when you run `npm start`.

## Files Created to Help

- `DELETE-VITE-TEMP.md` - Detailed deletion instructions
- `force-delete-vite-temp.ps1` - Automated deletion script (run as Admin)
- `ensure-vite-temp.js` - Automatically runs before `npm start` to check/create directory

