import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { calculateQuote, type Project } from '@/lib/calculate'

export const useProjectStore = defineStore('project', () => {
  const project = reactive<Project>({
    siteType: 'business',
    pages: 5,
    features: [],
    deadline: 'normal',
  })

  const quote = computed(() => calculateQuote(project))

  return { project, quote }
})
