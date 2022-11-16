<script lang="ts" setup>
interface Parameter {
  label: string
  value: number
  suffix?: string
  icon: string
  iconClass?: string
}

const props = withDefaults(defineProps<{
  deviceName: string
  sessionStartAt: Date
  isDeviceOnline?: boolean
  isLightOn?: boolean
  maxDays: number
  parameters?: Parameter[]
}>(), {
  parameters: () => [],
})

defineEmits<{
  (e: 'requestStopSession'): void
}>()

// Max time are start time plus 21 days
const shouldEndAt = $computed(() => new Date(props.sessionStartAt.getTime() + props.maxDays * 24 * 3600_000))

const _now = useNow()
// Computed values that return how many days, hours, minutes, seconds and progress percentage elapsed from startAt
const timeProgress = $computed(() => {
  const now = _now.value
  const diff = now.getTime() - props.sessionStartAt.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  const percentage = diff / (shouldEndAt.getTime() - props.sessionStartAt.getTime())
  return { days, hours, minutes, seconds, percentage }
})
</script>

<template>
  <header class="flex flex-col gap-10 px-4 py-6 bg-green-200 rounded-3xl">
    <div class="flex justify-between items-center">
      <button class="flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-green-300/25 active:bg-green-300/50">
        <div class="p-1 text-xs" :class="[isDeviceOnline ? 'text-green-500' : 'text-red-500']">
          <div i-material-symbols:lens />
        </div>

        <span class="text-green-700 font-medium">
          {{ deviceName }}
        </span>

        <div i-material-symbols:arrow-drop-down class="text-base text-green-700" />
      </button>

      <div class="p-2">
        <div :aria-label="`Light status ${isLightOn ? 'On' : 'Off'}`" i-material-symbols:light-mode class="text-2xl" :class="[isLightOn ? 'text-orange-300' : 'text-slate-500']" />
      </div>
    </div>

    <div class="flex flex-wrap gap-4">
      <section v-for="param in parameters" :key="param.label" class="grow flex gap-2">
        <div class=":uno: self-center p-2 text-2xl text-teal-300 bg-green-100 rounded-full" :class="[param.iconClass]">
          <div :class="param.icon" />
        </div>
        <div class="flex flex-col">
          <h3 class="text-base text-emerald-500 font-medium">
            {{ param.label }}
          </h3>
          <div class="flex gap-2">
            <span class="text-4xl text-teal-900 font-bold">
              {{ param.value }}
            </span>
            <span class="text-base text-green-500 font-semibold">
              {{ param.suffix }}
            </span>
          </div>
        </div>
      </section>
    </div>

    <section class="flex flex-col gap-2 pt-4 pb-6">
      <h3 class="text-base text-emerald-500 font-medium">
        Usia Kompos
      </h3>

      <div class="flex gap-2">
        <span class="text-xs text-slate-500 font-medium">0h</span>
        <progress-bar :value="timeProgress.percentage" class="grow" bar-class="bg-lime-500" />
        <span class="text-xs text-slate-500 font-medium">{{ maxDays }}h</span>
      </div>

      <div class="flex justify-center items-center gap-4">
        <span class="w-15ch text-base text-emerald-500 text-center font-medium">
          {{ timeProgress.days }}h {{ timeProgress.hours }}j {{ timeProgress.minutes }}m {{ timeProgress.seconds }}d
        </span>
        <button
          class="flex gap-1 px-2 py-1 bg-red-100/80 hover:bg-red-200/80 active:bg-red-300/80 text-red-500 text-sm rounded-lg"
          @click="$emit('requestStopSession')"
        >
          Stop
        </button>
      </div>
    </section>
  </header>
</template>
