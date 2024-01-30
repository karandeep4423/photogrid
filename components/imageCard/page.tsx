"use client";
import React, { useState, useEffect, useRef } from "react";
import Pagination from "@/components/Pagination/page";
import Link from "next/link";
import DownloadShareModal from "@/components/downloadShareModal/page";
import { useRouter, usePathname } from "next/navigation";

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
  };

  const fetchDataAndSetCollection = async () => {
    if (params) {
      const res = await fetch(`/api/images?params=${params}`, {
        method: "GET",
      });
      const result = await res.json();
      if(result.length==0){
        router.push('/not-found-page')
      }
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

  return (
    <div>
      <div className="flex  items-center justify-center">
        <div data-aos="fade-up">
          <h2 className="text-gray-700 relative mt-12 text-center mx-3 text-4xl font-bold">
            {params
              .replace(/-/g, " ")
              .replace(/^\w/, (match) => match.toUpperCase())}
            images{" "}
          </h2>
        </div>
        <div className="bg-sky-400 mt-16 absolute   mix-blend-multiply filter blur-2xl h-5 w-56 "></div>
      </div>
      <p className="px-10 my-2 text-xl">
        Find good morning images which are useful to send your beloved ones.
      </p>

      <div className="relative my-14 max-w-screen-xl m-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10 px-5">
        {collection.map((img: resultProps, i: number) => {
          return (
            <div
              key={i}
              className="relative w-fit max-h-fit p-1 border-2 rounded-2xl  
              shadow-[5px_5px_0px_4px_rgba(2,139,199,0.5),_-5px_-5px_0px_rgba(255,255,255,1)]"
            >
              <div>
                <img
                  src={`https://dnid0r1bm9raq.cloudfront.net/${
                    img?.image?.split(".com")[1]?.substring(1) || null
                  }`}
                  className="rounded-2xl object-fill    w-full h-80"
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
      <div className=" mb-10 flex flex-wrap  gap-6 sm:gap-8  w-full ">
        {imageCategories.map((category, index) => (
          <div key={index}>
            <Link
              href={`/${category}`}
              className={`text-gray-700 font-semibold shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hover:bg-blue-400 hover:text-white border-2 rounded-xl border-white p-2 m-2.5 sm:p-3 sm:m-5 ${
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
  );
};

export default ImageCard;
