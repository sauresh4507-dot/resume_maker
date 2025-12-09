# How to Start the Frontend

## Quick Start

1. **Open PowerShell** in the `frontend/resume-builder` directory

2. **Run one of these commands:**
   ```powershell
   npm start
   ```
   OR
   ```powershell
   .\start-dev.ps1
   ```

3. **Wait for the server to start** - you should see:
   ```
   VITE v7.x.x  ready in xxx ms
   ➜  Local:   http://localhost:5173/
   ➜  Network: http://192.168.x.x:5173/
   ```

4. **Open your browser** and go to: `http://localhost:5173`

## If You Get Permission Errors

The `.vite-temp` directory might be locked. Here's how to fix it:

### Option 1: Quick Fix
1. Close ALL programs (VS Code, browsers, terminals)
2. Open File Explorer
3. Go to: `node_modules\.vite-temp` folder
4. Delete the folder
5. Run `npm start` again

### Option 2: Use the Helper Script
```powershell
.\force-delete-vite-temp.ps1
npm start
```

## Troubleshooting

### Port 5173 Already in Use
If you see "Port 5173 is already in use":
```powershell
# Find what's using the port
netstat -ano | findstr :5173

# Kill the process (replace PID with the number from above)
taskkill /PID <PID> /F

# Then try again
npm start
```

### Server Starts But Page is Blank
1. Check browser console (F12) for errors
2. Make sure the backend server is running on port 8000
3. Check that all dependencies are installed: `npm install`

### Still Not Working?
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install`
4. Try `npm start` again

## Server Configuration

The Vite server is configured to:
- Run on port **5173**
- Automatically open browser
- Allow network access
- Enable CORS

You can change these in `vite.config.js` if needed.

