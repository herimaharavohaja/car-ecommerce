import { Request, Response } from 'express';
import {
    findAllAppointments, findAppointmentById,
    updateAppointment as updateAppointmentInRepository,
    createAppointment as createAppointmentInRepository,
    deleteAppointmentById,
    updateAppointmentStatus as updateAppointmentStatusInRepository
} from '../repositories/appointment.repository';

import { AppointmentStatus } from '@prisma/client';

export const getAllAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await findAllAppointments();
        res.json(appointments);
    } catch (error) {
        console.error("Error in getAllAppointments:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAppointmentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const appointment = await findAppointmentById(id);
        res.status(200).json(appointment);
    } catch (error) {
        console.error("Error in getAppointmentById:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createAppointment = async (req: Request, res: Response) => {
    try {
        const { carId, name, firstName, email, message, contact, appointmentDate, status } = req.body;
        const appointment = await createAppointmentInRepository({ carId, name, firstName, email, message, contact, appointmentDate, status });
        res.status(201).json(appointment);
    } catch (error) {
        console.error("Error in createAppointment:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateAppointment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { carId, name, firstName, email, message, contact, appointmentDate, status } = req.body;
        const appointment = await updateAppointmentInRepository(id, { carId, name, firstName, email, message, contact, appointmentDate, status });
        res.json(appointment);
    } catch (error) {
        console.error("Error in updateAppointment:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteAppointment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const appointment = await deleteAppointmentById(id);
        res.status(200).send(appointment);
    } catch (error) {
        console.error("Error in deleteAppointment:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export const updateAppointmentStatus = async (req: Request, res: Response) => {
    const appointmentId = req.params.id as string;
    const { status } = req.body;

    try {
        const updatedAppointment = await updateAppointmentStatusInRepository(appointmentId, status as AppointmentStatus);
        res.json(updatedAppointment);
    } catch (error) {
        console.error(`Error updating appointment status for ID ${appointmentId}:`, error);
        res.status(500).json({ error: "Failed to update appointment status." });
    }
};
