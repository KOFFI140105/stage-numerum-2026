import express from 'express';
import {
  inscrire,
  connecter,
  obtenirMonProfil,
  obtenirTousLesUtilisateurs
} from '../controllers/authController.js';
import { proteger, autoriser } from '../middlewares/authmiddlewares.js';

const router = express.Router();

// Routes publiques
router.post('/register', inscrire);
router.post('/login', connecter);

// Route protégée
router.get('/me', proteger, obtenirMonProfil);

// Route protégée RÉSERVÉE UNIQUEMENT AUX ADMINS
router.get('/utilisateurs', proteger, autoriser('admin'), obtenirTousLesUtilisateurs);

export default router;