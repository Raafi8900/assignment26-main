import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);
  const [state, setState] = useState("Login");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, { name, email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setIsLoggedin(true);
          getUserData();
          toast.success("Registration successful! Welcome aboard!");
          navigate('/');
        } else {
          toast.error(data.message || "Registration failed!");
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setIsLoggedin(true);
          getUserData();
          toast.success("Login successful! Welcome back!");
          navigate('/');
        } else {
          toast.error(data.message || "Login failed!");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === 'Sign Up' ? "Create Account" : "Login to your account!"}
        </h2>
        <p className="text-center mb-6 text-sm">
          {state === 'Sign Up' ? "Create your account." : "Login to your account!"}
        </p>
        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="Person Icon" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none w-full"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="Mail Icon" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none w-full"
              type="email"
              placeholder="Email id"
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="Lock Icon" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none w-full"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <p onClick={() => navigate('/reset-pass')} className="mb-4 text-indigo-600 cursor-pointer">
            Forgot Password?
          </p>
          <button type="submit" className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            {state}
          </button>
          {state === 'Sign Up' ? (
            <p className="text-gray-400 text-center text-xs mt-4">
              Already have an account?{" "}
              <span className="text-blue-400 cursor-pointer underline" onClick={() => setState("Login")}>
                Login here
              </span>
            </p>
          ) : (
            <p className="text-gray-400 text-center text-xs mt-4">
              Don't have an account?{" "}
              <span className="text-blue-400 cursor-pointer underline" onClick={() => setState("Sign Up")}>
                Sign up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;