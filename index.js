import { passerCommande } from './orderManager.js';
import { logSuccess } from './logger.js';

logSuccess('=== JOUR 3 : SYSTÈME D\'ÉVÉNEMENTS ===');

// Test de passage de commandes
passerCommande('Koffi', 'MacBook Pro', 1);
console.log('-----------------------------------');
passerCommande('Awa', 'Écran Dell 27"', 2);