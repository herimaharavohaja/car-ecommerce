import { CarStatus } from "@prisma/client";

export type  Car =  {
    id ?: string;
    name: string;
    description?: string;
    brand?: string;
    model?: string;
    price: string;
    color?: string;
    motorType?: string;
    power?: string;
    placeNumber?: string;
    status : CarStatus;
    type : string;
}
