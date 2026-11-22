<script setup lang="ts">
import { formatEuro } from '@/lib/format'
import { useProjectStore } from '@/stores/project'

const store = useProjectStore()
</script>

<template>
  <aside
    aria-labelledby="estimate-title"
    class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-8"
  >
    <h2 id="estimate-title" class="text-sm font-semibold uppercase tracking-wide text-slate-600">
      Live schatting
    </h2>
    <!-- aria-live announces the new estimate when a choice changes it. -->
    <dl aria-live="polite" aria-atomic="true" class="mt-4 space-y-3">
      <div>
        <dt class="text-sm text-slate-600">Uren</dt>
        <dd class="text-3xl font-bold tabular-nums text-slate-900">{{ store.quote.hours }} uur</dd>
      </div>
      <div>
        <dt class="text-sm text-slate-600">Prijsindicatie (excl. btw)</dt>
        <dd class="text-3xl font-bold tabular-nums text-indigo-700">
          {{ formatEuro(store.quote.price) }}
        </dd>
      </div>
    </dl>
  </aside>
</template>
