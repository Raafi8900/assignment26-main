import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import EventCard from '../components/EventCard'
import { AppContext } from '../Context/AppContext'

const CategoryDetail = () => {
  const { id } = useParams() // id = category name
  const { events,loading } = useContext(AppContext)

  // Filter events by category name (case-insensitive)
  const categoryEvents = events.filter(event => {
    if (!event.category) return false;
  
    const categoryName = typeof event.category === 'object'
      ? event.category.name
      : event.category;
  
    return categoryName?.toLowerCase() === id.toLowerCase();
  });
  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-semibold mb-4">Loading events...</h1>
      </div>
    );
  }
  

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">{id} Events</h1>
      {categoryEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categoryEvents.map(event => (
            <EventCard
              key={event._id}
              id={event._id}
              title={event.name}
              date={event.date}
              location={event.location}
              image={event.image}
              price={event.price}
            />
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-600">No events found in this category.</p>
      )}
    </div>
  )
}

export default CategoryDetail
