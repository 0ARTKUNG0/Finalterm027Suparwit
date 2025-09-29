import React from 'react'
import Card from './Card'

const Restaurant = ({ restaurants = [], onRefresh }) => {
  const handleDelete = (deletedId) => {
    if (onRefresh) {
      onRefresh();
    }
  };
  return (
    <div className="min-h-screen py-8">
      <div className='flex flex-wrap justify-center items-center gap-6 px-4'>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <Card 
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              type={restaurant.type}
              imageURL={restaurant.imageURL}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <p>No restaurants found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Restaurant