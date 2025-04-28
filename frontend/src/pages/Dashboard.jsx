import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import EditEventModal from '../components/EditEventModal'
import { toast } from 'react-toastify'
import axios from 'axios'

const Dashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('my-events')
  const { user, events, loading, backendUrl } = useContext(AppContext)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const myEvents = events.filter(event => event.creator === user?._id)
  const savedEvents = events.filter(event => event.savedBy?.includes(user?._id))

  const handleEditClick = (event) => {
    setSelectedEvent(event)
    setIsEditModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsEditModalOpen(false)
    setSelectedEvent(null)
  }

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${backendUrl}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success("Event deleted successfully!");
      // Refresh the page to update the events list
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete event!");
      console.error('Failed to delete event:', err)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'my-events'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('my-events')}
            >
              My Events
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'saved-events'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('saved-events')}
            >
              Saved Events
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'my-events' ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">My Events</h2>
                <button
                  onClick={() => navigate('/create-event')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Create New Event
                </button>
              </div>

              {myEvents.length === 0 ? (
                <p className="text-gray-500">You haven't created any events yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myEvents.map((event) => (
                    <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{event.name}</h3>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-indigo-600 font-semibold">${event.price}</span>
                          <div className="space-x-2">
                            <button
                              onClick={() => handleEditClick(event)}
                              className="text-indigo-600 hover:text-indigo-800"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(event._id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-6">Saved Events</h2>
              {savedEvents.length === 0 ? (
                <p className="text-gray-500">You haven't saved any events yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedEvents.map((event) => (
                    <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{event.name}</h3>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-indigo-600 font-semibold">${event.price}</span>
                          <button
                            onClick={() => navigate(`/event/${event._id}`)}
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {selectedEvent && (
        <EditEventModal
          event={selectedEvent}
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default Dashboard 