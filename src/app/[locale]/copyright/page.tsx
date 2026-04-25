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
  const path = '/copyright'
  const title = `Copyright Notice - ${SITE_NAME}`
  const description =
    'Copyright and attribution policy for Marvel Rivals Blood Hunt fan guide website, including fair use and DMCA contact.'

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

export default function Copyright() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Copyright Notice</h1>
          <p className="text-slate-300 text-lg mb-2">Intellectual property and attribution policy</p>
          <p className="text-slate-400 text-sm">Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Site Content Ownership</h2>
            <p>
              Unless otherwise stated, original text and structure on {SITE_NAME} are owned by the site maintainers and
              protected by applicable copyright law.
            </p>

            <h2>2. Third-Party Game Assets</h2>
            <p>
              Marvel Rivals names, artwork, logos, and related properties belong to their respective rights holders.
              References on this site are used for informational, commentary, and fan-guide purposes.
            </p>

            <h2>3. Fair Use</h2>
            <p>
              We rely on fair-use style principles for educational and non-commercial coverage of gameplay systems,
              updates, and mode-specific mechanics.
            </p>

            <h2>4. Reporting Infringement</h2>
            <p>
              If you believe material on this site infringes your copyright, contact us with the URL, claimed work,
              and ownership details so we can review promptly.
            </p>

            <h2>5. DMCA Contact</h2>
            <p>
              DMCA requests: <a href="mailto:dmca@marvelrivalsbloodhunt.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">dmca@marvelrivalsbloodhunt.wiki</a>
            </p>

            <h2>6. Attribution Guidelines</h2>
            <ul>
              <li>Link back to the original page when quoting site content</li>
              <li>Do not republish full guides as your own work</li>
              <li>Keep trademark references accurate and non-misleading</li>
            </ul>
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
