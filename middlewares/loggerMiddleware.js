import { logInfo } from '../logger.js';

export const requestLogger = (req, res, next) => {
  const methode = req.method;
  const url = req.url;
  const heure = new Date().toISOString();

  logInfo(`[HTTP] ${heure} - ${methode} sur ${url}`);
  
  next();
};