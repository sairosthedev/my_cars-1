import React from 'react';

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About AutoTrack</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-4">
          AutoTrack is your comprehensive vehicle management solution, designed to help car enthusiasts and owners keep track of their automotive investments.
        </p>
        <p className="text-gray-600 mb-4">
          Our platform provides powerful tools for:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Managing your vehicle inventory</li>
          <li>Tracking maintenance schedules</li>
          <li>Monitoring vehicle performance</li>
          <li>Recording service history</li>
        </ul>
        <p className="text-gray-600">
          Whether you're a collector, dealer, or simply passionate about cars, AutoTrack helps you stay organized and informed about your vehicles.
        </p>
      </div>
    </div>
  );
}

export default About; 