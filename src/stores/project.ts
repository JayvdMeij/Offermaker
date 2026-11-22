import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { pricing, type Feature } from '@/config/pricing'
import { calculateQuote, type Project } from '@/lib/calculate'

export const useProjectStore = defineStore('project', () => {
  const project = reactive<Project>({
    siteType: 'business',
    pages: 5,
    features: [],
    deadline: 'normal',
  })

  const quote = computed(() => calculateQuote(project))

  function toggleFeature(feature: Feature, on: boolean) {
    const selected = new Set(project.features)
    if (on) selected.add(feature)
    else selected.delete(feature)
    // Keep the order of the pricing config, so the summary and PDF read consistently.
    project.features = (Object.keys(pricing.features) as Feature[]).filter((f) => selected.has(f))
  }

  return { project, quote, toggleFeature }
})
