import Banner from '../components/Banner'
import EventCard from '../components/EventCard'
import CategoryCard from '../components/CategoryCard'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function Home() {
  const { events } = useContext(AppContext)
  const categoryIcons = {
    Music: '🎶',
    Sports: '🤾‍♀️',
    Arts: '🎉',
    Food: '🍔',
    Technology: '🖥️',
    Business: '💼',
    Education: '📚',
    Entertainment: '🕺',
  }

  // Convert events object to array
  const eventArray = Object.values(events)

  // Create a map to count events per category
  const categoryMap = {}

  eventArray.forEach(event => {
    const categoryName = event.category || 'Unknown'
    if (!categoryMap[categoryName]) {
      categoryMap[categoryName] = { count: 1 }
    } else {
      categoryMap[categoryName].count++
    }
  })

  // Create array of categories
  const categories = Object.entries(categoryMap).map(([name, data], index) => ({
    id: index + 1,
    name,
    icon: categoryIcons[name] || '📌',
    eventCount: data.count
  }))

  return (
    <div>
   <Banner
  title="Entertaiment Events"
  subtitle="Find and book tickets for the best events in your area"
  backgroundImage="https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGV2ZW50fGVufDB8fDB8fHww"
/>


      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eventArray
              .slice()
              .sort((a, b) => new Date(a.date) - new Date(b.date)) // sort by earliest date
              .slice(0, 3)
              .map(event => (
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
        </div>
      </section>
    </div>
  )
}