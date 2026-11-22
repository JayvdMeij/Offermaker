<script setup lang="ts">
import OptionCard from '@/components/OptionCard.vue'
import { pricing } from '@/config/pricing'
import { useProjectStore } from '@/stores/project'

const store = useProjectStore()
</script>

<template>
  <fieldset>
    <legend class="mb-4 text-slate-700">Hoe snel moet het af?</legend>
    <div class="grid gap-3 sm:grid-cols-3">
      <OptionCard
        v-for="(deadline, key) in pricing.deadlines"
        :key="key"
        v-model="store.project.deadline"
        type="radio"
        name="deadline"
        :value="key"
        :label="deadline.label"
      />
    </div>
  </fieldset>
</template>
