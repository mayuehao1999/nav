export interface Site {
  name: string
  url: string
  description: string
  icon: string
  color: string
}

export interface Category {
  id: string
  name: string
  icon: string
  sites: Site[]
}

export interface SitesConfig {
  categories: Category[]
}
