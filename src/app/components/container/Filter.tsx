import React, { useState } from 'react';

interface Car {
  id: string;
  carBrand: string;
  motorType: string;
  placeNumber: string;
  categoryName: string;
  price: number;
  color: string;
}

const SearchCars: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    carBrand: '',
    motorType: '',
    placeNumber: '',
    category: '',
    price: '',
    color: ''
  });

  const [searchResults, setSearchResults] = useState<Car[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const queryParams = new URLSearchParams(searchParams as any).toString();
      const response = await fetch(`http://localhost:3001/search-cars?${queryParams}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching cars:', error);
    }
  };

  return (
    <div className='flex flex-col justify-between '>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Select:
            <select name="carBrand" value={searchParams.carBrand} onChange={handleChange}>
              <option value="">CarBrand</option>
              <option value="Ford">Ford</option>
              <option value="Ferrari">Ferrari</option>
              <option value="Lomborghini">Lomborghini</option>
              <option value="Mercedes">Mercedes</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Select:
            <select name="motorType" value={searchParams.motorType} onChange={handleChange}>
              <option value="">MotorType</option>
              <option value="Electric">Electric</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Select:
            <select name="color" value={searchParams.color} onChange={handleChange}>
              <option value="">Color</option>
              <option value="white">white</option>
              <option value="black">black</option>
              <option value="blue">blue</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Select:
            <select name="placeNumber" value={searchParams.placeNumber} onChange={handleChange}>
              <option value="">Place</option>
              <option value="5">5</option>
              <option value="2">2</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Select:
            <select name="price" value={searchParams.price} onChange={handleChange}>
              <option value="">Price</option>
              <option value="20000-50000">20000</option>
              <option value="50000-150000">50000</option>
            </select>
          </label>
        </div>
        <button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg'>Search</button>
      </form>

      <div>
        {searchResults.map(car => (
          <div key={car.id}>
            <p>Car Brand: {car.carBrand}</p>
            <p>Motor Type: {car.motorType}</p>
            <p>Place Number: {car.placeNumber}</p>
            <p>Category: {car.categoryName}</p>
            <p>Price: {car.price}</p>
            <p>Color: {car.color}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchCars;
