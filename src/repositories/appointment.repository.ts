import { AppointmentStatus } from "@prisma/client";
import prisma from "../databases/db";
import { Appointment } from "../types/Appointment";

const carSelection = {
    id: true,
    name: true,
    description: true,
    brand: true,
    model: true,
    price: true,
    color: true,
    motorType: true,
    power: true,
    placeNumber: true,
    status: true,
    type: true,
    images: {
        select: {
            id: true,
            url: true
        }
    }
};

export const findAllAppointments = async () => {
    try {
        const appointments = await prisma.appointment.findMany({
            include: {
                car: { select: carSelection }
            }
        });
        return appointments;
    } catch (error) {
        console.error("Error in findAllUsers:", error);
        throw error;
    }
};

export const deleteAppointmentById = async (appointmentId: string) => {
    try {
        const appointment = await prisma.appointment.findUnique({
            where: {
                id: appointmentId
            }
        });
        if (!appointment) {
            throw new Error(`Appointment with ID ${appointmentId} not found.`);
        }
        await prisma.appointment.delete({ where: { id: appointmentId } });
        return appointment;
    } catch (error) {
        console.error("Error in deleteAppointmentById:", error);
        throw error;
    }
};

export const createAppointment = async (appointment: Appointment) => {
    try {
        const doesExists = await prisma.car.findUnique({
            where: {
                id: appointment.carId
            }
        })
        if (!doesExists) {
            throw new Error(`CAr with ID ${appointment.carId} not found.`);
        }
        return await prisma.appointment.create({
            data: { ...appointment },
        });

    } catch (error) {
        console.error("Error in createAppointment:", error);
        throw error;
    }
};

export const findAppointmentById = async (appointmentId: string) => {
    try {
        return await prisma.appointment.findUnique({
            where: { id: appointmentId },
            include: {
                car: { select: carSelection }
            }
        });
    } catch (error) {
        console.error(`Error finding appointment with ID ${appointmentId}:`, error);
        throw error;
    }
};


export const updateAppointment = async (appointmentId: string, appointment: Appointment) => {
    try {
        const existingAppointment = await findAppointmentById(appointmentId);
        if (!existingAppointment) {
            throw new Error(`Appointment with ID ${appointmentId} not found.`);
        }


        return await prisma.appointment.update({
            where: { id: appointmentId },
            data: {
                ...appointment
            },
        });
    } catch (error) {
        console.error("Error in updateUser:", error);
        throw error;
    }
};



export const updateAppointmentStatus = async (appointmentId: string, status: AppointmentStatus) => {
    try {
        const existingAppointment = await prisma.appointment.findUnique({
            where: { id: appointmentId }
        });
        if (!existingAppointment) {
            throw new Error(`Appointment with ID ${appointmentId} not found.`);
        }

        const updatedAppointment = await prisma.appointment.update({
            where: { id: appointmentId },
            data: {
                status: status
            }
        });

        return updatedAppointment;
    } catch (error) {
        console.error(`Error updating appointment with ID ${appointmentId}:`, error);
        throw error;
    }
};
