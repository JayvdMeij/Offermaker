<script setup lang="ts">
import { computed } from 'vue'
import { pricing } from '@/config/pricing'
import { formatEuro } from '@/lib/format'
import { useProjectStore } from '@/stores/project'

const store = useProjectStore()

const choices = computed(() => {
  const { siteType, pages, features, deadline } = store.project
  return [
    { label: 'Type website', value: pricing.siteTypes[siteType].label },
    { label: "Pagina's", value: String(pages) },
    {
      label: 'Functies',
      value: features.length ? features.map((f) => pricing.features[f].label).join(', ') : 'Geen',
    },
    { label: 'Deadline', value: pricing.deadlines[deadline].label },
  ]
})
</script>

<template>
  <div class="space-y-8">
    <section aria-labelledby="choices-title">
      <h2 id="choices-title" class="mb-3 text-lg font-semibold">Jouw keuzes</h2>
      <dl class="grid gap-x-6 gap-y-2 sm:grid-cols-[auto_1fr]">
        <template v-for="choice in choices" :key="choice.label">
          <dt class="text-slate-600">{{ choice.label }}</dt>
          <dd class="font-medium">{{ choice.value }}</dd>
        </template>
      </dl>
    </section>

    <section aria-labelledby="breakdown-title">
      <h2 id="breakdown-title" class="mb-3 text-lg font-semibold">Opbouw</h2>
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-slate-300 text-sm text-slate-600">
            <th scope="col" class="py-2 font-medium">Onderdeel</th>
            <th scope="col" class="py-2 text-right font-medium">Uren</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="line in store.quote.lines" :key="line.label" class="border-b border-slate-200">
            <td class="py-2">{{ line.label }}</td>
            <td class="py-2 text-right tabular-nums">{{ line.hours }}</td>
          </tr>
        </tbody>
        <tfoot class="font-semibold">
          <tr>
            <th scope="row" class="pt-3">Totaal uren</th>
            <td class="pt-3 text-right tabular-nums">{{ store.quote.hours }}</td>
          </tr>
          <tr>
            <th scope="row">Prijsindicatie (excl. btw, {{ formatEuro(pricing.hourlyRate) }}/uur)</th>
            <td class="text-right tabular-nums">{{ formatEuro(store.quote.price) }}</td>
          </tr>
        </tfoot>
      </table>
    </section>
  </div>
</template>
