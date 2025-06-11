import React from "react";
import { FaClock, FaMapMarkerAlt, FaPhone, FaCheck } from "react-icons/fa";
import "./MoreInfo.css";

const MoreInfo = () => (
  <div className="more-info-page">
    <img src="/images/Library.avif" alt="Library Background" className="more-info-bg" />
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Library Information</h1>
          <p className="text-lg text-gray-600">Everything you need to know about our services</p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Library Hours */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <FaClock className="text-blue-600 text-3xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Library Hours</h3>
            <ul className="space-y-1 text-gray-600">
              <li>Mon - Fri: 8:00 AM - 8:00 PM</li>
              <li>Saturday: 9:00 AM - 6:00 PM</li>
              <li>Sunday: 10:00 AM - 4:00 PM</li>
              <li className="text-blue-600 font-medium">Digital Access: 24/7</li>
            </ul>
          </div>

          {/* Location */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <FaMapMarkerAlt className="text-green-600 text-3xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Location</h3>
            <ul className="space-y-1 text-gray-600">
              <li>Cdac Kharghar</li>
              <li>Mumbai</li>
              <li>Maharashtra, 410407</li>
              <li className="text-green-600 font-medium">Free Parking Available</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <FaPhone className="text-purple-600 text-3xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact</h3>
            <ul className="space-y-1 text-gray-600">
              <li>Phone: 1234567891</li>
              <li>Email: info@libraryhub.com</li>
              <li>Support: help@libraryhub.com</li>
              <li className="text-purple-600 font-medium">24/7 Online Support</li>
            </ul>
          </div>
        </div>

        {/* Membership Benefits */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Membership Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Membership */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">User Membership</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><FaCheck /> Borrow up to 5 books simultaneously</li>
                <li className="flex items-center gap-3"><FaCheck /> 30-day borrowing period</li>
                <li className="flex items-center gap-3"><FaCheck /> Free digital access</li>
                <li className="flex items-center gap-3"><FaCheck /> Study room reservations</li>
              </ul>
            </div>

            {/* Faculty Membership */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Faculty Membership</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><FaCheck /> Borrow up to 10 books simultaneously</li>
                <li className="flex items-center gap-3"><FaCheck /> 60-day borrowing period</li>
                <li className="flex items-center gap-3"><FaCheck /> Priority access to new releases</li>
                <li className="flex items-center gap-3"><FaCheck /> Research assistance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MoreInfo;
