import Joi from 'joi';

const id = Joi.string();
const name = Joi.string().min(3);
const lastName = Joi.string().min(2);
const email = Joi.string(); //PAAATERN PARA EMAIL
const password = Joi.string().alphanum().min(8);
const role = Joi.string().valid('Patient', 'Secretary', 'Doctor', 'Admin');
const phone = Joi.string().pattern(/^[0-9]{10,15}$/); // Validación básica para teléfono //PAAATERN PARA +
const healthInsurance = Joi.string().min(3);

export const createUserRequiredDtos = Joi.object({
  name: name.required(),
  lastName: name.required(),
  email: email.required(),
  password: password.required(),
  role: role.default('Patient'),
  phone: phone,
  healthInsurance: healthInsurance,
});

export const updateUserRequiredDtos = Joi.object({
  name: name,
  lastName: lastName,
  email: email,
  password: password,
  role: role,
  phone: phone,
  healthInsurance: healthInsurance,
});

export const findOrDeleteRequireDtos = Joi.object({
  id: id.required(),
});
