'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Filter from './Filter';
import Item from './Item';
import Pagination from '../Pagination';
import { getData } from '@/app/service/fetchData';
import { Car } from '@/app/type/type';
import Footer from '../footer/Footer';


const Container: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(6);
  const [totalCars, setTotalCars] = useState(0);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchTotalCars = async () => {
      try {
        const response: Car[] = await getData('http://localhost:3001/cars');
        setTotalCars(response.length);
      } catch (error) {
        console.error('Error fetching total car count:', error);
      }
    };

    fetchTotalCars();
  }, []);

  const totalPages = Math.ceil(totalCars / carsPerPage);

  return (
    <>
      <div>
      <div className='mb-[200px]'>
        <Link href='/filters' className='opacity-60'>
          <div className=''>
            <Filter/>
          </div>
        </Link>
        <div>
          <Item currentPage={currentPage} carsPerPage={carsPerPage} />
        </div>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
    <Footer />
    </>
      );
};

export default Container;
