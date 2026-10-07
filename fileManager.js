import fs from 'fs/promises';
import path from 'path';

const filePath = path.resolve('logs.txt');

// 1. Lire tous les logs
export const lireLogs = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
  } catch (erreur) {
    if (erreur.code === 'ENOENT') {
      return ''; // Fichier inexistant = pas de log
    }
    throw erreur;
  }
};

// 2. Enregistrer un log horodaté
export const enregistrerLog = async (message) => {
  try {
    const dateActuelle = new Date().toISOString();
    const entreeLog = `[${dateActuelle}] - ${message}\n`;
    await fs.appendFile(filePath, entreeLog, 'utf-8');
  } catch (erreur) {
    throw erreur;
  }
};

// 3. Effacer tous les logs
export const effacerLogs = async () => {
  try {
    await fs.writeFile(filePath, '', 'utf-8');
  } catch (erreur) {
    throw erreur;
  }
};