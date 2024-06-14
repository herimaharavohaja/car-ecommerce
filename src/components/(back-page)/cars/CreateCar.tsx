import { Create, SimpleForm, TextInput, NumberInput, SelectInput, required, ImageInput, ImageField, CreateProps } from 'react-admin';

const CarCreate: React.FC<CreateProps> = (props) => {
    return (
        <div className="flex justify-center items-center bg-gray-100">
            <Create {...props} className="w-full max-w-3xl bg-white shadow-lg rounded-lg px-8">
                <SimpleForm>
                    <div className='h-20 bg-slate-300 w-full'>
                        <div className="overflow-y-scroll max-h-60 mb-8">
                            <ImageInput source="images" label="Images" accept="image/*" multiple className="w-full flex">
                                <ImageField source="src" title="title" className="mb-4" />
                            </ImageInput>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 bg-white z-30">
                        <TextInput source="name" label="Name" validate={required()} className="mb-4" />
                        <TextInput source="description" label="Description" validate={required()} className="mb-4" />
                        <TextInput source="brand" label="Brand" validate={required()} className="mb-4" />
                        <TextInput source="model" label="Model" validate={required()} className="mb-4" />
                        <NumberInput source="price" label="Price" validate={required()} className="mb-4" />
                        <TextInput source="color" label="Color" validate={required()} className="mb-4" />
                        <TextInput source="motorType" label="Motor Type" validate={required()} className="mb-4" />
                        <TextInput source="power" label="Power" validate={required()} className="mb-4" />
                        <TextInput source="placeNumber" label="Place Number" validate={required()} className="mb-4" />
                        <SelectInput source="status" label="Status" choices={[
                            { id: "AVAILABLE", name: 'Available' },
                            { id: "SOLD", name: 'Sold' },
                            { id: "RESERVED", name: 'Reserved' },
                            { id: "PINNED", name: 'Pinned' }

                        ]} validate={required()} className="mb-4" />
                        <TextInput source="type" label="Type" validate={required()} className="mb-4" />
                    </div>
                </SimpleForm>
            </Create>
        </div>
    );
};

export default CarCreate;
