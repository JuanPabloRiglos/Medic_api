/**Explicaciones debajo de todo
 * Usuario admin :
 *  "id": "52cde5fd-fbf5-46d8-98fc-b0773754043d",
    "name": "Admin",
    "lastName": "Admin",
    "phone": "15123456789",
    "role": "Admin",
    "healthInsurance": null,
    "email": "admin@gmail.com"
      "password":"12345678", 

      USUARIO DOCTOR:
      {
	"name": "Juan Dcctor",
    "lastName": "Riglos",
    "email":"doctor@gmail.com",
    "password":"12345678Doctor",
    "phone": "15123456789", 
    "healthInsurance": "ninguna"
}
*/

//importaciones externas
import express from 'express';
import cors from 'cors';

//importaciones propias
import apiRoutes from './routes/index.js';
import {
  logErrors,
  errorsHanlder,
  boomErrorHanlder,
  ormErrorHandler,
} from './middlewares/error.handler.js';
import { setupAuth } from './utils/auth/index.js';

//constantes & variables necesarias
const port = 3000;

//configuracion de la app
const app = express();

//middlewares
app.use(express.json());
// app.use(cors()); //cualquier origen
setupAuth();
/* Esto para habilitar Solo algunas urls */
const whiteList = ['http://localhost:5173', null];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por la Api'));
    }
  },
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Bienvenido al servidor de turnos medicos');
});

//maneja las rutas
apiRoutes(app);

//manejo de errores
app.use(logErrors);
app.use(boomErrorHanlder);
app.use(ormErrorHandler);
app.use(errorsHanlder);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

/*
  - Comenzar levantando los servicios de docker-compose, ver el archivo docker-compose

  - Correr migraciones c/vez que se agregue una feature
         primer correr el migrations:generate --nombreQueQuiera
               -> genera un archivo dentro de db/migrations y ahi armar la migracion. 
 visitar url :
  https://platzi.com/home/clases/2507-backend-nodejs-postgres/41557-configurando-y-corriendo-migraciones-con-npm-scrip/
 */
