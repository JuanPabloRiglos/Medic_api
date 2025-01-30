import { Strategy } from 'passport-local';
import boom from '@hapi/boom';
import bcrypt from 'bcrypt';

//Servicio
import AuthService from '../../../services/auth.service.js';
const service = new AuthService();

export const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    console.log('Llega al strategy:', email, password);
    try {
      const authData = await service.findOne(email);
      if (!authData) done(boom.notFound('Usuario no encontrado'), false);
      const isMAtch = await bcrypt.compare(password, authData.password);
      if (!isMAtch) done(boom.unauthorized('La contraseña no coincide'), false);
      done(null, authData);
    } catch (error) {
      done(error, false);
    }
  }
);
