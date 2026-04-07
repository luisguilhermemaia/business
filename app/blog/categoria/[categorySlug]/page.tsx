import { notFound } from 'next/navigation';
import { getBrandConfig } from '../../../../src/brands/getBrandConfig';
import { BlogIndexPage } from '../../../../src/core/sections/BlogIndexPage';
import {
  getAllCategories,
  getAllPostsMeta,
  getCategoryBySlug,
} from '../../../../src/core/utils/blog';

export async function generateStaticParams() {
  const posts = getAllPostsMeta();
  return getAllCategories(posts).map((category) => ({ categorySlug: category.slug }));
}

export async function generateMetadata({ params }: { params: { categorySlug: string } }) {
  const brand = await getBrandConfig();
  const posts = getAllPostsMeta();
  const category = getCategoryBySlug(params.categorySlug, posts);

  if (!category) {
    return {
      title: `${brand.content.pagesMeta.blog.title} | ${brand.name}`,
      description: brand.content.pagesMeta.blog.description,
    };
  }

  return {
    title: `${category.label}: artigos e orientações | ${brand.name}`,
    description: `Conteúdos da categoria ${category.label}: artigos com orientações práticas sobre saúde da mulher.`,
    alternates: {
      canonical: `/blog/categoria/${category.slug}`,
    },
  };
}

export default async function BlogCategoryPage({ params }: { params: { categorySlug: string } }) {
  const brand = await getBrandConfig();
  const posts = getAllPostsMeta();
  const categories = getAllCategories(posts);
  const category = categories.find((item) => item.slug === params.categorySlug);

  if (!category) {
    notFound();
  }

  return (
    <BlogIndexPage
      posts={posts}
      categories={categories}
      introTitle={`${brand.content.blog.intro.title} · ${category.label}`}
      introDescription={brand.content.blog.intro.description}
      basePath={`/blog/categoria/${category.slug}`}
      activeCategorySlug={category.slug}
    />
  );
}
