import Joi from 'joi';

const id = Joi.string();
const email = Joi.string();
const password = Joi.string().alphanum().min(8);

export const createAuthRequiredDtos = Joi.object({
  //dEBE REQUEIR LO MISMO QUE PARA CREAR USUARIO, USO ESE DOT.
});

export const loginRequiredDtos = Joi.object({
  email: email.required(),
  password: password.required(),
});

export const updateUserRequiredDtos = Joi.object({
  email: email,
  password: password,
});

export const findOrDeleteRequireDtos = Joi.object({
  id: id.required(),
});
