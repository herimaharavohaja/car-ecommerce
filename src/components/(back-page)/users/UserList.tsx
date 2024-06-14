import * as React from 'react';
import { List, Datagrid, TextField, EmailField, ListProps, EditButton, DeleteButton } from 'react-admin';

const UserList: React.FC<ListProps> = (props) => (
    <List {...props} perPage={10} >
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <EditButton label="Edit" />
            <DeleteButton label="Delete" />
        </Datagrid>
    </List>
);

export default UserList;
