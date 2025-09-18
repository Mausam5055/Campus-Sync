import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const defaultSEO = {
  title: 'CampusSync - Complete Student Management Platform',
  description: 'Revolutionizing Academic Excellence. Empowering students worldwide with cutting-edge technology that transforms academic management into an intuitive, efficient, and enjoyable experience.',
  image: '/preview.png',
  type: 'website',
  keywords: 'student management, academic excellence, student platform, grade tracker, assignment management, university tools, academic success, student productivity, campus life, education technology',
  author: 'CampusSync Team',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://campussync.lovable.app'
};

export function SEO({
  title,
  description = defaultSEO.description,
  image = defaultSEO.image,
  url,
  type = defaultSEO.type,
  keywords = defaultSEO.keywords,
  author = defaultSEO.author,
  publishedTime,
  modifiedTime
}: SEOProps) {
  const seoTitle = title ? `${title} | CampusSync` : defaultSEO.title;
  const seoUrl = url || (typeof window !== 'undefined' ? window.location.href : defaultSEO.url);
  const seoImage = typeof image === 'string' && image.startsWith('http') ? image : `${typeof window !== 'undefined' ? window.location.origin : defaultSEO.url}${image}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CampusSync",
    "description": description,
    "url": defaultSEO.url,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "CampusSync Team"
    },
    "image": seoImage,
    "screenshot": seoImage
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="theme-color" content="#3B82F6" />

      {/* Canonical URL */}
      <link rel="canonical" href={seoUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:width" content="1600" />
      <meta property="og:image:height" content="900" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={seoTitle} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:site_name" content="CampusSync" />
      <meta property="og:locale" content="en_US" />

      {/* WhatsApp specific optimizations */}
      <meta property="og:image:secure_url" content={seoImage} />
      <meta name="thumbnail" content={seoImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:image:alt" content={seoTitle} />
      <meta name="twitter:creator" content="@CampusSync" />
      <meta name="twitter:site" content="@CampusSync" />

      {/* Additional meta tags for better social sharing */}
      <meta name="image" content={seoImage} />
      <meta itemProp="name" content={seoTitle} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={seoImage} />

      {/* WhatsApp specific */}
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1600" />
      <meta property="og:image:height" content="900" />

      {/* Article specific meta tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
    </Helmet>
  );
}