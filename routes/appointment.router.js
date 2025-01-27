import express from 'express';
//importaciones internas
import { appointmentController } from '../controllers/appointment.controller.js';
import { validatorHandler } from '../middlewares/entryValidatorHandler.js';
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
  validatorHandler(findOrDeleteRequireDtos, 'params'),
  validatorHandler(updateAppointmentRequiredDtos, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const newData = req.body;
    try {
      const dateUpdated = await appointmentController.update(id, newData);
      res.status(200).json(dateUpdated);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createAppointmentDtos, 'body'),
  async (req, res, next) => {
    try {
      const datesToAdd = req.body; //siempre array
      const newDate = await appointmentController.createOneOrMany(datesToAdd);
      res.status(200).json(newDate);
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
      const dateRemoved = await appointmentController.destroy(id);
      res.status(201).json(dateRemoved);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
