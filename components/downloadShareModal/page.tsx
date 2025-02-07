"use client";
import { ShareButton } from "@/components/shareButton/page";
import DownloadButton from "@/components/downloadImage/page";
import { useState } from "react";

interface ModalProps {
  image: string;
  imageName: string;
}
const DownloadShareModal: React.FC<ModalProps> = ({ image, imageName }) => {
  const [open, setOpen] = useState(null);
  const handleShow = (image: any) => {
    setOpen((prevOpen) => (prevOpen === image ? null : image));
  };
  return (
    <div className="absolute top-2 right-2">
      <button aria-label="Share-download menu" onClick={() => handleShow(image)}>
        <svg
          className="w-10 h-10 bg-blue-300 rounded-xl  text-gray-800 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="M5 7h14M5 12h14M5 17h14"
          />
        </svg>
      </button>
      <span
        className={`absolute -ml-28 ${
          open === image ? "block" : "hidden"
        } transition duration-1000 ease-in-out  bg-blue-300 rounded-xl  mt-1 p-3  w-auto`}
      >
        <div className="flex flex-col gap-2 my-2">
          <DownloadButton img={image} imgName={imageName} />
          <div id="root">
            <ShareButton
              url={`https://www.photo-grid.org/${
                image?.replace(
                  "https://s3.eu-central-1.amazonaws.com/photo-grid.org/",
                  ""
                ) || ""
              }`}
              imgName={imageName}
            />
          </div>
        </div>
      </span>
    </div>
  );
};
export default DownloadShareModal;
