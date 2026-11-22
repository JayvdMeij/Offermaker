<script setup lang="ts">
// A native radio or checkbox styled as a card. The input itself stays focusable.
defineProps<{
  type: 'radio' | 'checkbox'
  name: string
  checked: boolean
  label: string
  detail?: string
}>()
defineEmits<{ change: [checked: boolean] }>()
</script>

<template>
  <label
    class="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-300 bg-white p-4 hover:border-indigo-500 has-checked:border-indigo-600 has-checked:bg-indigo-50 has-focus-visible:ring-2 has-focus-visible:ring-indigo-600 has-focus-visible:ring-offset-2"
  >
    <input
      :type="type"
      :name="name"
      :checked="checked"
      class="mt-1 h-4 w-4 shrink-0 accent-indigo-600 focus:outline-none"
      @change="$emit('change', ($event.target as HTMLInputElement).checked)"
    />
    <span>
      <span class="block font-medium text-slate-900">{{ label }}</span>
      <span v-if="detail" class="block text-sm text-slate-600">{{ detail }}</span>
    </span>
  </label>
</template>
