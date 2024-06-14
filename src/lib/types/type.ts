import { RaRecord } from "react-admin";

export type User = {
    id?: string;
    email: string;
    password: string;
    name?: string;
} & RaRecord;