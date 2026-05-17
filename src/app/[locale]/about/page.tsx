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
  const path = '/about'

  return {
    title: 'About The Strongest Battlegrounds Wiki',
    description: 'About The Strongest Battlegrounds Wiki, an unofficial fan resource for Roblox players.',
    robots: { index: false, follow: true },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About The Strongest Battlegrounds Wiki</h1>
          <p className="text-slate-300 text-lg mb-2">An unofficial community guide hub for Roblox players</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl prose prose-invert prose-slate max-w-none">
          <h2>Our Mission</h2>
          <p>
            We maintain practical, updated guides for The Strongest Battlegrounds, including codes, tier lists,
            characters, combos, controls, and update tracking.
          </p>

          <h2>What We Cover</h2>
          <ul>
            <li>Codes and reward redemption updates</li>
            <li>Character and combo breakdowns</li>
            <li>Beginner and advanced battle tips</li>
            <li>Patch highlights and gameplay changes</li>
          </ul>

          <h2>Disclaimer</h2>
          <p>
            This site is unofficial and is not affiliated with Yielding Arts or Roblox Corporation.
          </p>

          <h2>Contact</h2>
          <p>
            Reach us at <a href="mailto:hello@thestrongestbattlegrounds.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">hello@thestrongestbattlegrounds.wiki</a>.
          </p>

          <div className="mt-10 pt-8 border-t border-border">
            <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">Back to Home</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
