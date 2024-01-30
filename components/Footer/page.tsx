import React from "react";
import Link from "next/link";
const Footer = () => {
  return (
    <div>
      <div className="bg-black text-lg xl:text-xl   rounded-t-3xl  ">
        <div className="-mt-4 max-w-screen-xl m-auto flex flex-wrap space-x-5 px-5 justify-evenly">
          <div className="flex flex-col space-y-4 pt-10 w-64">
            <h2 className="text-white font-medium text-xl border-4 border-white w-fit px-1">
              {" "}
              Photo Grid
            </h2>
            <p className="text-gray-300 font-medium">
            We are a team of qualified teachers with industry-proven years of
            experience. Book a class according to your availability to open new
            door of language.
            </p>
          </div>
          <div className="flex flex-col text-gray-300 font-medium space-y-4 pt-10">
            <h2 className="text-xl font-medium text-white">Navigation</h2>
            <Link href="/">Home</Link>
            <Link href="/choose-your-lesson">Book Lesson</Link>
            <Link href="/gurbani-in-english">Gurbani Lesson</Link>
            <Link href="/about-us">About us</Link>
            <Link href="/contact-us">Contact us</Link>
          </div>
          <div className="flex flex-col text-gray-300 font-medium space-y-4 pt-10">
            <h2 className="text-xl font-medium text-white">Services</h2>
            <Link href="/choose-your-lesson#book-lesson">Book a Lesson</Link>
            <Link href="/choose-your-lesson#group-class">Group Class</Link>
            <Link href="/choose-your-lesson#buy-hours">Buy Hours Pack</Link>
            <Link href="/choose-your-lesson#subscription">Get Subscription</Link>
          </div>
          <div className="flex flex-col text-gray-300 font-medium space-y-4 pt-10">
            <h2 className="text-xl text-white font-medium">Contact us</h2>
            <p>Bachiwind, Amritsar</p>
            <a href="mailto:bachiwind3@gmail.com">bachiwind3@gmail.com</a>
            <a href="tel:+918727989814">+918727989814</a>
          </div>
        </div>
        <p className="text-center text-gray-300 py-6">
          Copyright ©2023 All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
