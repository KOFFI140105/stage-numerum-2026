import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: [true, 'Le titre du projet est obligatoire.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'La description est obligatoire.'],
    },
    statut: {
      type: String,
      enum: ['en_cours', 'termine', 'en_attente'],
      default: 'en_cours',
    },
    // Relation avec l'utilisateur qui a créé le projet
    creePar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, // Génère createdAt et updatedAt
  }
);

export default mongoose.model('Project', projectSchema);