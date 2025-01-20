//importaciones de 3ros
import { v4 as uuidv4 } from 'uuid';
//importaciones internas
import UserService from '../services/users.service.js'
//instancio la clase para usar fns
const service = new UserService()

export const userController ={

    async getAll(next){
        try {
            const usersIndb = await service.getAll()
            return(usersIndb)
        } catch (error) {
            next(error);
            
        }   
    },

    async getById(id, next){
        try {
            const findedUser  = await service.findOne(id)
            return(findedUser)
        } catch (error) {
            next(error)
        } 
    },

    async update(id, newData, next){
        try {
            const updatedUser  = await service.update(id, newData)
           return(updatedUser)
        } catch (error) {
            next(error)
        }   
    },

    async create(data, next){
        try {
            const userToAdd = { id: uuidv4(), ...data };
            const newUser  = await service.create(userToAdd)
           return(newUser)
        } catch (error) {
            next(error)
        } 
    },

    async destroy(id, next){
        try {
            const removedUSer  = await service.delete(id)
            return(removedUSer)
        } catch (error) {
            next(error)
        }   
    }
}