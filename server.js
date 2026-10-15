// server.js
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import { requestLogger } from './middlewares/loggerMiddleware.js';
import logRoutes from './routes/logRoutes.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import errorHandler from './middlewares/errorMiddlewares.js';
import { logSuccess } from './logger.js';

// Initialisation des variables d'environnement
dotenv.config();

// Connexion à la base de données MongoDB Atlas
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globaux
app.use(express.json());
app.use(requestLogger);

// Déclaration des routes modularisées
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/logs', logRoutes);

// Route Accueil
app.get('/', (req, res) => {
  res.send('<h1>API Express Modularisée - Numerum Dev Center</h1><p>Allez sur <a href="/logs">/logs</a> pour voir l\'historique.</p>');
});

// Middleware pour intercepter les routes non trouvées (404)
app.use((req, res, next) => {
  res.status(404).json({
    succes: false,
    erreur: 'Route introuvable.'
  });
});

// Middleware de gestion d'erreurs global (centralisé)
app.use(errorHandler);

// Démarrage du serveur
app.listen(PORT, () => {
  logSuccess(`Serveur Express démarré sur http://localhost:${PORT}`);
});