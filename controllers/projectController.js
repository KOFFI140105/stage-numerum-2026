import Project from '../models/Project.js';

// @desc    Créer un projet
// @route   POST /api/projects
// @access  Privé
export const creerProjet = async (req, res, next) => {
  try {
    // On associe automatiquement l'utilisateur connecté (req.user._id ou req.user.id)
    const projet = await Project.create({
      ...req.body,
      creePar: req.user._id || req.user.id,
    });

    res.status(201).json({
      succes: true,
      donnees: projet,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir tous les projets
// @route   GET /api/projects
// @access  Privé
export const obtenirProjets = async (req, res, next) => {
  try {
    const projets = await Project.find().populate('creePar', 'nom email role');

    res.status(200).json({
      succes: true,
      nombre: projets.length,
      donnees: projets,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir un projet par ID
// @route   GET /api/projects/:id
// @access  Privé
export const obtenirProjetParId = async (req, res, next) => {
  try {
    const projet = await Project.findById(req.params.id).populate('creePar', 'nom email');

    if (!projet) {
      res.status(404);
      throw new Error('Projet non trouvé.');
    }

    res.status(200).json({
      succes: true,
      donnees: projet,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mettre à jour un projet
// @route   PUT /api/projects/:id
// @access  Privé
export const mettreAJourProjet = async (req, res, next) => {
  try {
    let projet = await Project.findById(req.params.id);

    if (!projet) {
      res.status(404);
      throw new Error('Projet non trouvé.');
    }

    // Vérifier si l'utilisateur est le créateur ou un admin
    const userId = req.user._id || req.user.id;
    if (projet.creePar.toString() !== userId.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Non autorisé à modifier ce projet.');
    }

    projet = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      succes: true,
      donnees: projet,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Supprimer un projet
// @route   DELETE /api/projects/:id
// @access  Privé (Créateur ou Admin)
export const supprimerProjet = async (req, res, next) => {
  try {
    const projet = await Project.findById(req.params.id);

    if (!projet) {
      res.status(404);
      throw new Error('Projet non trouvé.');
    }

    const userId = req.user._id || req.user.id;
    if (projet.creePar.toString() !== userId.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Non autorisé à supprimer ce projet.');
    }

    await projet.deleteOne();

    res.status(200).json({
      succes: true,
      message: 'Projet supprimé avec succès.',
    });
  } catch (error) {
    next(error);
  }
};