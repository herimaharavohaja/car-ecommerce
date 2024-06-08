'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Car } from '@/app/type/type';
import { getData } from '@/app/service/fetchData';

interface ItemProps {
  currentPage: number;
  carsPerPage: number;
}

const Item: React.FC<ItemProps> = ({ currentPage, carsPerPage }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await getData('http://localhost:3001/cars');
        setCars(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    }

    fetchCars();
  }, []);


  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  return (
    <div className="relative mt-10">
      {loading ? ( 
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-20 cursor-pointer md:gap-20'>
          {currentCars.map((car) => (
            <div key={car.id} className="relative duration-300 transform hover:scale-105 ">
              <Link href={`/car/${car.id}`} passHref>
                <div className='relative rounded-lg'>
                  <Image
                    src={car.image}
                    alt={car.description}
                    width={500}
                    height={300}
                    className='object-cover rounded-lg transition-transform'
                  />
                  <p>{car.description}</p>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='px-2 font-medium bg-gray-100 rounded-lg'>
                    ${car.price.toFixed(2)}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Item;
