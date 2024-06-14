import React from 'react';
import { Create, SimpleForm, TextInput, PasswordInput, required, CreateProps } from 'react-admin';

const UserCreate: React.FC<CreateProps> = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="email" validate={required()} label="Email" />
            <PasswordInput source="password" validate={required()} label="Password" />
            <TextInput source="name" label="Name" />
        </SimpleForm>
    </Create>
);

export default UserCreate;
