/* eslint-disable no-unused-vars */
import React from "react";

const Footer = () => {
  const year = new Date().getUTCFullYear();
  return (
    <div className="text-xl text-center py-5 bg-teal-800 text-white mt-10">
      <p>
        © All Rights Reserved <strong >{year} || RSM Developer</strong>
      </p>
    </div>
  );
};

export default Footer;
