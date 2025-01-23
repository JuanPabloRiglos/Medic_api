import Joi from 'joi';

const id = Joi.string().uuid(); // Validación para UUID.
const appointmentId = Joi.string().uuid(); // UUID de la cita.
const date = Joi.date().iso(); // Validación para la fecha en formato ISO.
const symptoms = Joi.string().allow('').allow(null); // Campo para síntomas, puede ser vacío o null.
const observations = Joi.string().allow('').allow(null); // Campo para observaciones, puede ser vacío o null.
const directives = Joi.string().allow('').allow(null); // Campo para directivas, puede ser vacío o null.
const patientId = Joi.string().uuid(); // UUID del paciente.
const doctorId = Joi.string().uuid(); // UUID del doctor.

export const createAppointmentDataDtos = Joi.object({
    appointmentId: appointmentId.required(),
    date: date.required(),
    symptoms: symptoms.allow('').default(null),
    observations: observations.allow('').default(null),
    directives: directives.allow('').default(null),
    patientId: patientId.required(),
    doctorId: doctorId.required()
});

export const updateAppointmentDataDtos = Joi.object({
    symptoms: symptoms, 
    observations: observations, 
    directives: directives, 
    doctorId: doctorId
});

export const findOrDeleteRequireDtos = Joi.object({
    id: id.required()
});
