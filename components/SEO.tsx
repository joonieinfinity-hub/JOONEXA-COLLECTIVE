import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Joonexa Collective | Premium Influencer Marketing Agency',
  description = 'Elevating brands through strategic influencer partnerships and high-conversion digital experiences. Founded by Rimi.',
  keywords = ['influencer marketing', 'digital agency', 'brand growth', 'content strategy'],
  ogImage = 'https://picsum.photos/seed/joonexa/1200/630',
  ogType = 'website',
  canonicalUrl = window.location.href,
}) => {
  const siteName = 'Joonexa Collective';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (Schema.org) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": siteName,
          "image": ogImage,
          "description": description,
          "url": canonicalUrl,
          "founder": {
            "@type": "Person",
            "name": "Rimi"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Mumbai",
            "addressCountry": "IN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "hello@joonexa-collective.com",
            "contactType": "customer service"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
