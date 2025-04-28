import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = "ostad-blush.vercel.app"

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState()
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [user, setUser] = useState(null)

    //Get all events
    const getAllevents = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(backendUrl + '/api/events/')
            if (data) {
                setEvents(data);
                setLoading(false)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to get events!");
            setLoading(false)
        }
    }

    const getUserData = async () => {
        try {
            const token = localStorage.getItem('token')
            setLoading(true)
            if (!token) return;
            const { data } = await axios.get(backendUrl + '/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if(data){
                setUser(data)
                setLoading(false)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to get user data!");
            setLoading(false)
        }
    }

    //logout
    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedin(false);
        setUser(null);
        toast.success("Logged out successfully!");
    }

    //Save/unsave event 
    const toggleSaveEvent = async (eventId) => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.post(backendUrl + `/api/events/${eventId}/save`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(res.data.saved ? "Event saved!" : "Event unsaved!");
            // Refresh events after saving/unsaving
            await getAllevents();
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to toggle save event!");
            throw error;
        }
    };

    //create event
    const createEvent = async (formData) => {
        try {
            setLoading(true)
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            const res = await axios.post(backendUrl + '/api/events/create', formData, config)
            toast.success("Event created successfully!");
            // Refresh events after creation
            await getAllevents();
            return res.data
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create event!");
            throw err;
        } finally {
            setLoading(false)
        }
    }

    //update event
    const updateEvent = async (eventId, formData) => {
        try {
            setLoading(true)
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            const res = await axios.patch(backendUrl + `/api/events/${eventId}`, formData, config)
            toast.success("Event updated successfully!");
            // Refresh events after update
            await getAllevents();
            return res.data
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update event!");
            throw err;
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllevents();
        getUserData();
    }, [])

    const value = {
        backendUrl,
        loading,
        setLoading,
        events,
        setEvents,
        isLoggedin,
        setIsLoggedin,
        user,
        getUserData,
        logout,
        toggleSaveEvent,
        createEvent,
        updateEvent
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}