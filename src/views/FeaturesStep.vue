<script setup lang="ts">
import OptionCard from '@/components/OptionCard.vue'
import { pricing } from '@/config/pricing'
import { useProjectStore } from '@/stores/project'

const store = useProjectStore()

function detail(feature: { hours: number; percent: number }) {
  return feature.percent > 0
    ? `+${Math.round(feature.percent * 100)}% op het totaal`
    : `+${feature.hours} uur`
}
</script>

<template>
  <fieldset>
    <legend class="mb-4 text-slate-700">Welke functies zijn nodig? Je kunt er meerdere kiezen.</legend>
    <div class="grid gap-3 sm:grid-cols-2">
      <OptionCard
        v-for="(feature, key) in pricing.features"
        :key="key"
        type="checkbox"
        name="features"
        :checked="store.project.features.includes(key)"
        @change="store.toggleFeature(key, $event)"
        :label="feature.label"
        :detail="detail(feature)"
      />
    </div>
  </fieldset>
</template>
