"use client";

import { useState, Suspense, lazy } from "react";
import {
  BookOpen,
  Zap,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

const HeroStats = lazy(() => import("@/components/home/HeroStats"));

const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`} />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient({ latestArticles, locale }: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thestrongestbattlegrounds.wiki";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "The Strongest Battlegrounds Wiki",
        description:
          "Master The Strongest Battlegrounds with codes, character guides, tier lists, combos, controls, updates, and Roblox battle strategies.",
      },
      {
        "@type": "VideoGame",
        name: "The Strongest Battlegrounds",
        gamePlatform: ["PC", "Mobile", "Console"],
        applicationCategory: "Game",
        genre: ["Action", "Fighting", "Anime", "PvP"],
      },
    ],
  };

  const [faqExpanded, setFaqExpanded] = useState<number | null>(null);
  const mobileBannerAd = getPreferredMobileBannerSelection();

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ left: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside>
      <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ right: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </aside>

      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6">
              <Zap className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">{t.hero.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">{t.hero.title}</h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">{t.hero.description}</p>

            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("codes-and-kill-sound-ids")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)] text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://www.roblox.com/games/10449761463/The-Strongest-Battlegrounds"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 border border-border hover:bg-white/10 rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature videoId="DgZ_UV-xAZw" title="The Strongest Battlegrounds - Gameplay Showcase" />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="mx-auto w-full max-w-7xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title} <span className="text-[hsl(var(--nav-theme-light))]">{t.tools.titleHighlight}</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">{t.tools.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => (
              <button
                key={index}
                onClick={() => scrollToSection(card.sectionId)}
                className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              >
                <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                  <DynamicIcon name={card.icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
                </div>
                <h3 className="mb-1.5 text-sm md:text-base font-semibold">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={12} />

      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} className="md:hidden" />
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} className="hidden md:flex" />

      <section id="codes-and-kill-sound-ids" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.codesAndKillSoundIds.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.codesAndKillSoundIds.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.codesAndKillSoundIds.items.map((item: any, index: number) => (
              <article key={index} className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.14)] border border-[hsl(var(--nav-theme)/0.35)]">{item.status}</span>
                  <span className="text-xs text-muted-foreground">{item.lastChecked}</span>
                </div>
                <p className="font-mono text-sm mb-2">{item.code}</p>
                <h3 className="font-semibold mb-1">{item.reward}</h3>
                <p className="text-sm text-muted-foreground">{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} className="md:hidden" />
      <AdBanner type="banner-468x60" adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60} className="hidden md:flex" />

      <section id="beginner-guide" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.beginnerGuide.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.beginnerGuide.intro}</p>
          </div>
          <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
            {t.modules.beginnerGuide.steps.map((step: any, index: number) => (
              <div key={index} className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                  <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">{step.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="characters-and-movesets" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.charactersAndMovesets.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.charactersAndMovesets.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.charactersAndMovesets.items.map((item: any, index: number) => (
              <article key={index} className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <h3 className="font-semibold mb-2">{item.name}</h3>
                <p className="text-xs mb-2 text-[hsl(var(--nav-theme-light))]">{item.role}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="tier-list" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.tierList.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.tierList.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.modules.tierList.tiers.map((tier: any, index: number) => (
              <article key={index} className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <h3 className="font-bold mb-2 text-[hsl(var(--nav-theme-light))]">{tier.tier}</h3>
                <p className="text-sm mb-2">{tier.characters}</p>
                <p className="text-sm text-muted-foreground">{tier.reason}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="combos-and-techniques" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.combosAndTechniques.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.combosAndTechniques.intro}</p>
          </div>
          <div className="space-y-3 md:space-y-4">
            {t.modules.combosAndTechniques.steps.map((combo: any, index: number) => (
              <article key={index} className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <h3 className="font-semibold mb-2">{combo.name}</h3>
                <p className="text-sm text-muted-foreground">{combo.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {mobileBannerAd && <AdBanner type={mobileBannerAd.type} adKey={mobileBannerAd.adKey} className="md:hidden" />}

      <section id="updates-and-new-characters" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.updatesAndNewCharacters.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.updatesAndNewCharacters.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.updatesAndNewCharacters.items.map((item: any, index: number) => (
              <article key={index} className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <p className="text-xs text-muted-foreground mb-2">{item.date}</p>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="private-server-commands" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.privateServerCommands.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.privateServerCommands.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {t.modules.privateServerCommands.commands.map((item: any, index: number) => (
              <article key={index} className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <h3 className="font-semibold mb-2">{item.command}</h3>
                <p className="text-xs mb-2 text-[hsl(var(--nav-theme-light))]">{item.type}</p>
                <p className="text-sm text-muted-foreground">{item.effect}</p>
              </article>
            ))}
          </div>

          <div className="space-y-2">
            {t.modules.privateServerCommands.faqs.map((faq: any, index: number) => (
              <div key={index} className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setFaqExpanded(faqExpanded === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${faqExpanded === index ? "rotate-180" : ""}`} />
                </button>
                {faqExpanded === index && <div className="px-5 pb-5 text-muted-foreground text-sm">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cape-id-codes" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.capeIdCodes.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.capeIdCodes.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.capeIdCodes.items.map((item: any, index: number) => (
              <article key={index} className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <p className="font-mono text-sm mb-2">{item.code}</p>
                <h3 className="font-semibold mb-1">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
