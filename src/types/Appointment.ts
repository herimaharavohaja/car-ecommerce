import { AppointmentStatus } from "@prisma/client";

export type Appointment = {
    id ?: string;
    carId : string;
    name: string;
    firstName?: string;
    email: string;
    message?: string;
    contact?: string;
    appointmentDate?: Date;
    status: AppointmentStatus;
}
