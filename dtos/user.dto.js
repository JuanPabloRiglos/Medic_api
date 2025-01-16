import Joi from 'joi';

const id = Joi.string().uuid();
const name = Joi.string().min(3);
const email = Joi.string();
const password = Joi.string().alphanum().min(8);

export const createUserRequiredDtos = Joi.object({
    name: name.required(),
    email:email.required(),
    password:password.required()
});

export const updateUserRequiredDtos = Joi.object({
    name: name,
    email:email,
    password:password
});

export const findOrDeleteRequireDtos = Joi.object({
    id: id.required()
})