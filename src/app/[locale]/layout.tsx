import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { getNavPreviewData } from '@/lib/nav-preview'
import type { Language } from '@/lib/content'
import { getWikiLinks } from '@/lib/wiki-links'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import ClientBody from '../ClientBody'
import Analytics from '@/components/Analytics'
import { SocialBarAd } from '@/components/ads'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const SITE_NAME = 'Marvel Rivals Blood Hunt'
const DEFAULT_SITE_URL = 'https://www.marvelrivalsbloodhunt.wiki'
const DEFAULT_DESCRIPTION =
  'Marvel Rivals Blood Hunt guide covering PvE mode, release window, hero builds, bosses, rewards, upgrades and tips for the Dracula vampire event.'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

// 生成静态参数
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// 生成元数据
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
  const localeUrl = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`

  return {
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    metadataBase: new URL(siteUrl),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: localeUrl,
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
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
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      images: [`${siteUrl}/images/hero.webp`],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    manifest: '/manifest.json',
    alternates: buildLanguageAlternates('/', locale as Locale, siteUrl),
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
  const layoutStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: SITE_NAME,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: SITE_NAME,
        url: siteUrl,
        logo: `${siteUrl}/android-chrome-512x512.png`,
      },
    ],
  }

  // 验证 locale
  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  // 获取翻译消息（不需要 setRequestLocale！）
  const messages = await getMessages()
  const navPreviewData = await getNavPreviewData(locale as Language)
  const wikiLinks = getWikiLinks()

  return (
    <div lang={locale} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(layoutStructuredData) }}
      />
      <Script
        crossOrigin="anonymous"
        src="https://unpkg.com/same-runtime@0.0.1/dist/index.global.js"
        strategy="beforeInteractive"
      />
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7733402184034568"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <meta name="google-adsense-account" content="ca-pub-7733402184034568" />
        <Analytics />
        <NextIntlClientProvider messages={messages}>
          <ClientBody navPreviewData={navPreviewData} wikiLinks={wikiLinks}>{children}</ClientBody>
        </NextIntlClientProvider>
        {/* 社交栏广告 */}
        <SocialBarAd adKey={process.env.NEXT_PUBLIC_AD_SOCIAL_BAR || ''} />
    </div>
  )
}
