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
  const path = '/terms-of-service'
  const title = `Terms of Service - ${SITE_NAME}`
  const description =
    'Terms of Service for Marvel Rivals Blood Hunt fan guide website, including acceptable use and legal limitations.'

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

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-300 text-lg mb-2">Terms and conditions for using this fan resource website</p>
          <p className="text-slate-400 text-sm">Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing <strong>{SITE_NAME}</strong>, you agree to these Terms of Service. If you do not agree,
              do not use the website.
            </p>

            <h2>2. Service Description</h2>
            <p>
              This website provides unofficial guides, references, and community resources for Marvel Rivals Blood Hunt.
              Content is informational and may change as game updates roll out.
            </p>

            <h2>3. Acceptable Use</h2>
            <ul>
              <li>Use the site lawfully and respectfully</li>
              <li>Do not attempt to disrupt, scrape, or abuse the service</li>
              <li>Do not republish full-site content for commercial use without permission</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>
              Original website content belongs to this site unless otherwise noted. Marvel Rivals-related assets,
              names, and trademarks belong to their respective owners.
            </p>

            <h2>5. Disclaimer</h2>
            <p>
              This is an unofficial fan project. We do not guarantee that all information is complete, current, or error-free.
              Use any guidance at your own discretion.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential losses
              resulting from use of this website.
            </p>

            <h2>7. External Services</h2>
            <p>
              Links to external websites (official game pages, social platforms, and community channels) are provided for
              convenience. We do not control those services.
            </p>

            <h2>8. Changes to Terms</h2>
            <p>
              We may update these terms at any time. Continued use after updates means you accept the revised terms.
            </p>

            <h2>9. Contact</h2>
            <p>
              Legal inquiries: <a href="mailto:legal@marvelrivalsbloodhunt.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">legal@marvelrivalsbloodhunt.wiki</a>
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
