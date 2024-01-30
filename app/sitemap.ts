export default async function sitemap() {
  const baseUrl = "https://photo-grid.org";

  const isPrerendering = typeof window === "undefined";

  let result = [];

  if (!isPrerendering) {
    // Fetch data only during runtime
    const res = await fetch("/api/images", {
      method: "GET",
    });

    result = await res.json();
  }

  const uniqueEntries: any[] = [];

  result.forEach((img: any) => {
    const imageEntry = {
      url: `${baseUrl}/${img.imageName}`,
      lastModified: new Date(),
    };

    const categoryEntry = {
      url: `${baseUrl}/${img.imageCategory}`,
      lastModified: new Date(),
    };

    if (!uniqueEntries.some((entry) => entry.url === imageEntry.url)) {
      uniqueEntries.push(imageEntry);
    }

    if (!uniqueEntries.some((entry) => entry.url === categoryEntry.url)) {
      uniqueEntries.push(categoryEntry);
    }
  });

  const sitemapEntries = [
    ...uniqueEntries,
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ];

  return sitemapEntries;
}
