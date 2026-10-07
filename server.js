import express from 'express';
import { requestLogger } from './middlewares/loggerMiddleware.js';
import logRoutes from './routes/logRoutes.js';
import { logSuccess } from './logger.js';

const app = express();
const PORT = 3000;

// Middlewares globaux
app.use(express.json());
app.use(requestLogger);

// Déclaration des routes modularisées
app.use('/logs', logRoutes);

// Route Accueil
app.get('/', (req, res) => {
  res.send('<h1>API Express Modularisée - Numerum Dev Center</h1><p>Allez sur <a href="/logs">/logs</a> pour voir l\'historique.</p>');
});

// Démarrage du serveur
app.listen(PORT, () => {
  logSuccess(`Serveur Express démarré sur http://localhost:${PORT}`);
});
// Middleware pour intercepter les routes non trouvées (404)
app.use((req, res, next) => {
  res.status(404).json({
    succes: false,
    erreur: 'Route introuvable.'
  });
});

// Middleware de gestion d'erreurs centralisé (4 arguments)
app.use((err, req, res, next) => {
  console.error('Erreur capturée :', err.stack);
  res.status(500).json({
    succes: false,
    erreur: 'Une erreur interne est survenue sur le serveur.'
  });
});