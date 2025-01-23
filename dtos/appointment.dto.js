import Joi from 'joi';

const id = Joi.string(); // Validación para UUID.
const date = Joi.date().iso(); // Validación para la fecha en formato ISO.
const time = Joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/);// Validación para la hora en formato HH:MM.
const createdBy = Joi.string(); // UUID del creador.
const ownedBy = Joi.string().allow(null); // UUID del propietario del turno, puede ser null inicialmente.
const assignedBy = Joi.string().allow(null); // UUID de quien asignó el turno, puede ser null inicialmente.

export const createAppointmentDtos = Joi.object({
    date: date.required(),
    time: time.required(),
    createdBy: createdBy.required(),
    ownedBy: ownedBy.default(null), 
    assignedBy: assignedBy.default(null)
});

export const updateAppointmentRequiredDtos = Joi.object({
    date: date, 
    time: time, 
    ownedBy: ownedBy, 
    assignedBy: assignedBy
});

export const findOrDeleteRequireDtos = Joi.object({
    id: id.required()
});
