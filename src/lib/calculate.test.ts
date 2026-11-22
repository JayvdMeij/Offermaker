import { describe, expect, it } from 'vitest'
import { calculateQuote, clampPages, type Project } from './calculate'
import { pricing } from '@/config/pricing'

const base: Project = { siteType: 'business', pages: 5, features: [], deadline: 'normal' }

describe('calculateQuote', () => {
  it('calculates base hours plus pages without features', () => {
    const quote = calculateQuote(base)
    expect(quote.hours).toBe(24 + 5 * 4)
    expect(quote.price).toBe(44 * pricing.hourlyRate)
    expect(quote.lines).toHaveLength(2)
  })

  it('adds fixed feature hours', () => {
    const quote = calculateQuote({ ...base, features: ['blog', 'cms'] })
    expect(quote.hours).toBe(44 + 12 + 16)
  })

  it('ignores duplicate features', () => {
    const quote = calculateQuote({ ...base, features: ['blog', 'blog'] })
    expect(quote.hours).toBe(44 + 12)
  })

  it('applies the multilingual surcharge to the subtotal', () => {
    const quote = calculateQuote({ ...base, features: ['multilingual', 'blog'] })
    // subtotal 56, +20% = 11.2 -> 11
    expect(quote.hours).toBe(56 + 11)
  })

  it('applies a rush surcharge after other lines', () => {
    const quote = calculateQuote({ ...base, deadline: 'rush' })
    expect(quote.hours).toBe(44 + 11)
  })

  it('applies a flexible deadline discount', () => {
    const quote = calculateQuote({ ...base, deadline: 'flexible' })
    expect(quote.hours).toBe(44 - 2)
  })

  it('keeps the total equal to the sum of the lines', () => {
    const quote = calculateQuote({
      siteType: 'webapp',
      pages: 17,
      features: ['blog', 'webshop', 'cms', 'multilingual'],
      deadline: 'rush',
    })
    const sum = quote.lines.reduce((t, l) => t + l.hours, 0)
    expect(quote.hours).toBe(sum)
    expect(Number.isInteger(quote.hours)).toBe(true)
  })

  it('clamps the page count to the allowed range', () => {
    expect(calculateQuote({ ...base, pages: 0 }).hours).toBe(24 + 4)
    expect(calculateQuote({ ...base, pages: 500 }).hours).toBe(24 + pricing.maxPages * 4)
  })
})

describe('clampPages', () => {
  it('rounds and clamps values', () => {
    expect(clampPages(3.6)).toBe(4)
    expect(clampPages(-2)).toBe(pricing.minPages)
    expect(clampPages(Number.NaN)).toBe(pricing.minPages)
    expect(clampPages(1000)).toBe(pricing.maxPages)
  })
})
