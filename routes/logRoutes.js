import express from 'express';
import { lireLogs, enregistrerLog, effacerLogs } from '../fileManager.js';
import { validerLog } from '../middlewares/validateLog.js';

const router = express.Router();

// 1. GET - Lire tous les logs
router.get('/', async (req, res, next) => {
  try {
    const logs = await lireLogs();
    res.type('text/plain').send(logs || 'Aucun log enregistré pour le moment.');
  } catch (erreur) {
    next(erreur);
  }
});

// 2. POST - Ajouter un log horodaté
router.post('/', validerLog, async (req, res, next) => {
  try {
    const { message } = req.body;
    await enregistrerLog(message);
    res.status(201).json({ succes: true, message: 'Log horodaté enregistré avec succès.' });
  } catch (erreur) {
    next(erreur);
  }
});

// 3. DELETE - Effacer tous les logs du fichier
router.delete('/', async (req, res, next) => {
  try {
    await effacerLogs();
    res.status(200).json({ succes: true, message: 'Tous les logs ont été effacés du fichier.' });
  } catch (erreur) {
    next(erreur);
  }
});

export default router;