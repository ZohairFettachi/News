const net = require('net');
const { exec } = require('child_process');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

// Function to check if a port is in use
function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.log(`Port ${port} is already in use.`);
          resolve(true);
        } else {
          console.error('Error checking port:', err);
          resolve(false);
        }
      })
      .once('listening', () => {
        server.close();
        resolve(false);
      })
      .listen(port);
  });
}

// Find a process using a specific port (for Windows)
function findProcess(port) {
  return new Promise((resolve, reject) => {
    const command = process.platform === 'win32' 
      ? `netstat -ano | findstr :${port}`
      : `lsof -i :${port} | grep LISTEN`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`Command stderr: ${stderr}`);
      }
      
      console.log(`Process using port ${port}:\n${stdout}`);
      resolve(stdout);
    });
  });
}

// Find next available port
function findAvailablePort(startPort) {
  return new Promise(async (resolve) => {
    let port = startPort;
    while (await isPortInUse(port)) {
      console.log(`Port ${port} is in use, trying ${port + 1}`);
      port++;
    }
    resolve(port);
  });
}

async function main() {
  console.log(`Checking if port ${PORT} is available...`);
  
  if (await isPortInUse(PORT)) {
    console.log(`\nPort ${PORT} is already in use.`);
    
    try {
      const processInfo = await findProcess(PORT);
      console.log('\nTo kill the process using this port, you can:');
      console.log('1. Find the PID (Process ID) in the last column of the output above');
      console.log('2. Run the following command (replace PID with the actual number):');
      console.log('   taskkill /F /PID <PID>');
    } catch (err) {
      console.error('Could not find process information:', err);
    }
    
    const availablePort = await findAvailablePort(PORT + 1);
    console.log(`\nAlternatively, you can use port ${availablePort} which is available.`);
    console.log(`Update your .env file to set PORT=${availablePort}`);
    
    process.exit(1);
  } else {
    console.log(`Port ${PORT} is available.`);
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
}); 