"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default  function SignUp() {
  const [signUpData, setSignUpData] = useState({
    fullname: '',
    email: '',
    image: null,
    password: '',
  });
  const router=useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setSignUpData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setSignUpData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  try {
    const formData = new FormData();
    formData.append('fullname', signUpData.fullname);
    formData.append('email', signUpData.email);
    formData.append('password', signUpData.password);
    if (signUpData.image) {
        formData.append('image', signUpData.image);
      }
      const response = await axios.post('/api/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
        if (response.status === 201) {
            toast.success(response.data.message||'User created successfully!');
            setSignUpData({
            fullname: '',
            email: '',
            image: null,
            password: '',
            });
            router.push('/login');

        } else {
            toast.error('Error creating user. Please try again.');
        }
    
  } catch (error) {
    toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
  }
  };

  return (
    <>
    <ToastContainer position='top-right'/>
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8" style={{ maxHeight: '600px' }}>
        <h2 className="text-2xl font-bold text-center text-black mb-8">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={signUpData.fullname}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={signUpData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-black hover:file:bg-gray-100"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={signUpData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="********"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 top-4 right-0 pr-3 flex items-center text-gray-600 hover:text-indigo-600"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                 <FaEyeSlash />
                ) : (
                  <FaEye />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full border bg-white hover:bg-gray-800 text-black font-semibold py-2 rounded-md transition-colors duration-300 hover:text-white"
          >
            Sign Up
          </button>
          <p>Already have an Account ?<Link href="/login"><span className="text-red-500">Sign in</span></Link></p>
        </form>
      </div>
    </div>
    </>
  );
}


