export interface Car {
  id: string;
  carBrand: string;
  status: string;
  color: string;
  image: string;
  motorType: string;
  placeNumber: string;
  description: string;
  price: number;
  categoryName: string;
}

export interface ResponseCar {
  details: Car[];
}

export interface Appointment {
  id: string;
  carId: string;
  name: string;
  first_name: string;
  email: string;
  message?: string;
  contact?: string;
  appointment_date: string;
  status: 'pending' | 'validated' | 'rejected' | 'archived';
}

export interface ResponseAppointment {
  appointment: Appointment;
}
