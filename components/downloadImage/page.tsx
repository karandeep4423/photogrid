import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";

type DownloadButtonProps = {
  img: string;
  imgName: string;
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ img, imgName }) => {
  const [loader, setLoader] = useState(false);
  const downloadImage = async () => {
    setLoader(true);
    try {
      const key = img.split(".com")[1]?.substring(1) || null;
      const response = await fetch(`/api/downloadImage?params=${key}`);
      const res = await response.json();
      const respo = await fetch(res);
      const blob = await respo.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${imgName + Math.floor(Date.now() / 1000)}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setLoader(false);
      toast.success("Your image has been successfully downloaded");
      console.log("resurl", res);
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.error("Interal server error");

    }
  };

  return (
    <div>
      <button
        onClick={downloadImage}
        className="w-full flex items-center justify-center gap-1 bg-sky-600 px-2 py-2 text-white font-medium leading-tight border-2 rounded-xl "
      >
        {loader ? (
          <TailSpin
            visible={true}
            height="24"
            width="24"
            color="white"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-2m-1-5-4 5-4-5m9 8h0"
            />
          </svg>
        )}
        Download
      </button>
    </div>
  );
};

export default DownloadButton;
