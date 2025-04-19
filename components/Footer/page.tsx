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
              Discover a diverse array of wishful images at Photo Grid, where
              every sentiment is beautifully captured.Explore the art of
              heartfelt communication through images on Photo Grid.
            </p>
          </div>
          <div className="flex flex-col text-gray-300 font-medium space-y-4 pt-10">
            <h2 className="text-xl font-medium text-white">Italian Images</h2>
            <Link href="/immagini-buongiorno">Immagini Buongiorno</Link>
            <Link href="/immagini-buonanotte">Immagini Buonanotte</Link>
            <Link href="/buongiorno-amore-mio">Buongiorno amore mio</Link>
            <Link href="/buongiorno-nuovissimi">Buongiorno nuovissimi</Link>
            <Link href="/100-immagini-buongiorno-gratis-per-whatsapp">
              Buongiorno gratis
            </Link>
          </div>
          <div className="flex flex-col text-gray-300 font-medium space-y-4 pt-10">
            <h2 className="text-xl font-medium text-white">Polish Images</h2>
            <Link href="/kartki-na-dobranoc">kartki na dobranoc</Link>
            <Link href="/nowe-obrazki-na-dobranoc">
              Nowe obrazki na dobranoc
            </Link>
            <Link href="/spokojnej-nocy-kartki-na-dobranoc">
              Spokojnej nocy kartki na dobranoc
            </Link>
            <Link href="/superkartki-kartki-na-dobranoc">
              Superkartki kartki na dobranoc
            </Link>
            <Link href="/urocze-obrazki-na-dobranoc">
              Urocze obrazki na dobranoc{" "}
            </Link>
          </div>
          <div className="flex flex-col text-gray-300 font-medium space-y-4 pt-10">
            <h2 className="text-xl text-white font-medium">Contact us</h2>
            <p>Bachiwind, Amritsar</p>
            <a href="mailto:bachiwind3@gmail.com">photogriddorg@gmail.com</a>
          </div>
        </div>
        <p className="text-center text-gray-300 py-6">
          Copyright ©{new Date().getFullYear()} All rights reserved
        </p>
        <p className="text-center py-3 text-gray-300">
          Website developed by{" "}
          <a
            href="https://numispark.com"
            title="NumiSpark – agence communication création web & mobile, marketing digital & seo et design"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white underline"
            aria-label="Visit NumiSpark agence communication création web & mobile, marketing digital & seo et design"
          >
            NumiSpark
          </a>
        </p>{" "}
      </div>
    </div>
  );
};

export default Footer;
