import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EventListings from './pages/EventListings';
import EventDetail from './pages/EventDetail';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CategoryListings from './pages/CategoryListings';
import CategoryDetail from './pages/CategoryDetail';
import ProtectedRoute from './components/ProtectedRoute';
import CreateEvent from './pages/CreateEvent';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventListings />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/categories" element={<CategoryListings />} />
          <Route path="/category/:id" element={<CategoryDetail />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
                <Dashboard />
            }
          />
          <Route
            path="/create-event"
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
