import { Router } from 'express';
import { createAppointment,updateAppointmentStatus, deleteAppointment, getAllAppointments, getAppointmentById, updateAppointment } from '../controllers/appointment.controller';

const router = Router();

router.get('/', getAllAppointments);
router.get('/:id', getAppointmentById);
router.post('/', createAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);
router.put("/status/:id", updateAppointmentStatus);
export default router;
