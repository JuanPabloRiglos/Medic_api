import express from 'express';

import userRouter from './users.router.js';
import FreeDateRouter from './freeDate.router.js'
import appointmentRouter from './appointment.router.js';
import authRouter from './auth.router.js';

 function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/user', userRouter);
    router.use('/freedate', FreeDateRouter);
    router.use('/auth', authRouter);
    router.use('/appoinment', appointmentRouter);
}

export default routerApi