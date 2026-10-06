import fs from 'fs/promises';
import { logSuccess, logError } from './logger.js';

const FILE_PATH = './logs.txt';

// Fonction pour ajouter une ligne de log dans le fichier
export async function enregistrerLog(message) {
  const horodatage = new Date().toISOString();
  const ligne = `[${horodatage}] ${message}\n`;

  try {
    // fs.appendFile ajoute le texte à la fin du fichier sans tout effacer
    await fs.appendFile(FILE_PATH, ligne, 'utf8');
    logSuccess(`Log enregistré dans ${FILE_PATH}`);
  } catch (erreur) {
    logError(`Erreur lors de l'écriture du log : ${erreur.message}`);
  }
}