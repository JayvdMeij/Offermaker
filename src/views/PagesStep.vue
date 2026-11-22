<script setup lang="ts">
import { pricing } from '@/config/pricing'
import { clampPages } from '@/lib/calculate'
import { useProjectStore } from '@/stores/project'

const store = useProjectStore()

function normalize() {
  store.project.pages = clampPages(store.project.pages)
}
</script>

<template>
  <div>
    <label for="pages" class="mb-2 block text-slate-700">Hoeveel pagina's krijgt de website?</label>
    <input
      id="pages"
      v-model.number="store.project.pages"
      type="number"
      inputmode="numeric"
      :min="pricing.minPages"
      :max="pricing.maxPages"
      aria-describedby="pages-hint"
      class="w-32 rounded-lg border border-slate-500 bg-white px-3 py-2 text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
      @blur="normalize"
    />
    <p id="pages-hint" class="mt-2 text-sm text-slate-600">
      Tussen {{ pricing.minPages }} en {{ pricing.maxPages }} pagina's,
      {{ pricing.hoursPerPage }} uur per pagina.
    </p>
  </div>
</template>
