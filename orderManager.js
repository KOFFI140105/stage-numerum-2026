import { EventEmitter } from 'events';
import { logInfo, logSuccess } from './logger.js';
import { enregistrerLog } from './fileManager.js';

const orderEmitter = new EventEmitter();

// Écouteur 1 : Email
orderEmitter.on('commande_passee', (details) => {
  logInfo(`[EMAIL] Notification envoyée à ${details.client}...`);
});

// Écouteur 2 : Stock
orderEmitter.on('commande_passee', (details) => {
  logSuccess(`[STOCK] Article "${details.produit}" réservé (Quantité: ${details.quantite}).`);
});

// Écouteur 3 : Sauvegarde dans le fichier texte (Jour 4)
orderEmitter.on('commande_passee', async (details) => {
  await enregistrerLog(`Commande passée par ${details.client} - Produit: ${details.produit} (Qté: ${details.quantite})`);
});

export function passerCommande(client, produit, quantite) {
  logInfo(`Traitement de la commande de ${client}...`);
  orderEmitter.emit('commande_passee', { client, produit, quantite });
}