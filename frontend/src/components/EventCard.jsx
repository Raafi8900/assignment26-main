import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({ id, title, date, location, image, price }) => {
  return (
    <Link to={`/event/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {title}
          </h3>
          <div className="text-gray-600 space-y-1">
            <p className="flex items-center">
              <span className="mr-2">📅</span> {date}
            </p>
            <p className="flex items-center">
              <span className="mr-2">📍</span> {location}
            </p>
            <p className="flex items-center">
              <span className="mr-2">💰</span>${price}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default EventCard
