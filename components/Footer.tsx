import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-6 text-center text-white">
      <p>© {new Date().getFullYear()} Your Company Name</p>
    </footer>
  );
};

export default Footer;