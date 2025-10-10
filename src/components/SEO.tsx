import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  schema?: Record<string, any>;
}

const SEO: React.FC<SEOProps> = ({
  title = 'LISIN - Discover, Share and Create Amazing Music',
  description = 'LISIN is a music sharing platform where artists can upload, share, and discover amazing songs. Join our community of music lovers and creators today!',
  keywords = 'music, songs, streaming, music platform, share music, discover music, upload songs, music community, artists, LISIN',
  image = 'https://lisin.vercel.app/src/assets/shot.jpg',
  url = 'https://lisin.vercel.app',
  type = 'website',
  author = 'LISIN',
  publishedTime,
  modifiedTime,
  schema,
}) => {
  const fullTitle = title.includes('LISIN') ? title : `${title} | LISIN`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="LISIN" />

      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

