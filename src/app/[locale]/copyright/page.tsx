import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestrongestbattlegrounds.wiki'
  const path = '/copyright'

  return {
    title: 'Copyright Notice - The Strongest Battlegrounds Wiki',
    description: 'Copyright and intellectual property notice for The Strongest Battlegrounds Wiki.',
    robots: { index: false, follow: true },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function Copyright() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Copyright Notice</h1>
          <p className="text-slate-300 text-lg mb-2">Intellectual property and usage notice</p>
          <p className="text-slate-400 text-sm">Last Updated: May 17, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl prose prose-invert prose-slate max-w-none">
          <h2>1. Website Content</h2>
          <p>© 2026 The Strongest Battlegrounds Wiki. All rights reserved for original website content.</p>

          <h2>2. Game-Related Assets</h2>
          <p>
            The Strongest Battlegrounds and related assets are the property of their respective owners, including
            Yielding Arts and Roblox Corporation.
          </p>

          <h2>3. Fair Use</h2>
          <p>
            Referenced game assets are used for commentary, education, and community guide purposes.
          </p>

          <h2>4. DMCA Contact</h2>
          <p>
            Copyright claims can be sent to{' '}
            <a href="mailto:dmca@thestrongestbattlegrounds.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">dmca@thestrongestbattlegrounds.wiki</a>.
          </p>

          <div className="mt-10 pt-8 border-t border-border">
            <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">Back to Home</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
