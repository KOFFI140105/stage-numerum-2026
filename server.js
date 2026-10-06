import express from 'express';
import { lireLogs, enregistrerLog } from './fileManager.js';
import { logSuccess } from './logger.js';

const app = express();
const PORT = 3000;

// Middleware pour pouvoir lire le JSON envoyé par un client
app.use(express.json());

// Route 1 : Page d'accueil (GET)
app.get('/', (req, res) => {
  res.send('<h1>Bienvenue sur l\'API Express - Numerum Dev Center</h1><p>Allez sur <a href="/logs">/logs</a> pour voir l\'historique.</p>');
});

// Route 2 : Consulter les logs (GET)
app.get('/logs', async (req, res) => {
  try {
    const logs = await lireLogs();
    res.type('text/plain').send(logs || 'Aucun log enregistré pour le moment.');
  } catch (erreur) {
    res.status(500).send(`Erreur serveur : ${erreur.message}`);
  }
});

// Route 3 : Ajouter un nouveau log (POST)
app.post('/logs', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ erreur: 'Le champ "message" est obligatoire.' });
    }

    await enregistrerLog(message);
    res.status(201).json({ succes: true, message: 'Log enregistré avec succès.' });
  } catch (erreur) {
    res.status(500).json({ erreur: `Erreur serveur : ${erreur.message}` });
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  logSuccess(`Serveur Express démarré sur http://localhost:${PORT}`);
});