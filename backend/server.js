import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import eventRoutes from './routes/events.js'
import categoryRoutes from './routes/categories.js'
import connectDB from './config/mongodb.js'

// Load environment variables
dotenv.config()
const app = express()
const allowedOrigins = [
        'http://localhost:5173',
        'https://event-management-three-chi.vercel.app'
    ]
    // Middleware
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Routes
app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/categories', categoryRoutes)

// Connect to MongoDB
connectDB()

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err)
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Something went wrong!',
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})