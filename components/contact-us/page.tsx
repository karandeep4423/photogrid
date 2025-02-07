"use client";
import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 1700,
      easing: "ease-in-out-back",
      delay: 100,
      once: true,
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name && phone && message) {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: name,
          phone: phone,
          message: message,
        }),
      });
      const result = await res.json();
      if (result.err) {
        toast.error("Server error, Try again");
        return;
      }
      setEmail("");
      setName("");
      setPhone("");
      setMessage("");
      toast.success("Your message has been sent successfully");
    }
  };

  return (
    <div>
      <div className="m-auto max-w-screen-xl">
        <div className="flex items-center justify-center">
          <h1 className="text-gray-700 relative text-center mt-14 text-5xl font-bold">
            Send enquiry
          </h1>
          <div className="bg-sky-400 z-20 mt-12 absolute   mix-blend-multiply filter blur-2xl h-16 w-56 "></div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="h-fit   shadow-[5px_5px_0px_4px_rgba(2,139,199,0.5),_-5px_-5px_0px_rgba(255,255,255,1)] min-w-fit mt-8 rounded-3xl mx-4  sm:mx-32 md:40 lg:mx-56 p-3  md:p-10 mb-16 border-2 border-gray-200"
        >
          <div data-aos="fade-up" className="flex pt-3  gap-2">
            <Player
              autoplay
              loop
              src="https://assets9.lottiefiles.com/packages/lf20_u25cckyh.json"
              style={{
                height: "70px",
                width: "70px",
                borderRadius: "50%",
                marginTop: "-12px",
              }}
            ></Player>
            <div className="relative  z-0 w-full mb-6 group">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="floating_email"
                className="block background-transparent overflow-hidden py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
              <label
                htmlFor="floating_email"
                className=" peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
          </div>
          <div data-aos="fade-up" className="flex gap-2">
            <Player
              autoplay
              loop
              src="https://assets2.lottiefiles.com/packages/lf20_Fuxw3k.json"
              style={{
                height: "70px",
                width: "70px",
                marginTop: "-12px",
                borderRadius: "50%",
              }}
            ></Player>
            <div className="relative z-0 w-full mb-6 group">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="floating_first_name"
                className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
              </label>
            </div>
          </div>
          <div data-aos="fade-up" className="flex gap-2">
            <Player
              autoplay
              loop
              src="https://assets3.lottiefiles.com/private_files/lf30_1ezswqfp.json"
              style={{
                height: "70px",
                marginTop: "-12px",
                width: "70px",
                borderRadius: "50%",
              }}
            ></Player>
            <div className="relative z-0 w-full mb-6 group">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                name="telephone"
                className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-sky-600 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number
              </label>
            </div>
          </div>
          <div data-aos="fade-up" className="w-full pl-0 sm:pl-[80px] ">
            <textarea
              required
              placeholder="Write us message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className=" shadow-[5px_5px_0px_4px_rgba(2,139,199,0.5),_-5px_-5px_0px_rgba(255,255,255,1)] rounded-xl w-full outline-sky-600 hover:outline-offset-2 h-32 p-2  text-xl border-2 "
            ></textarea>
          </div>
          <div data-aos="fade-up" className="flex  pt-10 justify-center">
            <button className="text-lg font-medium w-3/4  py-2 rounded-xl text-center overflow-hidden group bg-sky-500 relative hover:bg-gradient-to-r hover:from-sky-500 hover:to-sky-500 text-white hover:ring-2 hover:ring-offset-2 hover:ring-sky-400 transition-all ease-out duration-300">
              <span className="absolute right-0 w-8 h-28 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;

