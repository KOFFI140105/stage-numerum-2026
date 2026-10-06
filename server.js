import http from 'http';
import { lireLogs } from './fileManager.js';
import { logSuccess } from './logger.js';

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Bienvenue sur l\'API Backend - Numerum Dev Center</h1><p>Allez sur <a href="/logs">/logs</a> pour voir l\'historique.</p>');
  } 
  else if (req.url === '/logs') {
    const logs = await lireLogs();
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(logs || 'Aucun log enregistré pour le moment.');
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 - Page non trouvée');
  }
});

server.listen(PORT, () => {
  logSuccess(`Serveur Web démarré sur http://localhost:${PORT}`);
});