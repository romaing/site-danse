import { notFound } from 'next/navigation';
import { strapiClient } from '../../../lib/strapi';
import { getImageUrl } from '../../../lib/image-utils';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import Head from 'next/head';

interface Page {
  id: number;
  documentId: string;
  titre: string;
  slug: string;
  contenu: string;
  meta_title?: string;
  meta_description?: string;
  categorie: string;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(markdown);
  return result.toString();
}

async function getPage(slug: string): Promise<Page | null> {
  try {
    const response = await strapiClient.getPages();
    const pages = response.data;
    return pages.find((page: Page) => page.slug === slug) || null;
  } catch (error) {
    console.error('Failed to fetch page:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    return {
      title: 'Page non trouvée',
    };
  }

  return {
    title: page.meta_title || page.titre,
    description: page.meta_description,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  const contentHtml = await markdownToHtml(page.contenu);

  return (
    <>
      <Head>
        {page.meta_title && <title>{page.meta_title}</title>}
        {page.meta_description && <meta name="description" content={page.meta_description} />}
      </Head>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-center mb-8">{page.titre}</h1>

          <div
            className="prose prose-lg max-w-none"
            style={{
              lineHeight: '1.7',
              color: '#374151'
            }}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>
    </>
  );
}

// Generate static paths for known pages
export async function generateStaticParams() {
  try {
    const response = await strapiClient.getPages();
    const pages = response.data;

    return pages.map((page: Page) => ({
      slug: page.slug,
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}