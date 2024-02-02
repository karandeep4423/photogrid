"use client";
import React, { useState, useEffect, useRef } from "react";
import Pagination from "@/components/Pagination/page";
import Link from "next/link";
import DownloadShareModal from "@/components/downloadShareModal/page";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

interface ImageProps {
  params: string;
}
const ImageCard: React.FC<ImageProps> = ({ params }) => {
  const [data, setData] = useState<resultProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState<resultProps[]>([]);
  const previousSlug = useRef<string | null>(null);
  const [imageCategories, setImageCategories] = useState<string[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const pageSize = 12;
  console.log("params", params);
  type resultProps = {
    image: string;
    imageName: string;
    imageCategory: string;
    _id: string;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const to = pageSize * page;
    const from = to - pageSize;
    setCollection(data.slice(from, to));
    scrollToTop();
  };

  const fetchDataAndSetCollection = async () => {
    if (params) {
      const res = await fetch(`/api/images?params=${params}`, {
        method: "GET",
      });
      const result = await res.json();
      // if (result.length == 0) {
      //   router.push("/not-found-page");
      // }
      const fetchedData = result || [];
      console.log("fetch res", result);
      setData(fetchedData);
      setCollection(fetchedData.slice(0, pageSize));
      fetchCategories(fetchedData);
      previousSlug.current = params;
    }
  };

  useEffect(() => {
    fetchDataAndSetCollection();
  }, [params]);

  const fetchCategories = async (data: resultProps[]) => {
    const imgNm = data.map((img) => img.imageName);
    const mySet = new Set(imgNm);
    const value = Array.from(mySet).join(",");
    const res = await fetch(`/api/images?params=${value}`, {
      method: "GET",
    });
    const result = await res.json();
    const fetchedData = result || [];
    setImageCategories(getImageCategories(fetchedData));
  };

  const getImageCategories = (imageData: resultProps[]): string[] => {
    return Array.from(new Set(imageData.map((img) => img.imageCategory)));
  };

  console.log("data", collection);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-screen-xl m-auto">
      {collection?.length == 0 ? (
        <div className=" h-screen flex items-center justify-center">
          <div
            role="status"
            className="space-y-8 animate-pulse  md:space-x-8 rtl:space-x-reverse md:flex md:flex-col md:items-center"
          >
            <div className="w-full">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </div>
            <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex  items-center justify-center">
            <div>
              <h2 className="text-gray-700 relative mt-12 text-center mx-3 text-2xl sm:text-4xl font-bold">
                {params
                  .replace(/-/g, " ")
                  .replace(/^\w/, (match) => match.toUpperCase())}
                images{" "}
              </h2>
            </div>
            <div className="bg-sky-400 z-20 mt-12 absolute mix-blend-multiply filter blur-2xl h-16 w-56 "></div>
          </div>
          <p className="px-10 my-2 text-lg">
            Find good morning images which are useful to send your beloved ones.
          </p>
          <div className=" my-14  grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10 px-5">
            {collection.map((img: resultProps, i: number) => {
              return (
                <div
                  key={i}
                  className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] relative  w-full max-h-fit p-1 border-2 rounded-2xl  
              "
                >
                  <div>
                    <Image
                      // src={`https://dnid0r1bm9raq.cloudfront.net/${
                      //   img?.image?.split(".com")[1]?.substring(1) || null
                      // }`}
                      src={img?.image}
                      alt=""
                      width={250}
                      height={250}
                      className="rounded-2xl  object-fill aspect-square w-full h-auto"
                    />
                  </div>
                  <div>
                    <DownloadShareModal
                      image={img.image}
                      imageName={img.imageName}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="my-10 flex justify-center">
            <Pagination
              current={currentPage}
              total={data.length}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
          </div>
          <div className="mb-8 sm:mb-10 flex flex-wrap items-center justify-around m-2 sm:m-3">
            {imageCategories.map((category, index) => (
              <div key={index}>
                <Link
                  href={`/${category}`}
                  className={`text-gray-700  font-medium  sm:font-semibold shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hover:bg-blue-400 hover:text-white border-2 rounded-xl border-white flex  m-1   p-1.5   sm:p-2  ${
                    pathname.includes(`/${category}`)
                      ? "bg-sky-600 hover:bg-sky-600 text-white"
                      : ""
                  }`}
                >
                  {category
                    .replace(/-/g, " ")
                    .replace(/^\w/, (match) => match.toUpperCase())}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
