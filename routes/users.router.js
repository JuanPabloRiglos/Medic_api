import express from 'express';
//importaciones internas
import { userController } from '../controllers/user.controller.js';
import { validatorHandler } from '../middlewares/entryValidatorHandler.js';
import {
  createUserRequiredDtos,
  updateUserRequiredDtos,
  findOrDeleteRequireDtos,
} from '../dtos/user.dto.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { email, lastName } = req.query;
    let usersIndb;
    if (email) {
      usersIndb = await userController.getByEmail(email);
    } else if (lastName != null) {
      usersIndb = await userController.getByLastName(lastName);
    } else {
      usersIndb = await userController.getAll();
    }
    res.status(201).json(usersIndb);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(findOrDeleteRequireDtos, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const findedUser = await userController.getById(id);
      res.status(201).json(findedUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(findOrDeleteRequireDtos, 'params'),
  validatorHandler(updateUserRequiredDtos, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const newData = req.body;
    try {
      const updatedUser = await userController.update(id, newData);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserRequiredDtos, 'body'),
  async (req, res, next) => {
    try {
      const userToAdd = req.body;
      const newUser = await userController.create(userToAdd);
      res.status(200).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(findOrDeleteRequireDtos, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const removedUSer = await userController.delete(id);
      res.status(201).json(removedUSer);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
