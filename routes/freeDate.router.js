import express from 'express';
//importaciones internas
import { freeDateController } from '../controllers/freeDate.controller.js';
import { validatorHandler } from '../middlewares/entryValidatorHandler.js';
import {createFreeDateRequiredDtos, updateFreeDateRequiredDtos, findOrDeleteRequireDtos} from '../dtos/freeDate.dto.js'




const router = express.Router();

router.get('/', async (req, res, next)=>{
    try {
        const allDates = await freeDateController.getAll(next)
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
        const findDate  = await freeDateController.getById(id, next)
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
    const newData = req.body
    try {
        const dateUpdated  = await freeDateController.update(id, newData, next)
        res.status(200).json(dateUpdated)
    } catch (error) {
        next(error)
    }   
});


router.post('/',
    validatorHandler(createFreeDateRequiredDtos, 'body') ,
    async(req, res, next)=>{
    try {
        const dateToAdd = req.body ;
        const newDate  = await freeDateController.create(dateToAdd, next)
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
        const dateRemoved  = await freeDateController.destroy(id, next)
        res.status(201).json(dateRemoved)
    } catch (error) {
        next(error)
    }   
});

export default router