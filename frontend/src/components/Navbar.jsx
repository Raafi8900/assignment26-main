import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { user, logout } = useContext(AppContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-green-600">
            Event Platform
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/events" className="text-gray-900 hover:text-green-600 font-medium">
              Events
            </Link>
            <Link to="/categories" className="text-gray-900 hover:text-green-600 font-medium">
              Categories
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-900 hover:text-green-600 font-medium">
                  Dashboard
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-green-500 text-sm font-semibold">Welcome, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/events"
                className="text-gray-900 hover:text-green-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                to="/categories"
                className="text-gray-900 hover:text-green-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-900 hover:text-green-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="flex flex-col space-y-2">
                    <span className="text-green-500 font-semibold">Welcome, {user.name}</span>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
