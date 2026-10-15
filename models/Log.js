// models/Log.js
import mongoose from 'mongoose';

const logSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: [true, 'Le titre est obligatoire'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'La description est obligatoire']
    },
    statut: {
      type: String,
      enum: ['en_cours', 'termine', 'en_attente'],
      default: 'en_cours'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Log', logSchema);