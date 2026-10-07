import express from 'express';
import { lireLogs, enregistrerLog } from '../fileManager.js';
import { validerLog } from '../middlewares/validateLog.js';

const router = express.Router();

// 1. GET - Lire tous les logs
router.get('/', async (req, res, next) => {
  try {
    const logs = await lireLogs();
    res.type('text/plain').send(logs || 'Aucun log enregistré pour le moment.');
  } catch (erreur) {
    next(erreur); // Transmet l'erreur au gestionnaire centralisé
  }
});

// 2. POST - Ajouter un log (avec validation)
router.post('/', validerLog, async (req, res, next) => {
  try {
    const { message } = req.body;
    await enregistrerLog(message);
    res.status(201).json({ succes: true, message: 'Log enregistré avec succès.' });
  } catch (erreur) {
    next(erreur);
  }
});

// 3. PUT - Mettre à jour un log par ID (avec validation)
router.put('/:id', validerLog, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nouveauMessage } = req.body;

    res.status(200).json({
      succes: true,
      message: `Le log ID ${id} a été mis à jour avec succès : "${nouveauMessage}"`
    });
  } catch (erreur) {
    next(erreur);
  }
});

// 4. DELETE - Effacer tous les logs
router.delete('/', async (req, res, next) => {
  try {
    res.status(200).json({ succes: true, message: 'Tous les logs ont été effacés.' });
  } catch (erreur) {
    next(erreur);
  }
});

export default router;