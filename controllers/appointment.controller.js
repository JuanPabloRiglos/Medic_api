//importaciones de 3ros
import { v4 as uuidv4 } from 'uuid';
//importaciones internas
import appointmentService from '../services/appointment.service.js'
//instancio la clase para usar fns
const service = new appointmentService()

export const appointmentController ={

    async getAll(){
        try {
            const datesInDb = await service.getAll()
            return(datesInDb)
        } catch (error) {
             throw error;;
            
        }   
    },

    async getById(id){
        try {
            const dateFound  = await service.findOne(id)
            return(dateFound)
        } catch (error) {
             throw error;
        } 
    },

    async update(id, newData){
        try {
            const datedUpdate  = await service.update(id, newData)
           return(datedUpdate)
        } catch (error) {
             throw error;
        }   
    },

    async create(data){
        console.log('EN Controller APP')
        try {
            const dateToAdd = { id: uuidv4(), ...data };
            const newDate  = await service.create(dateToAdd)
           return(newDate)
        } catch (error) {
             throw error;
        } 
    },

    async destroy(id){
        try {
            const dateRemoved  = await service.delete(id)
            return(dateRemoved)
        } catch (error) {
             throw error;
        }   
    }
}