import React from 'react';

import { Show, SimpleShowLayout, TextField, ShowProps } from 'react-admin';
const UserShow: React.FC<ShowProps> = (props) => {
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="email" />
                <TextField source="name" />
            </SimpleShowLayout>
        </Show>
    );
};

export default UserShow;
