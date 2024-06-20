import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background p-6 text-center text-black dark:text-white font-bold">
      <p>© {new Date().getFullYear()} Let&apos;s Assist</p>
    </footer>
  );
};

export default Footer;