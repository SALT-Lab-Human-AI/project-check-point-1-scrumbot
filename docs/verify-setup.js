#!/usr/bin/env node

/**
 * ScrumBot Installation Verification Script
 * Run this after installation to verify everything is set up correctly
 * 
 * Usage: node verify-setup.js
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 ScrumBot Setup Verification\n');
console.log('='.repeat(50));

let allChecksPass = true;

// Check 1: Node.js version
console.log('\n✓ Checking Node.js version...');
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
if (majorVersion >= 18) {
  console.log(`  ✅ Node.js ${nodeVersion} (required: v18+)`);
} else {
  console.log(`  ❌ Node.js ${nodeVersion} is too old (required: v18+)`);
  console.log(`     Download from: https://nodejs.org/`);
  allChecksPass = false;
}

// Check 2: package.json exists
console.log('\n✓ Checking package.json...');
if (fs.existsSync('package.json')) {
  console.log('  ✅ package.json found');
} else {
  console.log('  ❌ package.json not found');
  console.log('     Make sure you\'re in the project root directory');
  allChecksPass = false;
}

// Check 3: node_modules exists
console.log('\n✓ Checking dependencies...');
if (fs.existsSync('node_modules')) {
  console.log('  ✅ node_modules found (dependencies installed)');
} else {
  console.log('  ❌ node_modules not found');
  console.log('     Run: npm install');
  allChecksPass = false;
}

// Check 4: .env.local exists
console.log('\n✓ Checking environment configuration...');
if (fs.existsSync('.env.local')) {
  console.log('  ✅ .env.local found');
  
  // Check if it contains API key
  const envContent = fs.readFileSync('.env.local', 'utf8');
  if (envContent.includes('GROQ_API_KEY=') && !envContent.includes('your_groq_api_key_here')) {
    console.log('  ✅ GROQ_API_KEY appears to be configured');
  } else {
    console.log('  ⚠️  GROQ_API_KEY not configured or using placeholder');
    console.log('     Get your API key from: https://console.groq.com/keys');
    console.log('     Then edit .env.local and replace the placeholder');
  }
} else {
  console.log('  ❌ .env.local not found');
  console.log('     Run: cp .env.example .env.local');
  console.log('     Then edit .env.local and add your Groq API key');
  allChecksPass = false;
}

// Check 5: .env.example exists
console.log('\n✓ Checking .env.example...');
if (fs.existsSync('.env.example')) {
  console.log('  ✅ .env.example found');
} else {
  console.log('  ⚠️  .env.example not found (this is okay, but recommended)');
}

// Check 6: Next.js files
console.log('\n✓ Checking Next.js structure...');
const requiredFiles = [
  'next.config.mjs',
  'app/page.tsx',
  'app/api/extract-stories/route.ts',
  'lib/store.ts'
];

let missingFiles = [];
requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    missingFiles.push(file);
  }
});

if (missingFiles.length === 0) {
  console.log('  ✅ All required Next.js files found');
} else {
  console.log('  ❌ Missing required files:');
  missingFiles.forEach(file => console.log(`     - ${file}`));
  allChecksPass = false;
}

// Check 7: TypeScript configuration
console.log('\n✓ Checking TypeScript configuration...');
if (fs.existsSync('tsconfig.json')) {
  console.log('  ✅ tsconfig.json found');
} else {
  console.log('  ❌ tsconfig.json not found');
  allChecksPass = false;
}

// Check 8: Tailwind configuration
console.log('\n✓ Checking Tailwind CSS configuration...');
if (fs.existsSync('tailwind.config.ts') || fs.existsSync('tailwind.config.js')) {
  console.log('  ✅ Tailwind configuration found');
} else {
  console.log('  ❌ Tailwind configuration not found');
  allChecksPass = false;
}

// Check 9: Sample data
console.log('\n✓ Checking sample data...');
if (fs.existsSync('sample-transcripts')) {
  const files = fs.readdirSync('sample-transcripts');
  if (files.length > 0) {
    console.log(`  ✅ Sample transcripts found (${files.length} file(s))`);
  } else {
    console.log('  ⚠️  sample-transcripts folder is empty');
  }
} else {
  console.log('  ⚠️  sample-transcripts folder not found (demo data may not work)');
}

// Check 10: Git repository
console.log('\n✓ Checking Git repository...');
if (fs.existsSync('.git')) {
  console.log('  ✅ Git repository initialized');
} else {
  console.log('  ⚠️  Not a Git repository (this is okay for local testing)');
}

// Final summary
console.log('\n' + '='.repeat(50));
if (allChecksPass) {
  console.log('\n✅ All checks passed! You\'re ready to run ScrumBot.');
  console.log('\nNext steps:');
  console.log('  1. Make sure you\'ve added your Groq API key to .env.local');
  console.log('  2. Run: npm run dev');
  console.log('  3. Open: http://localhost:3000');
  console.log('\nHappy sprint planning! 🚀\n');
} else {
  console.log('\n❌ Some checks failed. Please fix the issues above.');
  console.log('\nFor detailed setup instructions, see: INSTALL.md');
  console.log('For help, contact:');
  console.log('  - Om Vyas: omvyas2@illinois.edu');
  console.log('  - Nakul Vasani: nvasani2@illinois.edu\n');
  process.exit(1);
}

// Optional: Check if server is already running
console.log('Optional checks:');
console.log('\n✓ Checking if port 3000 is available...');
const net = require('net');
const server = net.createServer();

server.once('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('  ⚠️  Port 3000 is already in use');
    console.log('     Either stop the existing server or use a different port:');
    console.log('     PORT=3001 npm run dev');
  }
});

server.once('listening', () => {
  console.log('  ✅ Port 3000 is available');
  server.close();
});

server.listen(3000);
