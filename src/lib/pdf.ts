import { pricing } from '@/config/pricing'
import type { Project, Quote } from './calculate'
import { formatEuro } from './format'

// jsPDF is loaded on demand so it doesn't weigh down the wizard itself.
export async function downloadQuotePdf(project: Project, quote: Quote): Promise<void> {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF()
  const left = 20
  const right = 190
  let y = 25

  doc.setFont('helvetica', 'bold').setFontSize(18)
  doc.text('Media van Meij', left, y)
  doc.setFont('helvetica', 'normal').setFontSize(11)
  doc.text(`Offerte-indicatie – ${new Date().toLocaleDateString('nl-NL')}`, left, (y += 8))

  y += 14
  doc.setFont('helvetica', 'bold').setFontSize(13)
  doc.text('Keuzes', left, y)
  doc.setFont('helvetica', 'normal').setFontSize(11)
  const features = project.features.map((f) => pricing.features[f].label).join(', ') || 'Geen'
  const choices = [
    ['Type website', pricing.siteTypes[project.siteType].label],
    ["Pagina's", String(project.pages)],
    ['Functies', features],
    ['Deadline', pricing.deadlines[project.deadline].label],
  ]
  for (const [label, value] of choices) {
    y += 7
    doc.text(`${label}:`, left, y)
    doc.text(value!, left + 40, y)
  }

  y += 14
  doc.setFont('helvetica', 'bold').setFontSize(13)
  doc.text('Opbouw', left, y)
  doc.setFontSize(11)
  y += 8
  doc.text('Onderdeel', left, y)
  doc.text('Uren', right, y, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.line(left, y + 2, right, y + 2)
  for (const line of quote.lines) {
    y += 8
    doc.text(line.label, left, y)
    doc.text(String(line.hours), right, y, { align: 'right' })
  }
  doc.line(left, y + 3, right, y + 3)

  y += 10
  doc.setFont('helvetica', 'bold')
  doc.text('Totaal uren', left, y)
  doc.text(String(quote.hours), right, y, { align: 'right' })
  y += 8
  doc.text(`Prijsindicatie (excl. btw, ${formatEuro(pricing.hourlyRate)}/uur)`, left, y)
  doc.text(formatEuro(quote.price), right, y, { align: 'right' })

  y += 16
  doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(100)
  const disclaimer =
    'Dit is een indicatie op basis van een schatting; aan deze berekening kunnen geen rechten worden ontleend.'
  doc.text(doc.splitTextToSize(disclaimer, right - left), left, y)

  doc.save('offerte-media-van-meij.pdf')
}
