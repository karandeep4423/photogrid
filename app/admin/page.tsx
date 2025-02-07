"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useDropzone } from "react-dropzone";
import Pagination from "@/components/Pagination/page";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { useRouter, usePathname } from "next/navigation";
import ImageDetailEdit from "@/components/admin-image-detail/page";
export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [imageNames, setImageNames] = useState<string[]>([]);
  const [imageName, setImageName] = useState("");
  const [imageCategory, setImageCategory] = useState("");
  const [imageLanguage, setImageLanguage] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [imageContent, setImageContent] = useState("");
  const [searchImage, setSearchImage] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [data, setData] = useState<resultProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState<resultProps[]>([]);
  const [loader, setLoader] = useState(false);
  const [writeImageDetail, setWriteImageDetail] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const pageSize = 12;

  type resultProps = {
    image: string;
    imageName: string;
    imageCategory: string;
    imageLanguage: string;
    imageTitle: string;
    imageDescription: string;
    imageContent: string;
    _id: string;
  };
  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.slice(0, 50); // Limit to 3 files for preview
    setFiles([...files, ...newFiles]);
    const newImageNames = newFiles.map((file) => file.name);
    setImageNames([...imageNames, ...newImageNames]);
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);

    const updatedImageNames = [...imageNames];
    updatedImageNames.splice(index, 1);
    setImageNames(updatedImageNames);
  };

  const uploadImage = async (e: FormEvent) => {
    e.preventDefault();

    if (!files.length || !imageCategory || !imageLanguage || !imageName) {
      console.error("All fields are required");
      toast.error("All fields are required!");
      return;
    }
    setLoader(true);
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append("images", file);
      formData.append("imageNames", imageNames[index]);
    });
    formData.append(
      "imageName",
      imageName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/^-+|-+$/g, "")
    );
    formData.append(
      "imageCategory",
      imageCategory
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/^-+|-+$/g, "")
    );
    formData.append(
      "imageLanguage",
      imageLanguage
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/^-+|-+$/g, "")
    );
    try {
      const res = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.message === "success") {
        setLoader(false);
        fetchData();
        setFiles([]);
        setImageNames([]);
        toast.success("Image saved successfully");
      } else {
        console.error("Server error. Try again.");
        toast.error("Server error");
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error("Error:", error);
    }
  };

  const deleteImage = async (_id: string, image: string) => {
    const res = await fetch("/api/images", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        image,
      }),
    });
    const result = await res.json();
    if (result.status === 200) {
      toast.success("Image deleted successfully");
      fetchData();
    } else {
      toast.error("Internal server error");
    }
  };

  const fetchData = async () => {
    setLoader(true);
    const res = await fetch(
      `/api/images?params=${searchImage
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/^-+|-+$/g, "")}`,
      {
        method: "GET",
      }
    );
    const result = await res.json();
    if (result.length == 0) {
      toast.error("There is no data for this request.");
    }
    const fetchedData = result || [];
    setData(fetchedData);
    setCollection(fetchedData.slice(0, pageSize));
    setLoader(false);
  };

  const imageDetailBtn = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/image-detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageName: imageName
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/^-+|-+$/g, ""),
        imageLanguage: imageLanguage
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/^-+|-+$/g, ""),
        imageTitle,
        imageDescription,
        imageContent,
        imageAlt,
      }),
    });
    const result = await res.json();
    if (result.message === "success") {
      toast.success("Image details saved successfully");
    } else {
      toast.error("Server error");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    onDrop,
  });
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const to = pageSize * page;
    const from = to - pageSize;
    setCollection(data.slice(from, to));
    scrollToTop();
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const imageDetailToggle = () => {
    setWriteImageDetail(!writeImageDetail);
  };

  const verifyToken = (token: string, secret: Secret): JwtPayload | null => {
    try {
      const decoded = jwt.verify(token, secret) as JwtPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (
      !authToken ||
      !verifyToken(authToken, process.env.NEXT_PUBLIC_JWT as Secret)
    ) {
      if (pathname !== "/login") {
        router.push("/login");
      }
    }
  }, [router]);

  return (
    <div className="bg-black">
      <div className="mx-10 sm:mx-32  relative max-w-screen-xl xl:m-auto">
        {/* Heading buttons */}
        <div className="flex justify-center gap-2 items-center flex-col">
          <h1 className="text-3xl mt-3 font-bold text-gray-400 sm:text-5xl text-center">
            Upload images
          </h1>
          <div className="flex flex-col md:flex-row gap-4 m-6 items-center">
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="px-4 font-medium text-gray-100 text-base hover:border-white py-2 hover:bg-sky-700 bg-sky-600  rounded-xl"
            >
              Logout
            </button>
            <div id="root">
              <ImageDetailEdit url={searchImage}>Check Detail</ImageDetailEdit>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                onClick={imageDetailToggle}
                type="checkbox"
                value=""
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-sky-600 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-sky-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Image detail toggle
              </span>
            </label>
          </div>
        </div>
        {/* Search and upload images */}
        <div className="flex flex-col gap-5">
          <input
            placeholder="Search images by language and url"
            className="text-gray-200 bg-black font-bold text-2xl border-2 rounded-xl p-2 px-3 border-white"
            onChange={(e) => setSearchImage(e.target.value)}
            value={searchImage}
            type="search"
            required
          ></input>
          <div className="flex justify-center w-full items-center">
            <button
              onClick={() => {
                fetchData();
              }}
              className="text-lg flex items-center justify-center font-medium w-6/12 py-2 rounded-xl text-center overflow-hidden group bg-sky-600 relative hover:bg-gradient-to-r hover:from-sky-600 hover:to-sky-600 text-white hover:ring-2 hover:ring-offset-2 hover:ring-sky-500 transition-all ease-out duration-300"
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
                "Fetch Data"
              )}
            </button>
          </div>
        </div>
        {/* Upload images and content */}
        <form
          className="flex flex-col py-5 m-5 justify-center items-center"
          onSubmit={writeImageDetail == true ? imageDetailBtn : uploadImage}
        >
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p className="border-2 text-gray-200 text-2xl sm:text-3xl rounded-lg p-2 hover:text-blue-700">
              Drag drop files here, or click to select files
            </p>
          </div>
          {files?.length > 0 && (
            // Display selected files
            <div className="my-5">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between  border-2  p-3  rounded-lg  mt-3"
                >
                  <div>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${file.name}`}
                      width={250}
                      height={250}
                      className="w-16 rounded-lg h-16 object-cover "
                    />
                  </div>
                  <p className="text-gray-200">{file.name.slice(0, 30)}</p>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="p-1.5 sm:p-2 border-2 rounded-lg  text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          {/* Images and image details uploader */}
          <div className="relative mt-5   z-0 w-full mb-4 group">
            <input
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              type="text"
              className="font-bold text-2xl block background-transparent overflow-hidden py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
              placeholder=" "
              required
            />
            <label className=" peer-focus:font-medium absolute text-2xl text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              {writeImageDetail == false
                ? "Write image name(Parent category)"
                : "write category/url/image name for saving details"}
            </label>
          </div>
          {writeImageDetail == true ? (
            <>
              <div className="relative  z-0 w-full mb-4 group">
                <input
                  value={imageTitle}
                  onChange={(e) => setImageTitle(e.target.value)}
                  type="text"
                  className="font-bold text-2xl block background-transparent overflow-hidden py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                  placeholder=" "
                />
                <label className=" peer-focus:font-medium absolute text-2xl text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Write image Title
                </label>
              </div>
              <div className="relative  z-0 w-full mb-4 group">
                <textarea
                  value={imageDescription}
                  onChange={(e) => setImageDescription(e.target.value)}
                  className=" h-24 font-medium text-xl block background-transparent overflow-hidden py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                  placeholder=" "
                />
                <label className=" peer-focus:font-medium absolute text-2xl text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Write image Description
                </label>
              </div>
              <div className="relative  z-0 w-full mb-4 group">
                <textarea
                  value={imageContent}
                  onChange={(e) => setImageContent(e.target.value)}
                  className="h-24 font-medium text-xl block background-transparent overflow-hidden py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                  placeholder=" "
                />
                <label className=" peer-focus:font-medium absolute text-2xl text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
            </>
          ) : (
            <div className="relative  z-0 w-full mb-4 group">
              <input
                value={imageCategory}
                onChange={(e) => setImageCategory(e.target.value)}
                type="text"
                className="font-bold text-2xl block background-transparent overflow-hidden py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
                required
              />
              <label className=" peer-focus:font-medium absolute text-2xl text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Write image category/url(Child category)
              </label>
            </div>
          )}

          <div className="relative  z-0 w-full mb-4 group">
            <input
              value={imageLanguage}
              onChange={(e) => setImageLanguage(e.target.value)}
              type="text"
              className="font-bold text-2xl block background-transparent overflow-hidden py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
              placeholder=" "
              required
            />
            <label className=" peer-focus:font-medium absolute text-2xl text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Write image language
            </label>
          </div>
          <button className="flex items-center  justify-center text-lg font-medium w-6/12 py-2 rounded-xl  overflow-hidden group bg-sky-600 relative hover:bg-gradient-to-r hover:from-sky-600 hover:to-sky-600 text-white hover:ring-2 hover:ring-offset-2 hover:ring-sky-500 transition-all ease-out duration-300">
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
              "Submit"
            )}
          </button>
        </form>
      </div>
      {/* Images */}
      <div className="relative max-w-screen-xl m-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10 px-5">
        {collection?.map((img: resultProps, i: number) => {
          return (
            <div
              key={i}
              className=" border-2 rounded-xl h-fit  border-gray-400"
            >
              <div>
                <img
                  src={`https://www.photo-grid.org/${
                    img?.image?.replace(
                      "https://s3.eu-central-1.amazonaws.com/photo-grid.org/",
                      ""
                    ) || ""
                  }`}
                  alt={img.imageName}
                  width={250}
                  height={250}
                  className="rounded-lg w-full h-44"
                />
              </div>
              <div className="flex flex-col p-4 my-2">
                <p className="text-xl font-bold text-sky-600">Image Name:</p>
                <span className="font-bold text-gray-300 text-xl">
                  {img.imageName}
                </span>
                <p className="text-xl font-bold text-sky-600">
                  Image Category:
                </p>
                <span className="text-xl text-gray-300 font-bold">
                  {img.imageCategory}
                </span>
                <p className="text-xl font-bold text-sky-600">
                  Image Language:
                </p>
                <span className="text-xl text-gray-300 font-bold">
                  {img.imageLanguage}
                </span>
                <button
                  onClick={() => deleteImage(img._id, img.image)}
                  className="mt-1 hover:bg-sky-700 px-3 p-2 rounded-xl font-medium text-gray-100 bg-sky-600"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Pagination */}
      <div className="my-10 flex justify-center">
        <Pagination
          current={currentPage}
          total={data.length}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
