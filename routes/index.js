import express from 'express';

import userRouter from './users.router.js';
import appointmentRouter from './appointment.router.js'
import appointmentDataRouter from './appointmentData.router.js';
import authRouter from './auth.router.js';

 function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/user', userRouter);
    router.use('/appointment', appointmentRouter);
    router.use('/auth', authRouter);
    router.use('/appoinmentData', appointmentDataRouter);
}

export default routerApi