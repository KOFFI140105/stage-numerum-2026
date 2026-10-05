import { EventEmitter } from 'events';
import { logInfo, logSuccess } from './logger.js';

const orderEmitter = new EventEmitter();

orderEmitter.on('commande_passee', (details) => {
  logInfo(`[EMAIL] Notification envoyée à ${details.client}...`);
});

orderEmitter.on('commande_passee', (details) => {
  logSuccess(`[STOCK] Article "${details.produit}" réservé (Quantité: ${details.quantite}).`);
});

// VEILLE À BIEN AVOIR "export" ICI :
export function passerCommande(client, produit, quantite) {
  logInfo(`Traitement de la commande de ${client}...`);
  orderEmitter.emit('commande_passee', { client, produit, quantite });
}