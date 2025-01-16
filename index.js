//importaciones externas
import express from 'express';
import cors from 'cors';

//importaciones propias
import apiRoutes from "./routes/index.js"
import {logErrors, errorsHanlder, boomErrorHanlder} from './middlewares/error.handler.js'
import e from 'express';

//constantes & variables necesarias
const port = 3000

//configuracion de la app
 const app = express();

//middlewares
 app.use(express.json());
 app.use(cors()); //cualquier origen

 /* Esto para habilitar Solo algunas urls 
 const whiteList=[ 'http:localhost:8080', 'https:unfrontend.com'];
 const options ={
   origin: (origin, callback)=>{
      if(whiteList.includes(origin)){
         callback(null, true)
      }else{
         callback(new Error('Origen no permitido por la Api'))
      }
   }
 }
 app.use(cors(options))
*/
 app.get('/', (req, res)=>{
    res.send('Bienvenido al servidor de turnos medicos')
 });

 //maneja las rutas
 apiRoutes(app);


 //manejo de errores
 app.use(logErrors);
 app.use(boomErrorHanlder);
 app.use(errorsHanlder);

 app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto ${port}`)
 })