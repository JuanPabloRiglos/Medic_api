import { Strategy, ExtractJwt } from 'passport-jwt';
import boom from '@hapi/boom';
import config from '../../../config/config.js';

const options = {
  //las options son las que le van a decir a jwt de donde sacar la data
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // x 1/2 del iption, obtiene la info del Bearer
  secretOrKey: config.jwtSecret,
  //verifica con el secreto
  //devuelve el PAYLOAD
};

//definimos la strategy
export const JwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    return done(null, payload); //1er. parm en donde, es el error siempre
  } catch (error) {
    done(boom.internal('Problemas al validar el token de tu sesion.'), false);
  }
});
