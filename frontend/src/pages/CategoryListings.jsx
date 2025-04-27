import React from 'react'
import CategoryCard from '../components/CategoryCard'
import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'

const categoryIcons = {
  Music: '🎵',
  Sports: '⚽',
  Arts: '🎨',
  Food: '🍽️',
  Technology: '💻',
  Business: '💼',
  Education: '📚',
  Entertainment: '🎭',
}

const CategoryListings = () => {
  const { events } = useContext(AppContext)
  // Convert events object to array
  const eventArray = Object.values(events)

  // Create a map to count events per category (case-insensitive)
  const categoryMap = {}

  eventArray.forEach(event => {
    const categoryName = event.category ? event.category.toLowerCase() : 'unknown'
    if (!categoryMap[categoryName]) {
      categoryMap[categoryName] = { count: 1 }
    } else {
      categoryMap[categoryName].count++
    }
  })

  // Create array of categories with proper case from the first occurrence
  const categories = Object.entries(categoryMap).map(([name, data], index) => {
    // Find the first event with this category to get the proper case
    const firstEvent = eventArray.find(event => 
      event.category && event.category.toLowerCase() === name
    )
    const properCaseName = firstEvent ? firstEvent.category : name.charAt(0).toUpperCase() + name.slice(1)
    
    return {
      id: index + 1,
      name: properCaseName,
      icon: categoryIcons[properCaseName] || '📌',
      eventCount: data.count
    }
  })

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">All Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            icon={category.icon}
            eventCount={category.eventCount}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoryListings 