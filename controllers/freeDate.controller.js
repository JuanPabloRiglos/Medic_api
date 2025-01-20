//importaciones de 3ros
import { v4 as uuidv4 } from 'uuid';
//importaciones internas
import freeDateService from '../services/freeDate.service.js'
//instancio la clase para usar fns
const service = new freeDateService()

export const freeDateController ={

    async getAll(next){
        try {
            const datesInDb = await service.getAll()
            return(datesInDb)
        } catch (error) {
            next(error);
            
        }   
    },

    async getById(id, next){
        try {
            const dateFound  = await service.findOne(id)
            return(dateFound)
        } catch (error) {
            next(error)
        } 
    },

    async update(id, newData, next){
        try {
            const datedUpdate  = await service.update(id, newData)
           return(datedUpdate)
        } catch (error) {
            next(error)
        }   
    },

    async create(data, next){
        try {
            const dateToAdd = { id: uuidv4(), ...data };
            const newDate  = await service.create(dateToAdd)
           return(newDate)
        } catch (error) {
            next(error)
        } 
    },

    async destroy(id, next){
        try {
            const dateRemoved  = await service.delete(id)
            return(dateRemoved)
        } catch (error) {
            next(error)
        }   
    }
}