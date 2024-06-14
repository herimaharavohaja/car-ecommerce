import React from 'react';
import { Show, SimpleShowLayout, ImageField, TextField, RichTextField, useRedirect } from 'react-admin';

const CarShow = () => {
    const redirect = useRedirect();
    return (
        <Show title='Car Details'>
            <SimpleShowLayout>
                <div className="flex flex-col gap-5">
                    <div className='flex flex-row flex-wrap items-center justify-between '>
                        <ImageField source="images[0].url" label="Image" className='object-cover w-full' />
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <div className="mb-4 flex space-x-10 font-semibold text-2xl">
                            <TextField source="name" style={{ fontSize: 19 }} className="text-2xl font-bold mb-2 text-gray-800 sm:text-2xl" />
                            <TextField source="brand" style={{ fontSize: 19 }} className="text-gray-600" />
                        </div>

                        <div className="mb-4 flex space-x-10 font-semibold text-2xl">
                            <TextField source="model" className="text-gray-600" />
                            <TextField source="price" className="text-gray-600 ml-4" />
                        </div>

                        <ul className="mb-4 flex space-x-10 font-semibold text-2xl">
                            <li className="text-gray-600"><TextField source="color" /></li>
                            <li className="text-gray-600"><TextField source="motorType" /></li>
                        </ul>

                        <ul className="mb-4 flex space-x-10 font-semibold text-2xl">
                            <li className="text-gray-600"><TextField source="power" /></li>
                            <li className="text-gray-600"><TextField source="placeNumber" /></li>
                            <li className="text-gray-600"><TextField source="status" /></li>
                            <li className="text-gray-600"><TextField source="type" /></li>
                        </ul>
                        <div className="mb-4 flex space-x-10 font-semibold text-3xl">
                            <RichTextField source="description" className="text-gray-700 mb-4" />
                        </div>
                        <div className="flex flex-row flex-wrap justify-between items-center">
                            <button onClick={() => { redirect('list', 'appointments') }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                                Appointment
                            </button>
                            <button onClick={() => { redirect('list', 'cars') }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                                Show More
                            </button>
                        </div>
                    </div>
                </div>
            </SimpleShowLayout>
        </Show>
    );
};

export default CarShow;
