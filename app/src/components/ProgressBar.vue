<script lang="ts" setup>
const props = withDefaults(defineProps<{
  value?: number
  bar?: number
  barClass?: string | string[] | Record<string, string>
}>(), {
  value: Math.random(),
  /** Bar count */
  bar: 1,
})

/** TODO: Refactor into using Array Function */
const bars = computed(() => {
  const temp = []
  const difference = []
  const bar = Array.from({ length: props.bar })

  for (let i = props.value; i >= 0; i -= (1 / props.bar))
    temp.push(i)

  temp.push(0)
  for (let j = 0; j < temp.length; j++)
    difference.push(temp[j] - temp[j + 1])

  difference.pop()

  for (let j = 0; j < bar.length; j++) {
    bar[j] = difference[j]
    if (bar[j] === undefined)
      bar[j] = 0
  }

  return bar as number[]
})
</script>

<template>
  <div class="h-3 flex gap-1">
    <div
      v-for="(n, i) in bars"
      :key="i"
      class="grow relative bg-slate-300 overflow-hidden first:rounded-l-lg last:rounded-r-lg shadow-inner"
    >
      <div
        class=":uno: absolute inset-y-0 left-0 text-base bg-slate-500 rounded-sm"
        :class="[barClass]"
        :style="{ width: `${n * bar * 100}%` }"
      />
    </div>
  </div>
</template>
