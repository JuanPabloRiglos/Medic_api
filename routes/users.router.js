import express from 'express';
//importaciones internas
import UserService from '../services/users.service.js';
import { validatorHandler } from '../middlewares/entryValidatorHandler.js';
import {createUserRequiredDtos, updateUserRequiredDtos, findOrDeleteRequireDtos} from '../dtos/user.dto.js'

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


router.get('/:userId',
    validatorHandler(findOrDeleteRequireDtos, 'params'), 
    async (req, res, next)=>{
    try {
        const {userId} = req.params
        const findedUser  = await service.findOne(userId)
        res.status(201).json(findedUser)
    } catch (error) {
        next(error)
    }   
});

router.patch('/:userId',
    validatorHandler(findOrDeleteRequireDtos, 'params'),
    validatorHandler(updateUserRequiredDtos, 'body'),
    async(req, res, next)=>{
    const {userId} = req.params;
    const newData = req.body
    try {
        const updatedUser  = await service.update({userId, newData})
        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }   
});


router.post('/', async(req, res, next)=>{
    try {
        const userToAdd = req.body
        const newUser  = await service.create(userToAdd)
        res.status(200).json(newUser)
    } catch (error) {
        next(error)
    }   
});


router.delete('/:userId', async(req, res, next)=>{
    try {
        const {userId} = req.params
        const removedUSer  = await service.delete(userId)
        res.status(201).json(removedUSer)
    } catch (error) {
        next(error)
    }   
});

export default router