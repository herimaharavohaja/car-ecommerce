import React from 'react';
import { Edit, SimpleForm, TextInput, EditProps } from 'react-admin';

const UserEdit: React.FC<EditProps> = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <TextInput source="email" />
                <TextInput source="password" type="password" />
                <TextInput source="name" />
            </SimpleForm>
        </Edit>
    );
};

export default UserEdit;
