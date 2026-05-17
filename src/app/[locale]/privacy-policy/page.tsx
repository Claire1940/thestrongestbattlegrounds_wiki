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
  const path = '/privacy-policy'

  return {
    title: 'Privacy Policy - The Strongest Battlegrounds Wiki',
    description: 'Privacy Policy for The Strongest Battlegrounds Wiki, including data usage, cookies, analytics, and user rights.',
    robots: { index: false, follow: true },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-300 text-lg mb-2">How we collect, use, and protect your information</p>
          <p className="text-slate-400 text-sm">Last Updated: May 17, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl prose prose-invert prose-slate max-w-none">
          <h2>1. Overview</h2>
          <p>
            The Strongest Battlegrounds Wiki is an unofficial fan-made website. This policy explains what data we collect
            and how it is used when you browse our pages.
          </p>

          <h2>2. Data We Collect</h2>
          <ul>
            <li>Basic technical information such as browser, device type, and approximate location.</li>
            <li>Usage information such as page views, session flow, and interaction events.</li>
            <li>Local preferences such as language and theme settings stored in your browser.</li>
          </ul>

          <h2>3. Cookies and Analytics</h2>
          <p>
            We may use cookies and similar storage technologies for analytics and site performance. You can disable cookies
            in browser settings, but some features may not work as expected.
          </p>

          <h2>4. External Links</h2>
          <p>
            Our site links to third-party platforms such as Roblox, Discord, YouTube, Reddit, and X. Their privacy
            practices are controlled by those platforms.
          </p>

          <h2>5. Children&apos;s Privacy</h2>
          <p>
            We do not knowingly collect personal information from children under 13. If you believe such data was
            submitted, contact us and we will review and remove it where appropriate.
          </p>

          <h2>6. Contact</h2>
          <p>
            For privacy requests, contact <a href="mailto:privacy@thestrongestbattlegrounds.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">privacy@thestrongestbattlegrounds.wiki</a>.
          </p>

          <div className="mt-10 pt-8 border-t border-border">
            <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">Back to Home</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
