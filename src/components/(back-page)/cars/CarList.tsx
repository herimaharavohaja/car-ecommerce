import * as React from 'react';
import {
    List,
    Datagrid,
    TextField,
    ListProps,
    Pagination,
    ImageField,
    EditButton,
    DeleteButton,
} from 'react-admin';

const CustomDatagrid: React.FC<any> = (props) => (
    <Datagrid
        {...props}
        rowClick="show"
        classes={{
            root: 'bg-white shadow-md rounded-lg mx-4 my-2 p-4 sm:flex sm:flex-row sm:space-x-4',
            headerRow: 'bg-gray-100 border-b border-gray-200',
            rowEven: 'border-b border-gray-200',
            rowOdd: 'border-b border-gray-200',
        }}
    />
);

const CartList: React.FC<ListProps> = (props) => (
    <div className="overflow-x-auto">
        <List {...props} perPage={10} pagination={<Pagination />}>
            <CustomDatagrid>
                <TextField source="name" label="Name" />
                <TextField source="brand" label="Brand" />
                <TextField source="model" label="Model" />
                <TextField source="price" label="Price" />
                <TextField source="status" label="Status" />
                <TextField source="type" label="Type" />
                <TextField source="color" label="Color" />
                <TextField source="motorType" label="Motor type" />
                <ImageField source="images[0].url" label="Image" />
                <EditButton label="Edit" />
            <DeleteButton label="Delete" />
            </CustomDatagrid>
        </List>
    </div>
);

export default CartList;
