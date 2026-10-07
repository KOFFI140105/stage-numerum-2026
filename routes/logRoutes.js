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

// 3. DELETE - Effacer les logs
router.delete('/', async (req, res) => {
  try {
    res.status(200).json({ succes: true, message: 'Tous les logs ont été effacés.' });
  } catch (erreur) {
    res.status(500).json({ erreur: `Erreur serveur : ${erreur.message}` });
  }
});

// 4. PUT - Mettre à jour un log par son ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nouveauMessage } = req.body;

    if (!nouveauMessage) {
      return res.status(400).json({ erreur: 'Le champ "nouveauMessage" est obligatoire.' });
    }

    res.status(200).json({
      succes: true,
      message: `Le log ID ${id} a été mis à jour avec succès : "${nouveauMessage}"`
    });
  } catch (erreur) {
    res.status(500).json({ erreur: `Erreur serveur : ${erreur.message}` });
  }
});

export default router;