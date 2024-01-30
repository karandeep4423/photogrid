
// export default async function sitemap(){
//     const baseUrl = "https://photo-grid.org";
  
//     const res = await fetch("http://localhost:3000/api/images", {
//       method: "GET",
//     });
  
//     const result = await res.json();
  
//     const uniqueEntries: any[] = [];
  
//     result.forEach((img: any) => {
//       const imageEntry = {
//         url: `${baseUrl}/${img.imageName}`,
//         lastModified: new Date(),
//       };
  
//       const categoryEntry = {
//         url: `${baseUrl}/${img.imageCategory}`,
//         lastModified: new Date(),
//       };
  
//       if (!uniqueEntries.some((entry) => entry.url === imageEntry.url)) {
//         uniqueEntries.push(imageEntry);
//       }
  
//       if (!uniqueEntries.some((entry) => entry.url === categoryEntry.url)) {
//         uniqueEntries.push(categoryEntry);
//       }
//     });
  
//     const sitemapEntries = [
//       ...uniqueEntries,
//       {
//         url: baseUrl,
//         lastModified: new Date(),
//       },
//     ];
  
//     return sitemapEntries;
//   }
  
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return new Promise(async (resolve, reject) => {
    try {
      const baseUrl = "https://photo-grid.org";

      const res = await fetch("http://localhost:3000/api/images", {
        method: "GET",
      });

      const result = await res.json();

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

      resolve(sitemapEntries);
    } catch (error) {
      reject(error);
    }
  });
}
