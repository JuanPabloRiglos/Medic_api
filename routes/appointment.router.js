import express from 'express';
import passport from 'passport';
import boom from '@hapi/boom';
//importaciones internas
import { appointmentController } from '../controllers/appointment.controller.js';
import { validatorHandler } from '../middlewares/entryValidatorHandler.js';
import { rolesHandler } from '../middlewares/auth.handler.js';
import {
  createAppointmentDtos,
  updateAppointmentRequiredDtos,
  findOrDeleteRequireDtos,
} from '../dtos/appointment.dto.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { date, startDate, endDate } = req.query;
    let appointments;
    if (date) {
      appointments = await appointmentController.getByDate(date);
    } else if (!date && startDate && endDate) {
      appointments = await appointmentController.getByDateRange(
        startDate,
        endDate
      );
    } else {
      appointments = await appointmentController.getAll();
    }
    res.status(201).json(appointments);
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
      const findDate = await appointmentController.getById(id);
      res.status(201).json(findDate);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  rolesHandler('Admin', 'Doctor', 'Secretary'),
  validatorHandler(findOrDeleteRequireDtos, 'params'),
  validatorHandler(updateAppointmentRequiredDtos, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const newData = req.body;
    const userLogged = req.user;
    try {
      const dateUpdated = await appointmentController.update(
        id,
        newData,
        userLogged
      );
      res.status(200).json(dateUpdated);
    } catch (error) {
      next(error);
    }
  }
);

//Reservar. Solo Pacientes, Solo ownerBy
router.patch(
  '/book/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(findOrDeleteRequireDtos, 'params'),
  async (req, res, next) => {
    const { id } = req.params; //apointmentID
    const newOwned = req.user.sub;
    try {
      if (req.user.role !== 'Patient') {
        throw boom.unauthorized(
          'Solo los pacientes pueden reservar por esta petición'
        );
      }
      const dateUpdated = await appointmentController.bookDate(id, newOwned);
      res.status(200).json(dateUpdated);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  rolesHandler('Admin', 'Doctor', 'Secretary'),
  validatorHandler(createAppointmentDtos, 'body'),
  async (req, res, next) => {
    try {
      const userLogged = req.user;
      const datesToAdd = req.body; //siempre array
      const newDate = await appointmentController.createOneOrMany(
        datesToAdd,
        userLogged
      );
      res.status(200).json(newDate);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  rolesHandler('Admin', 'Doctor', 'Secretary'),
  validatorHandler(findOrDeleteRequireDtos, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const dateRemoved = await appointmentController.destroy(id);
      res.status(201).json(dateRemoved);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
