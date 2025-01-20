import express from 'express';
//importaciones internas
import FreeDateService from '../services/freeDate.service.js';
import { validatorHandler } from '../middlewares/entryValidatorHandler.js';
import {createFreeDateRequiredDtos, updateFreeDateRequiredDtos, findOrDeleteRequireDtos} from '../dtos/freeDate.dto.js'

import { v4 as uuidv4 } from 'uuid';

//instancio la clase para usar fns
const service = new FreeDateService()

const router = express.Router();

router.get('/', async (req, res, next)=>{
    try {
        const allDates = await service.getAll()
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
        const findDate  = await service.findOne(id)
        res.status(201).json(findDate)
    } catch (error) {
        next(error)
    }   
});

router.patch('/:id',
    validatorHandler(findOrDeleteRequireDtos, 'params'),
    validatorHandler(updateFreeDateRequiredDtos, 'body'),
    async(req, res, next)=>{
    const {id} = req.params;
    console.log('Aca el id en la ruta', id)
    const newData = req.body
    try {
        const dateUpdated  = await service.update(id, newData)
        res.status(200).json(dateUpdated)
    } catch (error) {
        next(error)
    }   
});


router.post('/',
    validatorHandler(createFreeDateRequiredDtos, 'body') ,
    async(req, res, next)=>{
    try {
        const dateToAdd = { id: uuidv4(), ...req.body };
        const newDate  = await service.create(dateToAdd)
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
        const dateRemoved  = await service.delete(id)
        res.status(201).json(dateRemoved)
    } catch (error) {
        next(error)
    }   
});

export default router