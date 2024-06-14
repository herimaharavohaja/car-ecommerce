import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    DateField,
    ReferenceField,
    ListProps,
    DeleteButton,
    EditButton,
    Pagination
} from 'react-admin';

const AppointmentList: React.FC<ListProps> = (props) => {
    return (
        <List {...props} perPage={10} pagination={<Pagination />}>
            <Datagrid rowClick="show">
                <TextField source="car.name" label="Car name" />
                <TextField source="name" label="Name" />
                <TextField source="firstName" label="First Name" />
                <TextField source="email" />
                <TextField source="contact" />
                <DateField source="appointmentDate" />
                <TextField source="status" />
                <EditButton label="Edit" />
                <DeleteButton label="Delete" />
            </Datagrid>
        </List>
    );
};

export default AppointmentList;

