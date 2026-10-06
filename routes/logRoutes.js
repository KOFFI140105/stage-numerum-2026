import express from 'express';
import { lireLogs, enregistrerLog } from '../fileManager.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const logs = await lireLogs();
    res.type('text/plain').send(logs || 'Aucun log enregistré pour le moment.');
  } catch (erreur) {
    res.status(500).send(`Erreur serveur : ${erreur.message}`);
  }
});

router.post('/', async (req, res) => {
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

export default router;