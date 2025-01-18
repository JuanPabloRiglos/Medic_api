import express from 'express';
//importaciones internas
import UserService from '../services/users.service.js';
import { validatorHandler } from '../middlewares/entryValidatorHandler.js';
import {createUserRequiredDtos, updateUserRequiredDtos, findOrDeleteRequireDtos} from '../dtos/user.dto.js'

import { v4 as uuidv4 } from 'uuid';

//instancio la clase para usar fns
const service = new UserService()

const router = express.Router();

router.get('/', async (req, res, next)=>{
    try {
        const usersIndb = await service.getAll()
        res.status(201).json(usersIndb)
    } catch (error) {
        next(error)
    }   
});


router.get('/:id',
    validatorHandler(findOrDeleteRequireDtos, 'params'), 
    async (req, res, next)=>{
    try {
        const {id} = req.params
        const findedUser  = await service.findOne(id)
        res.status(201).json(findedUser)
    } catch (error) {
        next(error)
    }   
});

router.patch('/:id',
    validatorHandler(findOrDeleteRequireDtos, 'params'),
    validatorHandler(updateUserRequiredDtos, 'body'),
    async(req, res, next)=>{
    const {id} = req.params;
    const newData = req.body
    try {
        const updatedUser  = await service.update(id, newData)
        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }   
});


router.post('/',
    validatorHandler(createUserRequiredDtos, 'body') ,
    async(req, res, next)=>{
    try {
        const userToAdd = { id: uuidv4(), ...req.body };
        const newUser  = await service.create(userToAdd)
        res.status(200).json(newUser)
    } catch (error) {
        next(error)
    }   
});


router.delete('/:id', async(req, res, next)=>{
    try {
        const {id} = req.params
        const removedUSer  = await service.delete(id)
        res.status(201).json(removedUSer)
    } catch (error) {
        next(error)
    }   
});

export default router