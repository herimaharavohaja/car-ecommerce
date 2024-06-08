import { Appointment, ResponseAppointment } from "../type/type";

export async function getData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}



export async function createAppointment(url: string, appointment: Appointment): Promise<ResponseAppointment> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(appointment)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData: ResponseAppointment = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
}
