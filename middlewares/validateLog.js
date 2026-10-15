// middlewares/validateLog.js
export const validateLog = (req, res, next) => {
  const { titre, description, statut } = req.body;

  if (!titre || titre.trim() === '') {
    return res.status(400).json({
      succes: false,
      erreur: 'Le champ "titre" est obligatoire.'
    });
  }

  if (!description || description.trim() === '') {
    return res.status(400).json({
      succes: false,
      erreur: 'Le champ "description" est obligatoire.'
    });
  }

  const statutsAutorises = ['en_cours', 'termine', 'en_attente'];
  if (statut && !statutsAutorises.includes(statut)) {
    return res.status(400).json({
      succes: false,
      erreur: `Le statut doit être l'un des suivants : ${statutsAutorises.join(', ')}`
    });
  }

  next();
};