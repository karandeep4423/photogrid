"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

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
    backgroundColor: "rgb(2 6 23)",
    padding: "40px",
    width: "80%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 20,
  },
};

interface ImageDetailProps {
  children?: React.ReactNode;
  url: string;
}

type resultProps = {
  imageName: string;
  imageLanguage: string;
  imageTitle: string;
  imageDescription: string;
  imageContent: string;
  imageAlt:string;
  id: string;
};
export const ImageDetailEdit: React.FC<ImageDetailProps> = ({ url }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [imageDetail, setImageDetail] = useState<resultProps[]>([]);
  const [imageName, setImageName] = useState("");
  const [imageLanguage, setImageLanguage] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [imageContent, setImageContent] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [id, setID] = useState(null);
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
    Modal.setAppElement("#root");
  });

  const fetchImageDetail = async () => {
    const res = await fetch(
      `/api/image-detail?params=${url
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/^-+|-+$/g, "")}`,
      {
        method: "GET",
      }
    );
    const result = await res.json();
    setImageDetail(result || []);
    const firstImageDetail = result[0];
    if (firstImageDetail) {
      setImageName(firstImageDetail.imageName);
      setImageLanguage(firstImageDetail.imageLanguage);
      setImageTitle(firstImageDetail.imageTitle);
      setImageDescription(firstImageDetail.imageDescription);
      setImageContent(firstImageDetail.imageContent);
      setImageAlt(firstImageDetail.imageAlt);
      setID(firstImageDetail._id);
    }
  };
  useEffect(() => {
    fetchImageDetail();
  }, [url]);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const updateImageDetail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/image-detail`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          imageName,
          imageLanguage,
          imageTitle,
          imageDescription,
          imageContent,
          imageAlt,
        }),
      });
      const result = await res.json();
      if (result.message === "success") {
        await fetchImageDetail();
        closeModal();
        toast.success("Image deatils updated successfully!");
      }
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error("Server error,Try again");
    }
  };

  const deleteImageDetail = async () => {
    const res = await fetch("/api/image-detail", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    const result = await res.json();
    if (result.message === "success") {
      toast.success("Image detail has been deleted successfully!");
      await fetchImageDetail();
      closeModal();
    } else {
      toast.error("Server error,Try again");
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="w-full flex items-center justify-center gap-1 bg-sky-600 hover:bg-sky-700 px-3 py-2 text-white font-medium  rounded-xl "
      >
        image/url Detail
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button className="absolute top-2 right-2 " onClick={closeModal}>
          <svg
            className="w-8 h-8 text-gray-300 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18 18 6m0 12L6 6"
            />
          </svg>
        </button>
        <div>
          <form method="PUT">
            <div className="relative  z-0 w-full mb-4 group">
              <input
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                type="text"
                className="font-bold text-lg block background-transparent overflow-hidden py-2.5 px-0 w-full  text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
              />
              <label className=" peer-focus:font-medium absolute text-xl text-gray-200  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Write image name (parent/category/url)
              </label>
            </div>
            <div className="relative  z-0 w-full mb-4 group">
              <input
                value={imageLanguage}
                onChange={(e) => setImageLanguage(e.target.value)}
                type="text"
                className="font-bold text-lg block background-transparent overflow-hidden py-2.5 px-0 w-full  text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
              />
              <label className=" peer-focus:font-medium absolute text-xl text-gray-200  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Write image language
              </label>
            </div>
            <div className="relative  z-0 w-full mb-4 group">
              <input
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                type="text"
                className="font-bold text-lg block background-transparent overflow-hidden py-2.5 px-0 w-full  text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
              />
              <label className=" peer-focus:font-medium absolute text-xl text-gray-200  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Write image Title
              </label>
            </div>
            <div className="relative  z-0 w-full mb-4 group">
              <textarea
                value={imageDescription}
                onChange={(e) => setImageDescription(e.target.value)}
                className="h-24 font-medium text-base block background-transparent overflow-hidden py-2.5 px-0 w-full  text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
              />
              <label className=" peer-focus:font-medium absolute text-xl text-gray-200  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Write image Description
              </label>
            </div>
            <div className="relative  z-0 w-full mb-4 group">
              <textarea
                value={imageContent}
                onChange={(e) => setImageContent(e.target.value)}
                className="h-24 font-medium text-base block background-transparent overflow-hidden py-2.5 px-0 w-full  text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
              />
              <label className=" peer-focus:font-medium absolute text-xl text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Write image content
              </label>
            </div>
            <div className="relative  z-0 w-full mb-4 group">
              <textarea
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                className=" h-24 font-medium text-xl block background-transparent overflow-hidden py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
              />
              <label className=" peer-focus:font-medium absolute text-2xl text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Write image Alt tags
              </label>
            </div>
            <div className="flex justify-around items-center">
              <button
                className="px-3 py-2 rounded-xl text-lg hover:bg-sky-700 bg-sky-600 text-gray-200"
                onClick={(e) => {
                  updateImageDetail(e);
                }}
              >
                Edit detail
              </button>
              <button
                onClick={deleteImageDetail}
                className="px-3 py-2 rounded-xl text-lg hover:bg-sky-700 bg-sky-600 text-gray-200"
              >
                Delete detail
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ImageDetailEdit;
