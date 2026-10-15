// Middleware de gestion globale des erreurs
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Gestion spécifique pour les erreurs Mongoose (ex: ID invalide, doublon d'email unique)
  if (err.name === 'CastError') {
    message = `Ressource non trouvée. ID mal formaté : ${err.value}`;
    statusCode = 404;
  }

  if (err.code === 11000) {
    message = `Valeur en double détectée pour le champ : ${Object.keys(err.keyValue)}. Veuillez en utiliser une autre.`;
    statusCode = 400;
  }

  res.status(statusCode).json({
    succes: false,
    erreur: message,
    // On affiche la pile d'erreur (stack) uniquement si on est en développement
    pile: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

export default errorHandler;