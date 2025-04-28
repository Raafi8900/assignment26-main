import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const EventDetail = () => {
  const { id } = useParams()
  const { events, user, loading, toggleSaveEvent, backendUrl } = useContext(AppContext)
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)

  useEffect(() => {
    const foundEvent = events.find(e => e._id === id)
    if (foundEvent) {
      setEvent(foundEvent)
    }
  }, [events, id])

  const handleSaveEvent = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    try {
      const result = await toggleSaveEvent(id)
      if (result.saved) {
        toast.success("Event saved successfully!");
      } else {
        toast.success("Event unsaved successfully!");
      }
    } catch (err) {
      toast.error("Failed to save/unsave event!");
      console.error('Failed to save event:', err)
    }
  }

  const handleDeleteEvent = async () => {
    if (!window.confirm('Are you sure you want to remove this event from your saved events?')) {
      return
    }

    try {
      await handleSaveEvent() // This will unsave the event
      navigate('/dashboard')
    } catch (err) {
      toast.error("Failed to remove event!");
      console.error('Failed to remove event:', err)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!event) {
    return <div>Event not found</div>
  }

  const isEventSaved = user && event.savedBy?.includes(user._id)
  const isEventCreator = user && event.creator === user._id
  const canDeleteEvent = isEventCreator || isEventSaved

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={event.image} alt={event.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
          <p className="text-gray-600 mb-6">{event.description}</p>

          <div className="flex justify-between items-center">
            <span className="text-2xl font-semibold text-indigo-600">${event.price}</span>
            <div className="space-x-4">
              {user && (
                <>
                  {canDeleteEvent ? (
                    <button
                      onClick={handleDeleteEvent}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Remove from Saved
                    </button>
                  ) : (
                    <button
                      onClick={handleSaveEvent}
                      className={`bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 ${
                        isEventSaved ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={isEventSaved}
                    >
                      {isEventSaved ? 'Saved' : 'Save Event'}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail 