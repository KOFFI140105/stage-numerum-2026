import chalk from 'chalk';

// Fonction d'affichage des logs d'information
export function logInfo(message) {
  console.log(chalk.blue(`[INFO] : ${message}`));
}

// Fonction d'affichage des logs de succès
export function logSuccess(message) {
  console.log(chalk.green.bold(`[SUCCÈS] : ${message}`));
}

// Fonction d'affichage des logs d'erreur
export function logError(message) {
  console.log(chalk.red.bold(`[ERREUR] : ${message}`));
}