import { pricing, type Deadline, type Feature, type SiteType } from '@/config/pricing'

export interface Project {
  siteType: SiteType
  pages: number
  features: Feature[]
  deadline: Deadline
}

export interface QuoteLine {
  label: string
  hours: number
}

export interface Quote {
  lines: QuoteLine[]
  hours: number
  price: number
}

export function clampPages(pages: number): number {
  if (!Number.isFinite(pages)) return pricing.minPages
  return Math.min(pricing.maxPages, Math.max(pricing.minPages, Math.round(pages)))
}

export function calculateQuote(project: Project, config = pricing): Quote {
  const site = config.siteTypes[project.siteType]
  const pages = clampPages(project.pages)
  const lines: QuoteLine[] = [
    { label: `Basis: ${site.label}`, hours: site.baseHours },
    { label: `${pages} pagina's × ${config.hoursPerPage} uur`, hours: pages * config.hoursPerPage },
  ]

  const selected = [...new Set(project.features)].map((f) => config.features[f])
  for (const feature of selected) {
    if (feature.hours > 0) lines.push({ label: feature.label, hours: feature.hours })
  }

  // Percentage surcharges apply to the subtotal of fixed hours.
  const subtotal = sum(lines)
  for (const feature of selected) {
    if (feature.percent > 0) {
      lines.push({
        label: `${feature.label} (+${Math.round(feature.percent * 100)}%)`,
        hours: Math.round(subtotal * feature.percent),
      })
    }
  }

  const deadline = config.deadlines[project.deadline]
  if (deadline.multiplier !== 1) {
    lines.push({
      label: `Deadline: ${deadline.label}`,
      hours: Math.round(sum(lines) * (deadline.multiplier - 1)),
    })
  }

  const hours = sum(lines)
  return { lines, hours, price: hours * config.hourlyRate }
}

function sum(lines: QuoteLine[]): number {
  return lines.reduce((total, line) => total + line.hours, 0)
}
