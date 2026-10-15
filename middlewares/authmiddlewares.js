import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const proteger = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-motDePasse');

      if (!req.user) {
        return res.status(401).json({
          succes: false,
          erreur: 'Utilisateur non trouvé pour ce token.'
        });
      }

      next();
    } catch (error) {
      console.error('Erreur de token :', error.message);
      return res.status(401).json({
        succes: false,
        erreur: 'Non autorisé, token invalide ou expiré.'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      succes: false,
      erreur: 'Non autorisé, aucun token fourni.'
    });
  }
};
// Middleware pour restreindre l'accès à certains rôles (ex: admin)
export const autoriser = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        succes: false,
        erreur: `Le rôle (${req.user.role}) n'est pas autorisé à accéder à cette ressource.`
      });
    }
    next();
  };
};