import express from 'express'
import Event from '../models/Event.js'
import auth from '../middleware/auth.js'
import User from '../models/User.js'
const router = express.Router()
    //create event
router.post('/create', auth, async(req, res) => {
        try {
            const { name, description, date, time, location, price, category, image } = req.body

            const newEvent = new Event({
                name,
                description,
                date,
                time,
                location,
                price,
                category,
                image,
                creator: req.user._id, // Assuming you track who created it
            })

            const savedEvent = await newEvent.save()

            res.status(201).json(savedEvent)
        } catch (error) {
            console.error('Error creating event:', error.message)
            res.status(500).json({ message: 'Server Error' })
        }
    })
    // Get all events
router.get('/', async(req, res) => {
    try {
        const events = await Event.find()
        res.json(events)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get event by ID
router.get('/:id', async(req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('category', 'name icon')
            .populate('creator', 'name')
        if (!event) {
            return res.status(404).json({ message: 'Event not found' })
        }
        res.json(event)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Create event (protected)
router.post('/', auth, async(req, res) => {
    try {
        const event = new Event({
            ...req.body,
            creator: req.user._id
        })
        await event.save()
        res.status(201).json(event)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Update event (protected)
router.patch('/:id', auth, async(req, res) => {
    try {
        const event = await Event.findOne({ _id: req.params.id, creator: req.user._id })
        if (!event) {
            return res.status(404).json({ message: 'Event not found' })
        }

        Object.assign(event, req.body)
        await event.save()
        res.json(event)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Delete event (protected)
router.delete('/:id', auth, async(req, res) => {
    try {
        const event = await Event.findOneAndDelete({ _id: req.params.id, creator: req.user._id })
        if (!event) {
            return res.status(404).json({ message: 'Event not found' })
        }
        res.json({ message: 'Event deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/:id/save', auth, async(req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // 👉 Fetch the full user document
        const user = await User.findById(req.user._id);

        const isSaved = event.savedBy.includes(user._id);
        if (isSaved) {
            event.savedBy = event.savedBy.filter(id => id.toString() !== user._id.toString());
            user.savedEvents = user.savedEvents.filter(id => id.toString() !== event._id.toString());
        } else {
            event.savedBy.push(user._id);
            user.savedEvents.push(event._id);
        }

        await Promise.all([event.save(), user.save()]);

        res.json({ saved: !isSaved });
    } catch (error) {
        console.error('Error toggling save:', error); // <-- Also good for debugging
        res.status(500).json({ message: error.message });
    }
});


export default router