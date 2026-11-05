const { spawn } = require('child_process');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const URL_FILE = path.join(__dirname, '../dist/live_tunnel.txt');

function startTunnel() {
  console.log('[TUNNEL] Starting localhost.run SSH tunnel...');
  const ssh = spawn('ssh', [
    '-o', 'StrictHostKeyChecking=no',
    '-o', 'ServerAliveInterval=15',
    '-o', 'ServerAliveCountMax=3',
    '-R', '80:127.0.0.1:4173',
    'nokey@localhost.run'
  ]);

  let currentUrl = null;
  let keepAliveInterval = null;

  ssh.stdout.on('data', (data) => {
    const text = data.toString();
    const match = text.match(/https:\/\/[a-zA-Z0-9.-]*lhr\.life/);
    if (match && match[0] !== currentUrl) {
      currentUrl = match[0];
      console.log(`[TUNNEL] Active URL: ${currentUrl}`);
      fs.writeFileSync(URL_FILE, currentUrl);

      if (keepAliveInterval) clearInterval(keepAliveInterval);
      keepAliveInterval = setInterval(() => {
        if (!currentUrl) return;
        https.get(currentUrl, (res) => {
          // keepalive ping
        }).on('error', () => {});
      }, 35000); // ping every 35s to prevent activity timeout
    }
  });

  ssh.stderr.on('data', (data) => {
    const text = data.toString();
    if (text.includes('Warning') || text.includes('Permanently added')) return;
    console.error(`[TUNNEL STDERR] ${text.trim()}`);
  });

  ssh.on('close', (code) => {
    console.log(`[TUNNEL] SSH closed with code ${code}. Reconnecting in 3 seconds...`);
    if (keepAliveInterval) clearInterval(keepAliveInterval);
    setTimeout(startTunnel, 3000);
  });
}

startTunnel();
