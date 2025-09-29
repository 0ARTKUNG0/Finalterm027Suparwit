import React from 'react'
import Card from './Card'

const Items = ({ items = [], onRefresh }) => {
  const handleDelete = (deletedId) => {
    if (onRefresh) {
      onRefresh();
    }
  };
  return (
    <div className="min-h-screen py-8">
      <div className='flex flex-wrap justify-center items-center gap-6 px-4'>
        {items.length > 0 ? (
          items.map((item) => (
            <Card 
              key={item.itemId || item.id}
              id={item.itemId || item.id}
              title={item.title}
              author={item.author}
              category={item.category}
              status={item.status}
              coverImage={item.coverImage}
              itemType={item.itemType}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <p>No items found</p>
            <p className="text-sm mt-2">Add some books or journals to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Items