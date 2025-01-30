import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
//importaciones internas
import { authController } from '../controllers/auth.controller.js';
import { userController } from '../controllers/user.controller.js'; //PARA POST/REGISTER
import { validatorHandler } from '../middlewares/entryValidatorHandler.js';
import { createUserRequiredDtos } from '../dtos/user.dto.js'; //PARA POST/REGISTER
import {
  updateUserRequiredDtos,
  findOrDeleteRequireDtos,
  loginRequiredDtos,
} from '../dtos/auth.dto.js';
import config from '../config/config.js';

const router = express.Router();

//login
router.post(
  '/login',
  validatorHandler(loginRequiredDtos, 'body'),
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const responsStrategy = req.user; // devuelto x la validacion. El registro en auth.
      const { userLogged } = await authController.login(responsStrategy.email);
      const payload = {
        sub: userLogged.id,
        role: userLogged.role,
      };
      //Genero la firma p/token
      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1d' });
      res.status(200).json({ userLogged, token });
    } catch (error) {
      next(error);
    }
  }
);

//Register
router.post(
  '/register',
  validatorHandler(createUserRequiredDtos, 'body'),
  async (req, res, next) => {
    try {
      const userToAdd = req.body;
      const newUser = await userController.create(userToAdd); // USER CONTROLLER
      res.status(200).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', async (req, res, next) => {
  try {
    const { email } = req.query;
    let usersIndb;
    if (email) {
      usersIndb = await authController.getByEmail(email);
    } else {
      usersIndb = await authController.getAll();
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
      const findedUser = await authController.getById(id);
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
      const updatedUser = await authController.update(id, newData);
      res.status(200).json(updatedUser);
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
      const removedUSer = await authController.delete(id);
      res.status(201).json(removedUSer);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
