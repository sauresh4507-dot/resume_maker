import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const nodeModulesDir = path.join(__dirname, 'node_modules')
const viteTempDir = path.join(nodeModulesDir, '.vite-temp')

// Ensure node_modules exists first
if (!fs.existsSync(nodeModulesDir)) {
  console.error('✗ node_modules directory does not exist. Run npm install first.')
  process.exit(1)
}

// Check if directory exists and is usable
if (fs.existsSync(viteTempDir)) {
  try {
    // Try to write to verify it's usable
    const testFile = path.join(viteTempDir, '.write-test')
    fs.writeFileSync(testFile, 'test')
    fs.unlinkSync(testFile)
    console.log('✓ .vite-temp directory exists and is writable')
    process.exit(0)
  } catch (err) {
    // Directory exists but can't write
    console.log('⚠ WARNING: .vite-temp directory exists but is locked/can\'t write')
    console.log('⚠ This might cause Vite to fail. To fix:')
    console.log('')
    console.log('   1. Close ALL programs (VS Code, terminals, browsers)')
    console.log('   2. Open File Explorer')
    console.log('   3. Navigate to: node_modules\\.vite-temp')
    console.log('   4. Delete the folder manually')
    console.log('   5. Or restart your computer and delete it')
    console.log('')
    console.log('   See DELETE-VITE-TEMP.md for detailed instructions')
    console.log('')
    console.log('⚠ Continuing anyway - Vite will try to use it...')
    // Don't exit - let Vite try to handle it
    process.exit(0)
  }
}

// Directory doesn't exist - create it
try {
  fs.mkdirSync(viteTempDir, { recursive: true })
  console.log('✓ Created .vite-temp directory')
  
  // Verify write permissions
  const testFile = path.join(viteTempDir, '.write-test')
  fs.writeFileSync(testFile, 'test')
  fs.unlinkSync(testFile)
  console.log('✓ Write permissions verified')
} catch (err) {
  console.error('✗ Failed to create .vite-temp directory:', err.message)
  console.error('')
  console.error('SOLUTION:')
  console.error('1. Close all Node processes')
  console.error('2. Run PowerShell as Administrator')
  console.error('3. Navigate to this directory')
  console.error('4. See DELETE-VITE-TEMP.md for instructions')
  process.exit(1)
}

