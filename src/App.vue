<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { steps } from '@/router'
import EstimatePanel from '@/components/EstimatePanel.vue'

const route = useRoute()
const heading = ref<HTMLHeadingElement>()

const index = computed(() => Math.max(0, steps.findIndex((s) => s.path === route.path)))
const current = computed(() => steps[index.value]!)
const previous = computed(() => steps[index.value - 1])
const next = computed(() => steps[index.value + 1])

// Move focus to the step heading after navigating, so screen readers announce the new step.
watch(
  () => route.path,
  async (_path, oldPath) => {
    if (!oldPath) return
    await nextTick()
    heading.value?.focus()
  },
)
</script>

<template>
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-white focus:px-4 focus:py-2"
  >
    Naar de inhoud
  </a>

  <div class="mx-auto max-w-5xl px-4 py-8">
    <header class="mb-8">
      <p class="text-sm font-semibold uppercase tracking-wide text-indigo-700">Media van Meij</p>
      <p class="text-2xl font-bold text-slate-900">Offertecalculator</p>
    </header>

    <nav aria-label="Stappen" class="mb-8">
      <ol class="flex flex-wrap gap-2">
        <li v-for="(step, i) in steps" :key="step.path">
          <RouterLink
            :to="step.path"
            aria-current-value="step"
            class="block rounded-full border px-3 py-1 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
            :class="
              i === index
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-500'
            "
          >
            <span class="sr-only">Stap </span>{{ i + 1 }}. {{ step.title }}
          </RouterLink>
        </li>
      </ol>
    </nav>

    <div class="grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-start">
    <main id="main">
      <h1 ref="heading" tabindex="-1" class="mb-6 text-3xl font-bold text-slate-900 focus:outline-none">
        {{ current.title }}
      </h1>

      <RouterView />

      <div class="mt-8 flex justify-between gap-4">
        <RouterLink
          v-if="previous"
          :to="previous.path"
          class="rounded-lg border border-slate-400 bg-white px-5 py-2 font-medium text-slate-800 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
        >
          ← Vorige<span class="sr-only">: {{ previous.title }}</span>
        </RouterLink>
        <span v-else></span>
        <RouterLink
          v-if="next"
          :to="next.path"
          class="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
        >
          Volgende<span class="sr-only">: {{ next.title }}</span> →
        </RouterLink>
      </div>
    </main>

    <EstimatePanel />
    </div>
  </div>
</template>
