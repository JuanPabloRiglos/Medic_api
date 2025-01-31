import express from 'express';
import passport from 'passport';
//importaciones internas
import { appointmentDataController } from '../controllers/appointmentData.controller.js';
import { validatorHandler } from '../middlewares/entryValidatorHandler.js';
import { rolesHandler } from '../middlewares/auth.handler.js';
import {
  createAppointmentDataDtos,
  updateAppointmentDataDtos,
  findOrDeleteRequireDtos,
} from '../dtos/appointmentData.dto.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { patientId } = req.query;
    let allDates;
    if (patientId) {
      allDates = await appointmentDataController.getAppointmentsByPatientId(
        patientId
      );
    } else {
      allDates = await appointmentDataController.getAll();
    }
    res.status(201).json(allDates);
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
      const findDate = await appointmentDataController.getById(id);
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
  validatorHandler(updateAppointmentDataDtos, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const newData = req.body;
    try {
      const dateUpdated = await appointmentDataController.update(id, newData);
      res.status(200).json(dateUpdated);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createAppointmentDataDtos, 'body'),
  async (req, res, next) => {
    try {
      const dateToAdd = req.body;
      const newDate = await appointmentDataController.create(dateToAdd);
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
      const dateRemoved = await appointmentDataController.destroy(id);
      res.status(201).json(dateRemoved);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
