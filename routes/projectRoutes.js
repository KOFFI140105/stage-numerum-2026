import express from 'express';
import { 
  creerProjet, 
  obtenirProjets, 
  obtenirProjetParId, 
  mettreAJourProjet, 
  supprimerProjet 
} from '../controllers/projectController.js';
import { proteger } from '../middlewares/authmiddlewares.js';

const router = express.Router();

// Toutes les routes de ce fichier sont protégées
router.use(proteger);

router.route('/')
  .post(creerProjet)
  .get(obtenirProjets);

router.route('/:id')
  .get(obtenirProjetParId)
  .put(mettreAJourProjet)
  .delete(supprimerProjet);

export default router;