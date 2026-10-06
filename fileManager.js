import fs from 'fs/promises';
import { logSuccess, logError, logInfo } from './logger.js';

const FILE_PATH = './logs.txt';

// Enregistrer une ligne dans le fichier
export async function enregistrerLog(message) {
  const horodatage = new Date().toISOString();
  const ligne = `[${horodatage}] ${message}\n`;

  try {
    await fs.appendFile(FILE_PATH, ligne, 'utf8');
    logSuccess(`Log enregistré dans ${FILE_PATH}`);
  } catch (erreur) {
    logError(`Erreur lors de l'écriture du log : ${erreur.message}`);
  }
}

// Nouvelle fonction (Jour 5) : Lire le contenu du fichier
export async function lireLogs() {
  try {
    const contenu = await fs.readFile(FILE_PATH, 'utf8');
    logInfo('--- CONTENU ACTUEL DE LOGS.TXT ---');
    console.log(contenu);
    return contenu;
  } catch (erreur) {
    logError(`Impossible de lire le fichier : ${erreur.message}`);
    return null;
  }
}