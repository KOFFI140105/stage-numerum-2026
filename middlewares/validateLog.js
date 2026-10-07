// Middleware pour vérifier que le message est présent et non vide
export const validerLog = (req, res, next) => {
  const { message, nouveauMessage } = req.body;
  const contenu = message || nouveauMessage;

  if (!contenu || contenu.trim() === '') {
    return res.status(400).json({
      succes: false,
      erreur: 'Le contenu du log ne peut pas être vide.'
    });
  }

  // Passer au contrôleur/routeur suivant
  next();
};