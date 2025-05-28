import Joi from 'joi';

const id = Joi.string();
const name = Joi.string().min(3);
const lastName = Joi.string().min(2);
const email = Joi.string().email({ tlds: { allow: false } }); //PAAATERN PARA EMAIL
const password = Joi.string().alphanum().min(8);
const role = Joi.string().valid('Patient', 'Secretary', 'Doctor', 'Admin');
const phone = Joi.string().pattern(/^\+?[0-9]{10,15}$/); // Validación básica para teléfono //PAAATERN PARA +
const healthInsurance = Joi.string().min(3);

const birthdate = Joi.date().iso();
const image = Joi.string().uri();
const dni = Joi.string().min(6).max(15); // Ajustá según tu país
const country = Joi.string().min(2);
const state = Joi.string().min(2);
const postalCode = Joi.string().min(2);

export const createUserRequiredDtos = Joi.object({
  name: name.required(),
  lastName: name.required(),
  email: email.required(),
  password: password.required(),
  role: role.default('Patient'),
  phone: phone,
  healthInsurance: healthInsurance,
  birthdate,
  image,
  dni,
  country,
  state,
  postalCode,
});

export const updateUserRequiredDtos = Joi.object({
  name: name,
  lastName: lastName,
  email: email,
  password: password,
  role: role,
  phone: phone,
  healthInsurance: healthInsurance,
  birthdate,
  image,
  dni,
  country,
  state,
  postalCode,
});

export const findOrDeleteRequireDtos = Joi.object({
  id: id.required(),
});

//AGREGAR ADDRES AL USUARIO, A DEMAS, PODER DEVOLVER EL EMAIL DEL USUARIO AL EDITARLO.
