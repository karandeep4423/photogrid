"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import Link from "next/link";
import "aos/dist/aos.css";
import Image from "next/image";
export default function Home() {
  const [image, setImage] = useState<resultProps[]>([]);

  type resultProps = {
    image: string;
    imageName: string;
  };

  const fetchImage = async () => {
    try {
      const res = await fetch("/api/images", {
        method: "GET",
      });
      const result = await res.json();
      const uniqueImageNames = new Set();
      const uniqueImages = result.filter((img: resultProps) => {
        if (!uniqueImageNames.has(img.imageName)) {
          uniqueImageNames.add(img.imageName);
          return true;
        }
        return false;
      });

      setImage(uniqueImages);
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };

  console.log("image", image);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 1700,
      easing: "ease-in-out-back",
      delay: 100,
      once: true,
    });
    fetchImage();
  }, []);
  return (
    <div>
      <div className="relative max-w-screen-xl m-auto w-full h-fit sm:h-screen flex flex-col justify-center px-10 items-center  ">
        <div className="absolute sm:left-10 mix-blend-multiply w-11/12 h-96  top-28 bg-gradient-to-r from-blue-300 via-purple-300  to-yellow-200 filter blur-3xl transform translate-y-2 scale-y-75 skew-y-12 ">
          {" "}
        </div>
        <div>
          <h1 className="text-3xl sm:text-5xl text-gray-700 text-center font-bold">
            Learn <span className="text-sky-600">Punjabi language </span>and get
            <span className="text-pink-400"> Gurbani Classes of </span>
            with experienced tutors of{" "}
            <span className="text-cyan-500">Punjabi Lesson.</span>
          </h1>
          <p data-aos="fade-up" className="text-lg sm:text-xl mt-8">
            We are a team of qualified teachers with industry-proven years of
            experience. Book a class according to your availability to open new
            door of language.
          </p>
        </div>
        {/* <div>
          <img
            src="/italian.png"
            className="w-[2000px] h-[500px]"
            width={1000}
            height={1000}
            alt="learn punjabi language"
          ></img>
        </div> */}
      </div>
      <div className="  max-w-screen-xl m-auto">
        <div className="flex  items-center justify-center">
          <div data-aos="fade-up">
            <h2 className="text-gray-700 relative mt-12 text-center mx-3 text-5xl font-bold">
              Popular categories images
            </h2>
          </div>
          <div className="bg-sky-400 mt-12 absolute   mix-blend-multiply filter blur-2xl h-16 w-56 "></div>
        </div>
        <div className="text-lg mb-5 xl:text-xl grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-10 p-6 md:p-10">
          {image.map((img: resultProps, index: number) => {
            return (
              <div
                key={index}
                data-aos="fade-up"
                className="relative  w-full max-h-fit p-5 border-2 rounded-2xl bg-indigo-100 
                 shadow-[5px_5px_0px_4px_rgba(2,139,199,0.5),_-5px_-5px_0px_rgba(255,255,255,1)]"
              >
                <Link href={img.imageName}>
                  <Image
                    className="m-auto rounded-xl object-fill aspect-square w-full h-auto "
                    // src={`https://dnid0r1bm9raq.cloudfront.net/${
                    //   img?.image?.split(".com")[1]?.substring(1) || null
                    // }`}
                    src={img?.image}
                    height={600}
                    width={600}
                    alt=""
                  ></Image>
                </Link>
                <h3 className="text-center my-2 text-3xl font-medium">
                  <Link href={img.imageName}>
                    {img.imageName
                      .split("-")
                      .map(function (word) {
                        return word.charAt(0).toUpperCase() + word.slice(1);
                      })
                      .join(" ")}
                  </Link>{" "}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
