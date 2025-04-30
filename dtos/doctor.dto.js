import Joi from 'joi';

//Datos de entrada del doctor
//Requiere SIEMPRE specialidad y Numero de licencia

export const createOrUpdateDoctorDto = Joi.object({
  specialty: Joi.string().required(),
  licenseNumber: Joi.string().required(),
  experience: Joi.string().optional(),
  insuranceCompanies: Joi.string().optional(),
  address: Joi.string().optional(),
});
