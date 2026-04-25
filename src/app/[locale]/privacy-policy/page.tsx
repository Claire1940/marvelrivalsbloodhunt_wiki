import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

const SITE_NAME = 'Marvel Rivals Blood Hunt'
const DEFAULT_SITE_URL = 'https://www.marvelrivalsbloodhunt.wiki'
const LAST_UPDATED = 'April 25, 2026'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
  const path = '/privacy-policy'
  const title = `Privacy Policy - ${SITE_NAME}`
  const description =
    'Privacy Policy for Marvel Rivals Blood Hunt. Learn how this fan resource site handles analytics, cookies, and user data.'

  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
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

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-300 text-lg mb-2">How we collect, use, and protect data on this site</p>
          <p className="text-slate-400 text-sm">Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Scope</h2>
            <p>
              This Privacy Policy applies to <strong>{SITE_NAME}</strong>, an unofficial fan-made resource website.
              It explains what information we collect and how we use it.
            </p>

            <h2>2. Information We Collect</h2>
            <ul>
              <li><strong>Usage data:</strong> pages visited, session length, device/browser information, and referrer.</li>
              <li><strong>Technical logs:</strong> IP-derived diagnostics used for abuse prevention and reliability.</li>
              <li><strong>Preferences:</strong> language or theme settings stored locally in your browser.</li>
            </ul>

            <h2>3. Cookies and Analytics</h2>
            <p>
              We may use cookies and analytics providers (such as GA4 or similar tools) to understand usage trends and
              improve content quality. You can control cookies through browser settings.
            </p>

            <h2>4. How We Use Data</h2>
            <ul>
              <li>Operate and secure the site</li>
              <li>Measure traffic and improve page quality</li>
              <li>Debug issues and maintain performance</li>
            </ul>

            <h2>5. Third-Party Links</h2>
            <p>
              This site links to third-party platforms such as Marvel Rivals official channels, Steam, Discord, Reddit,
              YouTube, and X. Their privacy practices are governed by their own policies.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              We retain aggregated analytics for operational analysis and remove or anonymize data when no longer needed.
            </p>

            <h2>7. Children&apos;s Privacy</h2>
            <p>
              This site is intended for general audiences and is not designed to knowingly collect personal data from
              children under applicable legal age thresholds.
            </p>

            <h2>8. Policy Updates</h2>
            <p>
              We may revise this policy from time to time. Material changes will be reflected by updating the "Last Updated"
              date above.
            </p>

            <h2>9. Contact</h2>
            <p>
              Privacy requests: <a href="mailto:privacy@marvelrivalsbloodhunt.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">privacy@marvelrivalsbloodhunt.wiki</a>
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
