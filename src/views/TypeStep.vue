<script setup lang="ts">
import OptionCard from '@/components/OptionCard.vue'
import { pricing } from '@/config/pricing'
import { useProjectStore } from '@/stores/project'

const store = useProjectStore()
</script>

<template>
  <fieldset>
    <legend class="mb-4 text-slate-700">Wat voor website wordt het?</legend>
    <div class="grid gap-3 sm:grid-cols-2">
      <OptionCard
        v-for="(site, key) in pricing.siteTypes"
        :key="key"
        v-model="store.project.siteType"
        type="radio"
        name="siteType"
        :value="key"
        :label="site.label"
        :detail="`Basis ${site.baseHours} uur`"
      />
    </div>
  </fieldset>
</template>
