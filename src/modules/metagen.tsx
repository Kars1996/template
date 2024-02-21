import { useEffect } from 'react';
import Head from 'next/head';

/*
Copyright © 2024 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquieries
*/

interface MetaData {
  title?: string;
  description?: string;
  keywords?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  };
  twitter?: {
    card?: string;
    site?: string;
    title?: string;
    description?: string;
    image?: string;
  };
}

export const metaGen = (metadata: MetaData) => {
  useEffect(() => {
    const updateMetaTags = () => {
      const metaTags = [
        { name: 'description', content: metadata.description },
        { property: 'og:title', content: metadata.openGraph?.title },
        { property: 'og:description', content: metadata.openGraph?.description },
        { property: 'og:image', content: metadata.openGraph?.image },
        { name: 'twitter:title', content: metadata.twitter?.title },
        { name: 'twitter:description', content: metadata.twitter?.description },
        { name: 'twitter:image', content: metadata.twitter?.image },
      ];

      metaTags.forEach(({ name, property, content }) => {
        const tag = document.querySelector(`meta[name="${name}"], meta[property="${property}"]`);
        if (tag) {
          tag.setAttribute('content', content || '');
        }
      });

      if (metadata.title) {
        document.title = metadata.title;
      }
    };

    updateMetaTags();
  }, [metadata]);

  return (
    <Head>
      {metadata.title && <title>{metadata.title}</title>}
      {metadata.description && <meta name="description" content={metadata.description} />}
      {metadata.keywords && <meta name="keywords" content={metadata.keywords} />}
      {metadata.openGraph && (
        <>
          <meta property="og:title" content={metadata.openGraph.title} />
          <meta property="og:description" content={metadata.openGraph.description} />
          <meta property="og:image" content={metadata.openGraph.image} />
          <meta property="og:url" content={metadata.openGraph.url} />
        </>
      )}
      {metadata.twitter && (
        <>
          <meta name="twitter:card" content={metadata.twitter.card} />
          <meta name="twitter:site" content={metadata.twitter.site} />
          <meta name="twitter:title" content={metadata.twitter.title} />
          <meta name="twitter:description" content={metadata.twitter.description} />
          <meta name="twitter:image" content={metadata.twitter.image} />
        </>
      )}
    </Head>
  );
};
