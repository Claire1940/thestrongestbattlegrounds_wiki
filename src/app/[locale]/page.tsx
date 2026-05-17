import { getLatestArticles } from '@/lib/getLatestArticles'
import { buildModuleLinkMap } from '@/lib/buildModuleLinkMap'
import type { Language } from '@/lib/content'
import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestrongestbattlegrounds.wiki'
  const url = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`
  const title = 'The Strongest Battlegrounds Wiki - Codes, Tier List & Combos'
  const description =
    'The Strongest Battlegrounds Wiki with codes, character tier list, combos, controls, updates, skills, private server tips, and Roblox guides.'
  const image = `${siteUrl}/images/hero.webp`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'The Strongest Battlegrounds Wiki',
      type: 'website',
      images: [{ url: image, width: 1920, height: 1080, alt: 'The Strongest Battlegrounds hero image' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  // 服务器端获取最新文章数据
  const latestArticles = await getLatestArticles(locale as Language, 30)
  const moduleLinkMap = await buildModuleLinkMap(locale as Language)

  return <HomePageClient latestArticles={latestArticles} moduleLinkMap={moduleLinkMap} locale={locale} />
}
