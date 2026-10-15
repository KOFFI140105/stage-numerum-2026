import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom est obligatoire']
  },
  email: {
    type: String,
    required: [true, "L'email est obligatoire"],
    unique: true,
    lowercase: true
  },
  motDePasse: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire']
  },
  role: {
    type: String,
    enum: ['utilisateur', 'admin'],
    default: 'utilisateur'
  }
}, {
  timestamps: true
});

// Hacher le mot de passe avant de sauvegarder (SANS next)
userSchema.pre('save', async function () {
  if (!this.isModified('motDePasse')) return;
  const salt = await bcrypt.genSalt(10);
  this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
});

// Méthode pour comparer les mots de passe lors de la connexion
userSchema.methods.comparerMotDePasse = async function (motDePasseClair) {
  return await bcrypt.compare(motDePasseClair, this.motDePasse);
};

const User = mongoose.model('User', userSchema);

export default User;