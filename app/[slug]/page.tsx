import ImageCard from "@/components/imageCard/page";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/image-detail?params=${params?.slug}`,
      {
        method: "GET",
      }
    );
    const result = await res.json();
    console.log("server func",  result);

    if (!result)
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist.",
      };

    return {
      title: result[0]?.imageTitle,
      description: result[0]?.imageDescription,
      alternates: {
        canonical: `http://localhost:3000/${params.slug}`,
      },
    };
  } catch (error) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
}

// export async function generateStaticParams({
//   params,
// }: {
//   params: {
//     slug: string;
//   };
// }) {
//   const res = await fetch(
//     `http://localhost:3000/api/images?params=${params?.slug}`,
//     {
//       method: "GET",
//     }
//   );
//   const result = await res.json();
//   if (!result) return [];
//   return result.map((img: any) => ({
//     imageName: img?.imageName,
//     imageCategory: img?.imageCategory,
//   }));
// }

export async function generateStaticParams({
  params,
}: {
  params: {
    slug?: string;
  };
}) {
  const res = await fetch(
    `http://localhost:3000/api/images?params=${params?.slug}`,
    {
      method: "GET",
    }
  );
  
  const result = await res.json();
  
  if (!Array.isArray(result)) {
    return [];
  }

  const uniqueValues = new Set();

  return result
    .filter((img) => {
      // Check if both imageName and imageCategory are unique
      const isUnique =
        !uniqueValues.has(img?.imageName) && !uniqueValues.has(img?.imageCategory);

      if (isUnique) {
        // Add the values to the set if they are unique
        uniqueValues.add(img?.imageName);
        uniqueValues.add(img?.imageCategory);
      }

      return isUnique;
    })
    .map((img) => ({
      imageName: img?.imageName,
      imageCategory: img?.imageCategory,
    }));
}



const ImagePage = async ({ params }: { params: { slug: string } }) => {
  return <ImageCard params={params?.slug} />;
};

export default ImagePage;
