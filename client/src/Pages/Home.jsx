import React, { useState, useEffect } from 'react';
import Navbar from '../Component/Navbar';
import Restaurant from '../Component/Restaurant';
import dotenv from 'dotenv';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('https://bookshop-api-er7t.onrender.com/api/items');
      const data = await response.json();
      setRestaurants(data);
      setFilteredRestaurants(data);
      setLoading(false);
    } catch (error) {
      console.error('Error ไม่สามารถดู item ได้:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === '') {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm) ||
        restaurant.type.toLowerCase().includes(searchTerm)
      );
      setFilteredRestaurants(filtered);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchRestaurants();
  };

  if (loading) {
    return (
      <div className='container mx-auto'>
        <Navbar />
        <div className="min-h-screen py-8 flex justify-center items-center">
          <div className="text-lg">Loading All Item <span className="loading loading-dots loading-xl"></span></div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto'>
      <Navbar />
      <div className='title justify-center items-center flex flex-col mt-10'>
        <h1 className='text-4xl font-bold mb-4'>Online Libery</h1>
      </div>
      <div className='flex justify-center items-center flex-col mt-10 mb-8'>
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="search" 
            placeholder="Search item..." 
            className="input input-bordered w-full pl-10 pr-4"
            onChange={handleSearch}
          />
        </div>
      </div>
      <Restaurant 
        restaurants={filteredRestaurants} 
        onRefresh={handleRefresh}
      />
    </div>
  );
};

export default Home;
