# Offermaker – Quote calculator for Media van Meij

A small web app for putting together a website project step by step and getting a rough quote.

## What it does

A five-step wizard:

1. **Site type**: landing page, business website, portfolio or web application
2. **Pages**: number of pages (1–100)
3. **Features**: blog, CMS, webshop, multilingual (multiple choices)
4. **Deadline**: flexible (−5%), normal or rush (+25%)
5. **Summary**: your choices, an hour breakdown and a price indication, downloadable as a PDF

A live panel shows the estimated hours and price on every step and updates as you change your choices.

The UI is in Dutch. It is fully keyboard accessible: native form controls with labels and fieldsets, a skip link, focus moves to the step heading after each navigation, visible focus rings, and the live estimate is announced to screen readers (`aria-live`).

## How the estimate works

```
hours = base hours (site type)
      + pages × hours per page
      + fixed feature hours (blog, CMS, webshop)
      + percentage surcharges on that subtotal (multilingual +20%)
      + deadline adjustment on the total (flexible −5%, rush +25%)

price = hours × hourly rate (€75, excl. VAT)
```

Every line is rounded to whole hours, so the total always equals the sum of the lines.

**To change rates or hours, edit [`src/config/pricing.ts`](src/config/pricing.ts).** That is the only place they are defined.

## Stack

- [Vue 3](https://vuejs.org/) with TypeScript and `<script setup>`
- [Vite](https://vite.dev/)
- [Pinia](https://pinia.vuejs.org/) for the project state
- [Vue Router](https://router.vuejs.org/), with one route per wizard step
- [Tailwind CSS v4](https://tailwindcss.com/)
- [jsPDF](https://github.com/parallax/jsPDF) for the PDF download (loaded on demand)
- [Vitest](https://vitest.dev/) for unit tests

## Project structure

```
src/
  config/pricing.ts     rates, hours and labels
  lib/calculate.ts      pure quote calculation (+ calculate.test.ts)
  lib/pdf.ts            PDF generation
  lib/format.ts         euro formatting
  stores/project.ts     project choices and the computed quote
  router/index.ts       wizard steps and routes
  components/           OptionCard, EstimatePanel
  views/                one component per step
  App.vue               layout, step navigation, focus handling
```

## Running it

Requires Node.js 22.18+ or 24.12+.

```sh
npm install
npm run dev          # start the dev server
npm run test:unit    # run the unit tests (watch mode; use `npx vitest run` for a single run)
npm run build        # type-check and build for production into dist/
npm run preview      # serve the production build locally
```

The choices are kept in memory only, so refreshing the page starts over.
