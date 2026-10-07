import express from 'express';
import { 
  lireLogs, 
  enregistrerLog, 
  modifierLog, 
  supprimerLogParId, 
  effacerTousLesLogs 
} from '../fileManager.js';
import { validerLog } from '../middlewares/validateLog.js';

const router = express.Router();

// 1. GET - Obtenir tous les logs
router.get('/', async (req, res, next) => {
  try {
    const logs = await lireLogs();
    res.status(200).json({ succes: true, donnees: logs });
  } catch (erreur) {
    next(erreur);
  }
});

// 2. POST - Créer un nouveau log
router.post('/', validerLog, async (req, res, next) => {
  try {
    const { message } = req.body;
    const logCree = await enregistrerLog(message);
    res.status(201).json({ 
      succes: true, 
      message: 'Log enregistré avec succès.',
      donnees: logCree 
    });
  } catch (erreur) {
    next(erreur);
  }
});

// 3. PUT - Mettre à jour un log par ID
router.put('/:id', validerLog, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    const logMisAJour = await modifierLog(id, message);

    if (!logMisAJour) {
      return res.status(404).json({ 
        succes: false, 
        erreur: `Aucun log trouvé avec l'ID ${id}.` 
      });
    }

    res.status(200).json({ 
      succes: true, 
      message: 'Log mis à jour avec succès.',
      donnees: logMisAJour 
    });
  } catch (erreur) {
    next(erreur);
  }
});

// 4. DELETE - Supprimer UN log par son ID
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const supprime = await supprimerLogParId(id);

    if (!supprime) {
      return res.status(404).json({ 
        succes: false, 
        erreur: `Aucun log trouvé avec l'ID ${id}.` 
      });
    }

    res.status(200).json({ 
      succes: true, 
      message: `Le log ID ${id} a été supprimé.` 
    });
  } catch (erreur) {
    next(erreur);
  }
});

// 5. DELETE - Vider TOUS les logs
router.delete('/', async (req, res, next) => {
  try {
    await effacerTousLesLogs();
    res.status(200).json({ succes: true, message: 'Tous les logs ont été effacés.' });
  } catch (erreur) {
    next(erreur);
  }
});

export default router;