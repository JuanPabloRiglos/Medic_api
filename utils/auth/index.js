import passport from 'passport';
//strategias a implementar
import { LocalStrategy } from './strategies/local.strategy.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';

export const setupAuth = () => {
  passport.use(LocalStrategy); //abajo mas strateg.
  passport.use(JwtStrategy); //abajo mas strateg.
  console.log('✅ Passport strategies initialized');
};
