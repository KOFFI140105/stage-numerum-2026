import fs from 'fs/promises';
import path from 'path';

const filePath = path.resolve('logs.json');

// Helper pour lire le fichier JSON
export const lireLogs = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (erreur) {
    if (erreur.code === 'ENOENT') {
      return []; // Si le fichier n'existe pas encore, on renvoie un tableau vide
    }
    throw erreur;
  }
};

// Helper pour écrire dans le fichier JSON
const sauvegarderLogs = async (logs) => {
  await fs.writeFile(filePath, JSON.stringify(logs, null, 2), 'utf-8');
};

// 1. Enregistrer un nouveau log avec un ID unique
export const enregistrerLog = async (message) => {
  const logs = await lireLogs();
  
  const nouveauLog = {
    id: Date.now().toString(), // Identifiant unique basé sur le timestamp
    message,
    date: new Date().toISOString()
  };

  logs.push(nouveauLog);
  await sauvegarderLogs(logs);
  return nouveauLog;
};

// 2. Mettre à jour un log par son ID
export const modifierLog = async (id, nouveauMessage) => {
  const logs = await lireLogs();
  const index = logs.findIndex((log) => log.id === id);

  if (index === -1) {
    return null; // Log non trouvé
  }

  logs[index].message = nouveauMessage;
  logs[index].dateModification = new Date().toISOString();

  await sauvegarderLogs(logs);
  return logs[index];
};

// 3. Supprimer un log par son ID
export const supprimerLogParId = async (id) => {
  const logs = await lireLogs();
  const nouveauxLogs = logs.filter((log) => log.id !== id);

  if (logs.length === nouveauxLogs.length) {
    return false; // Aucun log supprimé
  }

  await sauvegarderLogs(nouveauxLogs);
  return true;
};

// 4. Effacer tous les logs
export const effacerTousLesLogs = async () => {
  await sauvegarderLogs([]);
};