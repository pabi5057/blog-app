"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
const [blogs, setBlogs] = useState([]);
const [emails,setEmails]=useState([]);
const [users,setUsers]=useState();
  const stats = [
    { id: 1, title: 'Subscriptions', value: emails.length, icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10h-6a4 4 0 0 0-8 0H3"></path>
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 16v6"></path>
        <path d="M8 20h8"></path>
      </svg>
    ) },
    { id: 2, title: 'Total Blogs', value: blogs.length, icon: (
      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"></path>
        <polyline points="12 11 12 17 15 14 18 17 21 14"></polyline>
      </svg>
    ) },
    { id: 3, title: 'Visitors', value: 5421, icon: (
      <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M2 12a10 10 0 0 1 20 0 10 10 0 0 1-20 0z"></path>
      </svg>
    ) },
    { id: 4, title: 'Active Users', value: users.length, icon: (
      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
        <path d="M2 12a10 10 0 0 1 20 0v1"></path>
      </svg>
    ) },
  ];

  const fetchBlogs = async () => {
    const response = await axios.get('/api/blog');
    setBlogs(response.data.blogs);
    console.log("blogs data is", response.data.blogs);
}


const fetchEmails=async()=>{
    const response=await axios.get('/api/email');
    setEmails(response.data.emails);
}

const fetchUsers=async()=>{
  const response =await axios.get('/api/signup');
  setUsers(response.data.users);
}

useEffect(() => {
    fetchEmails();
    fetchUsers()
}, []);

    useEffect(() => {
        fetchBlogs();
    }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Dashboard</h1>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ id, title, value, icon }) => (
          <div key={id} className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex-shrink-0">
              {icon}
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
              <p className="text-sm uppercase tracking-wide font-medium text-gray-500">{title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 text-gray-700">
        <h2 className="text-xl font-semibold mb-4">Insights</h2>
        <p>
          Monitor your dashboard regularly to get insights about your content performance.
          Engage your subscribers and visitors with fresh blogs and keep track of user activity.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

