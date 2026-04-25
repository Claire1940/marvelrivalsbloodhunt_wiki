import type { Metadata } from 'next'
import { getLatestArticles } from '@/lib/getLatestArticles'
import { buildModuleLinkMap } from '@/lib/buildModuleLinkMap'
import type { Language } from '@/lib/content'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import type { Locale } from '@/i18n/routing'
import HomePageClient from './HomePageClient'

const SITE_NAME = 'Marvel Rivals Blood Hunt'
const DEFAULT_SITE_URL = 'https://www.marvelrivalsbloodhunt.wiki'
const HOME_TITLE = 'Marvel Rivals Blood Hunt - PvE Guide, Rewards & Builds'
const HOME_DESCRIPTION =
  'Marvel Rivals Blood Hunt guide covering PvE mode, release window, hero builds, bosses, rewards, upgrades and tips for the Dracula vampire event.'

const HOME_VIDEO = {
  id: 'Zd8xPgLCQkw',
  title: 'Blood Hunt | New PvE Mode Trailer | Marvel Rivals',
}

const HOMEPAGE_ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": SITE_NAME,
  "url": DEFAULT_SITE_URL,
  "logo": `${DEFAULT_SITE_URL}/android-chrome-512x512.png`,
  "image": `${DEFAULT_SITE_URL}/images/hero.webp`,
}

const HOME_EXTERNAL_LINKS = {
  officialSite: 'https://www.marvelrivals.com/',
  bloodHuntPatchNotes: 'https://www.marvelrivals.com/gameupdate/20260422/41548_1297228.html',
  steam: 'https://store.steampowered.com/app/2767030/Marvel_Rivals/',
  discord: 'https://discord.com/invite/marvelrivals',
  reddit: 'https://www.reddit.com/r/marvelrivals/',
  youtube: 'https://www.youtube.com/@MarvelRivals',
  x: 'https://x.com/MarvelRivals',
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
  const canonical = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`

  return {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    alternates: buildLanguageAlternates('/', locale as Locale, siteUrl),
    other: {
      'ld:organization': JSON.stringify(HOMEPAGE_ORGANIZATION_JSONLD),
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url: canonical,
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      images: [
        {
          url: `${siteUrl}/images/hero.webp`,
          width: 3840,
          height: 2160,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@MarvelRivals',
      creator: '@MarvelRivals',
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      images: [`${siteUrl}/images/hero.webp`],
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  // 服务器端获取最新文章数据
  const latestArticles = await getLatestArticles(locale as Language, 30)
  const moduleLinkMap = await buildModuleLinkMap(locale as Language)

  return (
    <HomePageClient
      latestArticles={latestArticles}
      moduleLinkMap={moduleLinkMap}
      locale={locale}
      homeVideo={HOME_VIDEO}
      externalLinks={HOME_EXTERNAL_LINKS}
    />
  )
}
