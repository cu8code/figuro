import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

function getLastModifiedDate(filePath: string): Date {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return new Date(); // Fallback to current date if file cannot be read
  }
}

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles); // Recursively read subdirectories
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogDir = path.join(process.cwd(), 'content', 'blog');

  const blogPostPaths = getAllFiles(blogDir);

  const blogEntries = blogPostPaths.map((filePath) => ({
    url: `https://figuro.in/blogs/${path.basename(filePath)}`,
    lastModified: getLastModifiedDate(filePath),
  }));

  return [
    {
      url: 'https://figuro.in',
      lastModified: new Date(),
    },
    {
      url: 'https://figuro.in/about',
      lastModified: new Date(),
    },
    {
      url: 'https://figuro.in/blog',
      lastModified: new Date(),
    },
    ...blogEntries, // Include dynamically generated blog entries
  ];
}
