import express from 'express';
import Log from '../models/Log.js';
import { validateLog } from '../middlewares/validateLog.js';

const router = express.Router();

// 1. GET /logs - Récupérer les logs avec filtrage, recherche et pagination
router.get('/', async (req, res, next) => {
  try {
    const { statut, recherche, page = 1, limite = 10 } = req.query;

    // Construction dynamique du filtre MongoDB
    const filtre = {};

    // Filtre par statut si fourni
    if (statut) {
      filtre.statut = statut;
    }

    // Recherche par mot-clé dans le titre (insensible à la casse)
    if (recherche) {
      filtre.titre = { $regex: recherche, $options: 'i' };
    }

    // Conversion des paramètres de pagination
    const pageNum = parseInt(page, 10);
    const limiteNum = parseInt(limite, 10);
    const skip = (pageNum - 1) * limiteNum;

    // Exécution de la requête avec filtre, tri et pagination
    const logs = await Log.find(filtre)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limiteNum);

    // Comptage total pour la métadonnée de pagination
    const totalLogs = await Log.countDocuments(filtre);

    res.status(200).json({
      succes: true,
      resultats: logs.length,
      total: totalLogs,
      pageActuelle: pageNum,
      totalPages: Math.ceil(totalLogs / limiteNum),
      donnees: logs
    });
  } catch (error) {
    next(error);
  }
});

// 2. GET /logs/:id - Récupérer un log spécifique par son ID
router.get('/:id', async (req, res, next) => {
  try {
    const log = await Log.findById(req.params.id);

    if (!log) {
      return res.status(404).json({
        succes: false,
        erreur: 'Log introuvable.'
      });
    }

    res.status(200).json({
      succes: true,
      donnees: log
    });
  } catch (error) {
    next(error);
  }
});

// 3. POST /logs - Créer un nouveau log (avec middleware de validation)
router.post('/', validateLog, async (req, res, next) => {
  try {
    const nouveauLog = new Log(req.body);
    const logSauvegarde = await nouveauLog.save();

    res.status(201).json({
      succes: true,
      message: 'Log créé avec succès.',
      donnees: logSauvegarde
    });
  } catch (error) {
    next(error);
  }
});

// 4. PUT /logs/:id - Modifier un log existant
router.put('/:id', validateLog, async (req, res, next) => {
  try {
    const logModifie = await Log.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!logModifie) {
      return res.status(404).json({
        succes: false,
        erreur: 'Log introuvable pour la modification.'
      });
    }

    res.status(200).json({
      succes: true,
      message: 'Log mis à jour avec succès.',
      donnees: logModifie
    });
  } catch (error) {
    next(error);
  }
});

// 5. DELETE /logs/:id - Supprimer un log par son ID
router.delete('/:id', async (req, res, next) => {
  try {
    const logSupprime = await Log.findByIdAndDelete(req.params.id);

    if (!logSupprime) {
      return res.status(404).json({
        succes: false,
        erreur: 'Log introuvable pour la suppression.'
      });
    }

    res.status(200).json({
      succes: true,
      message: 'Log supprimé avec succès.',
      donnees: logSupprime
    });
  } catch (error) {
    next(error);
  }
});

export default router;