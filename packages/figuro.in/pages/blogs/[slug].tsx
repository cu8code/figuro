import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head'; // Import the Head component
import { getBlogPostBySlug, getAllBlogPosts } from '../../lib/blogs';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import '../../styles/globals.css';
import styles from '../../styles/BlogPost.module.css';
import { useEffect } from 'react';

type BlogPost = {
  slug: string;
  frontMatter: {
    title: string;
    date: string;
    description: string;
    image?: string; // Optional image for social sharing
  };
  content: string;
};

export default function BlogPost({ post }: { post: BlogPost }) {
  useEffect(() => {
    console.log('Component Content Length:', post.content.length); // Log the processed HTML length
  }, [post.content]);

  return (
    <>
      {/* Add Meta Tags for SEO */}
      <Head>
        <title>{post.frontMatter.title} - Your Blog Name</title>
        <meta name="description" content={post.frontMatter.description} />

        <meta property="og:title" content={post.frontMatter.title} />
        <meta property="og:description" content={post.frontMatter.description} />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={post.frontMatter.image || 'https://example.com/default-image.jpg'}
        />
        <meta
          property="og:url"
          content={`https://figuro.in/blog/${post.slug}`}
        />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.frontMatter.title} />
        <meta name="twitter:description" content={post.frontMatter.description} />
        <meta
          name="twitter:image"
          content={post.frontMatter.image || 'https://example.com/default-image.jpg'}
        />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://figuro.in/blog/${post.slug}`} />
      </Head>

      <div className="container">
        <div className={styles.blogPost}>
          <h1>{post.frontMatter.title}</h1>
          <p className={styles.date}>{post.frontMatter.date}</p>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllBlogPosts();

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = await getBlogPostBySlug(slug);

  // Convert Markdown to HTML with support for tables and math
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkMath)
    .process(post.content);

  console.log(processedContent);

  const contentHtml = processedContent.toString();

  console.log('Processed HTML Length:', contentHtml.length); // Log the processed HTML length

  return {
    props: {
      post: {
        ...post,
        content: contentHtml,
      },
    },
  };
};
