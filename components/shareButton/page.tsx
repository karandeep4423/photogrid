"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
  TwitterIcon,
  EmailIcon,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";
import CopyToClipboard from "react-copy-to-clipboard";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    text: "black",
    color: "black",
    borderRadius: "20px",
    backgroundColor: "rgb(191 219 254)",
    padding: "13px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 20,
  },
};

interface ShareButtonProps {
  url: string;
  imgName: string;
}
export const ShareButton: React.FC<ShareButtonProps> = ({ url, imgName }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isCopied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  let subtitle: HTMLHeadingElement | null = null;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    if (subtitle) {
      subtitle.style.color = "#f00";
    }
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    Modal.setAppElement("#root"); // Replace with your app's root element ID
  }, []);

  return (
    <div>
      <button
        aria-label="Share image"
        onClick={openModal}
        className="w-full flex items-center justify-center gap-1 bg-sky-600 px-2 py-2 text-white font-medium leading-tight border-2 rounded-xl "
      >
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
            d="M4.2 19c-1-3.2 1-10.8 8.3-10.8V6.1a1 1 0 0 1 1.6-.9l5.5 4.3a1.1 1.1 0 0 1 0 1.7L14 15.6a1 1 0 0 1-1.6-1v-2c-7.2 1-8.3 6.4-8.3 6.4Z"
          />
        </svg>
        Share
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button
          aria-label="close share modal"
          className="absolute top-2 right-2 "
          onClick={closeModal}
        >
          <svg
            className="w-8 h-8 text-gray-800 "
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
              d="M6 18 18 6m0 12L6 6"
            />
          </svg>{" "}
        </button>
        <div className=" mt-4  flex flex-col gap-2">
          <div className="flex flex-row gap-3">
            <WhatsappShareButton url={url} title={imgName}>
              <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
            <FacebookShareButton title={imgName} url={url}>
              <FacebookIcon size={40} round={true} />
            </FacebookShareButton>{" "}
            <TwitterShareButton title={imgName} url={url}>
              <TwitterIcon size={40} round={true} />
            </TwitterShareButton>{" "}
            <EmailShareButton title={imgName} url={url}>
              <EmailIcon size={40} round={true} />
            </EmailShareButton>{" "}
          </div>
          <div className="bg-blue-200 flex flex-row  items-center justify-center border-2 rounded-lg border-gray-100 p-1  text-black">
            <svg
              className="w-6 h-6 text-gray-800"
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
                d="M13.2 9.8a3.4 3.4 0 0 0-4.8 0L5 13.2A3.4 3.4 0 0 0 9.8 18l.3-.3m-.3-4.5a3.4 3.4 0 0 0 4.8 0L18 9.8A3.4 3.4 0 0 0 13.2 5l-1 1"
              />
            </svg>
            <input
              className="outline-none bg-blue-200 pr-1 sm:pr-2 "
              readOnly
              value={url}
              type="text"
            ></input>
            <CopyToClipboard text={url} onCopy={handleCopy}>
              <button
                aria-label="Copy image link"
                className="bg-sky-600 rounded-lg text-white px-2 sm:px-3 py-2  focus:outline-none"
              >
                {isCopied ? "Copied!" : "Copy link"}
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShareButton;
