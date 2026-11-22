// All prices and hour estimates live here. Adjust these to change the calculator.

export type SiteType = 'landing' | 'business' | 'portfolio' | 'webapp'
export type Feature = 'blog' | 'multilingual' | 'webshop' | 'cms'
export type Deadline = 'flexible' | 'normal' | 'rush'

export const pricing = {
  hourlyRate: 75,
  hoursPerPage: 4,
  minPages: 1,
  maxPages: 100,

  siteTypes: {
    landing: { label: 'Landingspagina', baseHours: 12 },
    business: { label: 'Bedrijfswebsite', baseHours: 24 },
    portfolio: { label: 'Portfolio', baseHours: 16 },
    webapp: { label: 'Webapplicatie', baseHours: 60 },
  } satisfies Record<SiteType, { label: string; baseHours: number }>,

  // `hours` is a fixed addition, `percent` is a surcharge on the subtotal (0.2 = +20%).
  features: {
    blog: { label: 'Blog', hours: 12, percent: 0 },
    cms: { label: 'CMS', hours: 16, percent: 0 },
    webshop: { label: 'Webshop', hours: 40, percent: 0 },
    multilingual: { label: 'Meertalig', hours: 0, percent: 0.2 },
  } satisfies Record<Feature, { label: string; hours: number; percent: number }>,

  deadlines: {
    flexible: { label: 'Flexibel (−5%)', multiplier: 0.95 },
    normal: { label: 'Normaal', multiplier: 1 },
    rush: { label: 'Spoed (+25%)', multiplier: 1.25 },
  } satisfies Record<Deadline, { label: string; multiplier: number }>,
}
