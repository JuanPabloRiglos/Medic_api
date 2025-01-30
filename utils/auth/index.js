import passport from 'passport';
//strategias a implementar
import { LocalStrategy } from './strategies/local.strategy.js';

export const setupAuth = () => {
  passport.use(LocalStrategy); //abajo mas strateg.
  console.log('✅ Passport strategies initialized');
};
