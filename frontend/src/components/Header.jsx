import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-purple-600">
            EventHub
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600">Home</Link>
            <Link to="/events" className="text-gray-700 hover:text-purple-600">Events</Link>
            <Link to="/login" className="text-gray-700 hover:text-purple-600">Login</Link>
            <Link to="/register" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
