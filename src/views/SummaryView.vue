<script setup lang="ts">
import { useProjectStore } from '@/stores/project'

const store = useProjectStore()
</script>

<template>
  <p>Totaal: {{ store.quote.hours }} uur</p>
</template>
