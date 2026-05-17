import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	// Supported locales
	locales: ['en', 'pt', 'es', 'id'],

	// Default locale
	defaultLocale: 'en',

	// URL prefix strategy: default locale without prefix
	localePrefix: 'as-needed',

	// Enable locale auto-detection
	localeDetection: true,
})

export type Locale = (typeof routing.locales)[number]
