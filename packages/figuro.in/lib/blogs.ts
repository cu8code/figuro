import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';

// Path to the blog directory
const blogDirectory = path.join(process.cwd(), 'content', 'blog');

// Get all blog posts
export function getAllBlogPosts() {
  const fileNames = fs.readdirSync(blogDirectory);

  const posts = fileNames.map((fileName) => {
    // Remove .md extension to get the slug
    const slug = fileName.replace(/\.md$/, '');

    // Read the file
    const filePath = path.join(blogDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Parse front matter and content
    const { data: frontMatter, content } = matter(fileContent);

    return {
      slug,
      frontMatter,
      content,
    };
  });

  // Sort posts by date (if available)
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontMatter.date || '');
    const dateB = new Date(b.frontMatter.date || '');
    return dateB.getTime() - dateA.getTime();
  });
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string) {
  const filePath = path.join(blogDirectory, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Parse front matter and content
  const { data: frontMatter, content } = matter(fileContent);

  // Process Markdown content with remark
  const processedContent = await remark()
    .use(remarkGfm) // Add support for GitHub Flavored Markdown (tables, etc.)
    .use(remarkMath) // Add support for math expressions
    .use(remarkHtml) // Convert Markdown to HTML
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    frontMatter,
    content: contentHtml, // Return processed HTML content
  };
}
