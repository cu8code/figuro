import { GetStaticProps } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "../../lib/blogs";
import styles from "../../styles/Blog.module.css";
import Head from "next/head";

type BlogPost = {
  slug: string;
  frontMatter: {
    title: string;
    date: string;
    time: string;
    tags: string[];
    description: string;
  };
};

export default function Blog({ posts }: { posts: BlogPost[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        url: `https://figuro.in/blogs/${post.slug}`,
        name: post.frontMatter.title,
        description: post.frontMatter.description,
        datePublished: post.frontMatter.date,
      },
    })),
  };

  return (
    <>
      <Head>
        {/* Meta Tags */}
        <title>Blog - Figuro</title>
        <meta
          name="description"
          content="Explore our blog for insights on strategy, AI SEO, frameworks, APIs, and workflows."
        />
        <meta
          property="og:title"
          content="Blog - Figuro"
        />
        <meta
          property="og:description"
          content="Explore our blog for insights on strategy, AI SEO, frameworks, APIs, and workflows."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://figuro.in/blog"
        />
        <meta
          property="og:image"
          content="https://figuro.in/default-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Blog - Figuro"
        />
        <meta
          name="twitter:description"
          content="Explore our blog for insights on strategy, AI SEO, frameworks, APIs, and workflows."
        />
        <meta
          name="twitter:image"
          content="https://figuro.in/default-image.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://figuro.in/blog" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.heroSection}>
          <h1 className={styles.heroTitle}>
            Dive in by <span className={styles.highlight}>Ideas</span>
          </h1>
          <div className={styles.topics}>
            <span>Strategy</span>
            <span>AI SEO</span>
            <span>Frameworks</span>
            <span>APIs</span>
            <span>Workflow</span>
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className={styles.blogGrid}>
          {posts.map((post) => (
            <div key={post.slug} className={styles.blogCard}>
              <div className={styles.blogContent}>
                <p className={styles.blogDate}>
                  {post.frontMatter.date} • {post.frontMatter.time}
                </p>
                <h2 className={styles.blogTitle}>{post.frontMatter.title}</h2>
                <p className={styles.blogDescription}>
                  {post.frontMatter.description}
                </p>
                <div className={styles.tags}>
                  {post.frontMatter.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/blogs/${post.slug}`} className={styles.readMore}>
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllBlogPosts();

  return {
    props: {
      posts,
    },
  };
};
