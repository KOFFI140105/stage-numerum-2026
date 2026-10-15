import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Fonction pour générer un Token JWT
const genererToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_temporaire_stage', {
    expiresIn: '30d'
  });
};

// INSCRIPTION
export const inscrire = async (req, res) => {
  try {
    const { nom, email, motDePasse } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const utilisateurExiste = await User.findOne({ email });
    if (utilisateurExiste) {
      return res.status(400).json({ succes: false, erreur: 'Cet email est déjà utilisé.' });
    }

    // Créer l'utilisateur
    const utilisateur = await User.create({ nom, email, motDePasse });

    if (utilisateur) {
      res.status(201).json({
        succes: true,
        message: 'Utilisateur créé avec succès',
        donnees: {
          _id: utilisateur._id,
          nom: utilisateur.nom,
          email: utilisateur.email,
          role: utilisateur.role,
          token: genererToken(utilisateur._id)
        }
      });
    } else {
      res.status(400).json({ succes: false, erreur: 'Données utilisateur invalides.' });
    }
  } catch (error) {
    console.error("ERREUR DÉTAILLÉE :", error); // Affiche l'erreur complète dans la console VS Code
    res.status(500).json({ succes: false, erreur: error.message });
  }
};

// CONNEXION
export const connecter = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // Trouver l'utilisateur par son email
    const utilisateur = await User.findOne({ email });

    // Vérifier l'utilisateur et le mot de passe
    if (utilisateur && (await utilisateur.comparerMotDePasse(motDePasse))) {
      res.json({
        succes: true,
        message: 'Connexion réussie',
        donnees: {
          _id: utilisateur._id,
          nom: utilisateur.nom,
          email: utilisateur.email,
          role: utilisateur.role,
          token: genererToken(utilisateur._id)
        }
      });
    } else {
      res.status(401).json({ succes: false, erreur: 'Email ou mot de passe incorrect.' });
    }
  } catch (error) {
    console.error("ERREUR DÉTAILLÉE :", error);
    res.status(500).json({ succes: false, erreur: error.message });
  }
};

// ----------------------------------------------------
// PROFIL DE L'UTILISATEUR CONNECTÉ (Route Protégée)
// ----------------------------------------------------
export const obtenirMonProfil = async (req, res) => {
  res.status(200).json({
    succes: true,
    utilisateur: req.user
  });
};
// ----------------------------------------------------
// OBTENIR TOUS LES UTILISATEURS (Réservé à l'Admin)
// ----------------------------------------------------
export const obtenirTousLesUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await User.find().select('-motDePasse');
    res.status(200).json({
      succes: true,
      total: utilisateurs.length,
      donnees: utilisateurs
    });
  } catch (error) {
    console.error("ERREUR DÉTAILLÉE :", error);
    res.status(500).json({ succes: false, erreur: error.message });
  }
};