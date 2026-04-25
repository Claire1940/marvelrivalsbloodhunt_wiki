import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

const SITE_NAME = 'Marvel Rivals Blood Hunt'
const DEFAULT_SITE_URL = 'https://www.marvelrivalsbloodhunt.wiki'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
  const path = '/about'
  const title = `About ${SITE_NAME}`
  const description =
    'About Marvel Rivals Blood Hunt fan wiki: our editorial scope, update policy, and community contribution channels.'

  return {
    title,
    description,
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
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: SITE_NAME,
      title,
      description,
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
      title,
      description,
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About {SITE_NAME}</h1>
          <p className="text-slate-300 text-lg mb-2">Unofficial fan-made guides for the Blood Hunt PvE event</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>What This Site Covers</h2>
            <p>
              {SITE_NAME} focuses on practical, update-aware guidance for Marvel Rivals Blood Hunt, including event access,
              hero builds, boss strategy, reward tracks, and patch note interpretation.
            </p>

            <h2>Editorial Principles</h2>
            <ul>
              <li><strong>Patch-first updates:</strong> prioritize official notes and in-game verification.</li>
              <li><strong>Player-centric framing:</strong> explain what changed and how it affects real matches.</li>
              <li><strong>Clear sourcing:</strong> distinguish confirmed information from community observations.</li>
            </ul>

            <h2>Community and Feedback</h2>
            <p>
              We welcome corrections, missing details, and strategy improvements from the community.
              Send feedback to <a href="mailto:contact@marvelrivalsbloodhunt.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">contact@marvelrivalsbloodhunt.wiki</a>.
            </p>

            <h2>Disclaimer</h2>
            <p>
              This is an unofficial fan project and is not affiliated with or endorsed by the official Marvel Rivals team.
              All trademarks and game assets belong to their respective owners.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
