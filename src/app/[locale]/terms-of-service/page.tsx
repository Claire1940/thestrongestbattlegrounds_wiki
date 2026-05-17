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
  const path = '/terms-of-service'

  return {
    title: 'Terms of Service - The Strongest Battlegrounds Wiki',
    description: 'Terms of Service for The Strongest Battlegrounds Wiki, including acceptable use and legal disclaimers.',
    robots: { index: false, follow: true },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-300 text-lg mb-2">Rules and responsibilities for using this website</p>
          <p className="text-slate-400 text-sm">Last Updated: May 17, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl prose prose-invert prose-slate max-w-none">
          <h2>1. Acceptance</h2>
          <p>By using The Strongest Battlegrounds Wiki, you agree to these terms.</p>

          <h2>2. Service Scope</h2>
          <p>
            This is an unofficial fan resource for The Strongest Battlegrounds on Roblox. Content is provided for
            informational purposes only.
          </p>

          <h2>3. Acceptable Use</h2>
          <ul>
            <li>Do not abuse, attack, or scrape the site with harmful automation.</li>
            <li>Do not repost website content as your own without attribution.</li>
            <li>Do not upload unlawful, harmful, or infringing material.</li>
          </ul>

          <h2>4. No Warranty</h2>
          <p>
            We provide content on an &quot;as-is&quot; basis. Game updates may make guides outdated at any time.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            We are not liable for losses or damages resulting from use of this website or reliance on website content.
          </p>

          <h2>6. Contact</h2>
          <p>
            Questions about these terms can be sent to{' '}
            <a href="mailto:legal@thestrongestbattlegrounds.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">legal@thestrongestbattlegrounds.wiki</a>.
          </p>

          <div className="mt-10 pt-8 border-t border-border">
            <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">Back to Home</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
