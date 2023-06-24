<script lang="ts" setup>
interface Parameter {
  label: string
  value: number | string
  suffix?: string
  icon: string
  iconClass?: string
}

interface Props {
  sessionStartAt: Date
  isDeviceOnline?: boolean
  isLightOn?: boolean
  maxDays: number
  parameters?: Parameter[]
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  parameters: () => [],
})

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
  <header class="flex items-center bg-$primary-surface p-6 rounded-2xl shadow-md">
    <section v-if="loading">
      <span class="text-4xl text-$on-primary-surface font-semibold">Loading data...</span>
    </section>

    <section v-else class="flex flex-col">
      <div>
        <span class="text-4xl text-$on-primary-surface font-semibold">{{ timeProgress.days }} hari</span>
        <span class="text-base text-$primary-weak font-semibold">/ {{ maxDays }}h</span>
      </div>
      <div class="flex">
        <span class="w-full text-base text-green-100 font-semibold text-left">{{ timeProgress.hours }}j</span>
        <span class="w-full text-base text-green-100 font-semibold text-center">{{ timeProgress.minutes }}m</span>
        <span class="w-full text-base text-green-100 font-semibold text-right">{{ timeProgress.seconds }}d</span>
      </div>
    </section>

    <div class="grow" />

    <div class="flex flex-col gap-4 justify-end">
      <section v-if="loading">
        <span class="text-xl text-$on-primary-surface text-right font-bold">Loading data...</span>
      </section>

      <section v-for="param in parameters" v-else :key="param.label" class="flex justify-end gap-2">
        <div class="flex flex-col">
          <h2 class="flex justify-end items-center gap-1">
            <div class=":uno: text-lg text-teal-300" :class="[param.icon, param.iconClass]" />
            <span class="text-sm text-green-100 font-semibold">
              {{ param.label }}
            </span>
          </h2>
          <p class="text-xl text-$on-primary-surface text-right font-bold">
            {{ param.value }}
            {{ param.suffix }}
          </p>
        </div>
      </section>
    </div>
  </header>
</template>
