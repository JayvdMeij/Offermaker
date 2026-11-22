import { createRouter, createWebHistory } from 'vue-router'
import TypeStep from '@/views/TypeStep.vue'
import PagesStep from '@/views/PagesStep.vue'
import FeaturesStep from '@/views/FeaturesStep.vue'
import DeadlineStep from '@/views/DeadlineStep.vue'
import SummaryView from '@/views/SummaryView.vue'

export const steps = [
  { path: '/type', title: 'Type website', component: TypeStep },
  { path: '/pages', title: "Pagina's", component: PagesStep },
  { path: '/features', title: 'Functies', component: FeaturesStep },
  { path: '/deadline', title: 'Deadline', component: DeadlineStep },
  { path: '/summary', title: 'Overzicht', component: SummaryView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/type' },
    ...steps.map((step) => ({ path: step.path, component: step.component })),
    { path: '/:pathMatch(.*)*', redirect: '/type' },
  ],
})

router.afterEach((to) => {
  const step = steps.find((s) => s.path === to.path)
  document.title = `${step?.title ?? 'Offerte'} – Offertecalculator Media van Meij`
})

export default router
