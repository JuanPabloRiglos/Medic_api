import express from 'express';
//importaciones internas
import { appointmentController } from '../controllers/appointment.controller.js';
import { validatorHandler } from '../middlewares/entryValidatorHandler.js';
import {createAppointmentDtos, updateAppointmentRequiredDtos, findOrDeleteRequireDtos} from '../dtos/appointment.dto.js'




const router = express.Router();

router.get('/', async (req, res, next)=>{
    try {
        const allDates = await appointmentController.getAll()
        res.status(201).json(allDates)
    } catch (error) {
        next(error)
    }   
});


router.get('/:id',
    validatorHandler(findOrDeleteRequireDtos, 'params'), 
    async (req, res, next)=>{
    try {
        const {id} = req.params
        const findDate  = await appointmentController.getById(id)
        res.status(201).json(findDate)
    } catch (error) {
        next(error)
    }   
});

router.patch('/:id',
    validatorHandler(findOrDeleteRequireDtos, 'params'),
    validatorHandler(updateAppointmentRequiredDtos, 'body'),
    async(req, res, next)=>{
    const {id} = req.params;
    const newData = req.body
    try {
        const dateUpdated  = await appointmentController.update(id, newData)
        res.status(200).json(dateUpdated)
    } catch (error) {
        next(error)
    }   
});


router.post('/',
    validatorHandler(createAppointmentDtos, 'body') ,
    async(req, res, next)=>{
    try {
        console.log('EN ROUTER APP')
        const dateToAdd = req.body ;
        const newDate  = await appointmentController.create(dateToAdd)
        res.status(200).json(newDate)
    } catch (error) {
        next(error)
    }   
});


router.delete('/:id',
    validatorHandler(findOrDeleteRequireDtos, 'params'),
    async(req, res, next)=>{
    try {
        const {id} = req.params
        const dateRemoved  = await appointmentController.destroy(id)
        res.status(201).json(dateRemoved)
    } catch (error) {
        next(error)
    }   
});

export default router