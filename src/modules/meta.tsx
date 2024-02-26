"use client"
import { useEffect } from 'react';
import Head from 'next/head';

/*
Copyright © 2024 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquieries
*/

interface PageMeta {
  title: string;
  description?: string;
}

export const newMeta = (meta: PageMeta) => {
  useEffect(() => {
    document.title = meta.title;
  }, [meta.title]);

  return (
    <Head>
      <title>{meta.title}</title>
      {meta.description && <meta name="description" content={meta.description} />}
    </Head>
  );
};
