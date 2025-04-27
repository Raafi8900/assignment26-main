import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const auth = async(req, res, next) => {
    try {
        const authHeader = req.header('Authorization')
        if (!authHeader) {
            return res.status(401).json({ message: 'No authentication token, access denied' })
        }

        const token = authHeader.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)

        if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }

        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' })
    }
}

export default auth