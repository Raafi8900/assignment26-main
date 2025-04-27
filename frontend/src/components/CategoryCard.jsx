import React from 'react'
import { Link } from 'react-router-dom'

const CategoryCard = ({ id, name, icon, eventCount }) => {
  return (
    <Link to={`/category/${encodeURIComponent(name)}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
        <div className="flex flex-col items-center">
          <div className="text-4xl mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {name}
          </h3>
          <p className="text-gray-600">
            {eventCount} Events
          </p>
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard
