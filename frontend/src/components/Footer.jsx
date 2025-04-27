import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Event Platform</h3>
            <p className="text-gray-400">
              Discover and book tickets for the best events in your area.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white">
                  Categories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@eventplatform.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Event Street, City, Country</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Event Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
