import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-4 z-100">
      <p className="text-sm">
        © {new Date().getFullYear()} Farmer Government Aided Schemes. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
