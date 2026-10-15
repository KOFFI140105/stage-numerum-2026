import "dotenv/config";
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://yvesamouzou2005_db_user:gf87QZLo5MpOK0La@cluster0.jmisxuq.mongodb.net/stage_numerum_2026?retryWrites=true&w=majority');
    console.log(`✅ MongoDB connecté : ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Erreur de connexion MongoDB : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;