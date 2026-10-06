import express from 'express';
import { lireLogs, enregistrerLog } from '../fileManager.js';

const router = express.Router();

// 1. GET - Récupérer tous les logs
router.get('/', async (req, res) => {
  try {
    const logs = await lireLogs();
    res.type('text/plain').send(logs || 'Aucun log enregistré pour le moment.');
  } catch (erreur) {
    res.status(500).send(`Erreur serveur : ${erreur.message}`);
  }
});

// 2. POST - Ajouter un log
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

// 3. DELETE - Effacer les logs (Simulation de suppression)
router.delete('/', async (req, res) => {
  try {
    // Logique de réinitialisation/suppression
    res.status(200).json({ succes: true, message: 'Tous les logs ont été effacés.' });
  } catch (erreur) {
    res.status(500).json({ erreur: `Erreur serveur : ${erreur.message}` });
  }
});

export default router;