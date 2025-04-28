import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-teal-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Eventify</h3>
            <p className="text-sm text-indigo-100">
              Discover events, meet people, and live amazing experiences with Eventify.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-yellow-300">Home</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-yellow-300">All Events</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-yellow-300">Categories</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-yellow-300">About Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Connect</h4>
            <ul className="space-y-3 text-indigo-100">
              <li>Email: hello@eventify.com</li>
              <li>Phone: +1 (800) 987-6543</li>
              <li>Location: 456 Unity Plaza, Metropolis</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-indigo-400 pt-6 text-center text-sm text-indigo-100">
          <p>© 2025 Eventify. Crafted with ❤️ for event lovers worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
