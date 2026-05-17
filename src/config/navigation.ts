import {
  BookOpen,
  Users,
  Swords,
  Clock3,
  Palette,
  SmilePlus,
  type LucideIcon,
} from 'lucide-react'

export interface NavigationItem {
	key: string
	path: string
	icon: LucideIcon
	isContentType: boolean
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
  {
    key: 'guide',
    path: '/guide',
    icon: BookOpen,
    isContentType: true,
  },
  {
    key: 'characters',
    path: '/characters',
    icon: Users,
    isContentType: true,
  },
  {
    key: 'combos',
    path: '/combos',
    icon: Swords,
    isContentType: true,
  },
  {
    key: 'updates',
    path: '/updates',
    icon: Clock3,
    isContentType: true,
  },
  {
    key: 'cosmetics',
    path: '/cosmetics',
    icon: Palette,
    isContentType: true,
  },
  {
    key: 'emotes',
    path: '/emotes',
    icon: SmilePlus,
    isContentType: true,
  },
]

export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map((item) =>
	item.path.slice(1),
)

export type ContentType = (typeof CONTENT_TYPES)[number]

export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
