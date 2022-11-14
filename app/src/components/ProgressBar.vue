<script lang="ts" setup>
withDefaults(defineProps<{
  value?: number
  bar?: number
  barClass?: string | string[] | Record<string, string>
}>(), {
  value: Math.random(),
  /** Bar count */
  bar: 1,
})
</script>

<template>
  <div class=":uno: h-3 flex gap-1">
    <div
      v-for="n in bar"
      :key="n"
      :data-debug="JSON.stringify([{ n, value, bar }, n / bar, value / bar])"
      class=":uno: grow relative bg-slate-300 overflow-hidden first:rounded-l last:rounded-r"
    >
      <!-- TODO: Fill all bar as like one bar -->
      <div
        class=":uno: absolute inset-y-0 left-0 bg-slate-500 rounded-inherit"
        :class="[barClass]"
        :style="{ width: `${(value) * 100}%` }"
      />
    </div>
  </div>
</template>
