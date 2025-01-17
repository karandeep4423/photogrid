import ImageCard from "@/components/imageCard/page";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  // Check if params or params.slug is undefined
  if (!params || !params?.slug) {
    return [];
  }
  
  try {
    const res = await fetch(
      `https://photo-grid.org/api/image-detail?params=${params?.slug}`
    );
    const result = await res.json();
    if (!result)
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist.",
      };

    return {
      title: result[0]?.imageTitle,
      description: result[0]?.imageDescription,
      alternates: {
        canonical: `https://photo-grid.org/${params.slug}`,
      },
    };
  } catch (error) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
}

export async function generateStaticParams({
  params,
}: {
  params: {
    slug?: string;
  };
}) {
  // Check if params or params.slug is undefined
  if (!params || !params?.slug) {
    return [];
  }

  try {
    const res = await fetch(
      `https://photo-grid.org/api/images?params=${params.slug}`
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
          !uniqueValues.has(img?.imageName) &&
          !uniqueValues.has(img?.imageCategory);

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
  } catch (error) {
    return [];
  }
}

const ImagePage = async ({ params }: { params: { slug: string } }) => {
  return <ImageCard params={params?.slug} />;
};

export default ImagePage;
