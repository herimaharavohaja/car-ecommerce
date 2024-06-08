'use client';
import { Fragment, useEffect, useState } from 'react';
import { Car } from '@/app/type/type';
import { getData } from '@/app/service/fetchData';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Footer from '@/app/components/footer/Footer';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Modal from '@/app/components/Modal';

const CarDetails: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const carId = Array.isArray(id) ? id[0] : id;
      fetchCarDetails(carId);
    }
  }, [id]);

  async function fetchCarDetails(carId: string) {
    try {
      const response = await getData(`http://localhost:3001/cars/${carId}`);
      setCar(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching car details:', error);
    }
  }

  const handleClick = () => {
    if (car && car.id) {
      setShowModal(true);
    }
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <Fragment>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-5 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt={car.description}
              className="lg:w-1/2 w-full lg:h-auto h-64 max-h-[600px] object-contain rounded"
              src={car.image}
              width={800}
              height={500}
              onClick={handleClick}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                voiture de rêve
              </h1>
              <div className="flex mb-4">
                <span className="text-gray-600 ml-3">
                  <h1>Categories</h1>
                  <p className="text-md ">{car.categoryName} Car</p>
                </span>
                <span className="flex items-center gap-2 ml-3 px-2 py-2 border-l-2 border-gray-200 space-x-2s">
                  <FaMapMarkerAlt />
                  Localisation Marseil, France
                </span>
              </div>
              <p className="leading-relaxed">{car.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-6">Color: {car.color}</span>
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">
                    Nombre de place: {car.placeNumber}
                  </span>
                  <div>
                    <div className=" border-gray-300 py-2 text-base pl-3 pr-10">
                      Type de voiture: {car.motorType}
                    </div>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      ></svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="title-font font-medium text-2xl text-gray-900">
                  $ {car.price.toFixed(2)}
                </span>
                <div className="flex">
                  <button className="flex ml-auto text-white bg-indigo-500 py-2 px-6 
                  focus:outline-none hover:bg-indigo-600 rounded mr-8 " onClick={() => setShowModal(true)}>
                    Reservation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
      <div className='mt-[15px]'>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)} carId={car.id} />
      </div>
    </Fragment>
  );
};

export default CarDetails;
