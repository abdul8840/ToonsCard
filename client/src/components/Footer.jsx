import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaDiscord,
  FaInstagram,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer container className="border border-t-8 py-10 border-teal-500">
      <div className="w-full max-w-3xl mx-auto text-center">
        <h2 className="my-10 text-xl sm:text-4xl font-bold">
        <Link
        to="/"
        className="self-center whitespace-nowrap dark:text-white"
      >
        <span className="text-slate-500 text-3xl font-bold">
          Toons
        </span>
        <span className='text-4xl'>Card</span>
      </Link>
        </h2>

        <div className="flex justify-center font-semibold text-xl mb-5 gap-5">
          <Link to="/" className="border-2 border-slate-600 py-1 px-4 rounded-md">
            <span>Home</span>
          </Link>
          <Link to="/all-cards" className="border-2 border-slate-600 py-1 px-4 rounded-md">
            <span>All Cards</span>
          </Link>
          <Link to="/sign-up" className="border-2 border-slate-600 py-1 px-4 rounded-md">
            <span>Sign Up</span>
          </Link>
        </div>

        <div className="flex justify-center flex-col text-sm font-semibold mb-10 gap-1">
          <p>Copyright &copy; ToonsCard. All rights reserved.</p>
          <p>Created By Abdul Rahman Naseer</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;