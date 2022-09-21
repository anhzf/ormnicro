<script lang="ts" setup>
const MAX_CAPACITY = 1500
const MAX_DAYS = 21 * 24 * 3600_000

const stats = reactive({
  startAt: new Date(2022, 8, 15),
  light: true,
  humidity: 0.89,
  temperature: 22.5,
  nozzleMode: 0,
  pH: 7.5,
  waterLevel: 0.36,
  capacity: 81,
})

// Max time are start time plus 21 days
const shouldEndAt = $computed(() => new Date(stats.startAt.getTime() + MAX_DAYS))

const _now = useNow()
// Computed values that return how many days, hours, minutes, seconds and progress percentage elapsed from startAt
const timeProgress = $computed(() => {
  const now = _now.value
  const diff = now.getTime() - stats.startAt.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  const percentage = Math.floor((diff / (shouldEndAt.getTime() - stats.startAt.getTime())) * 100)
  return { days, hours, minutes, seconds, percentage }
})
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex flex-col overflow-y-auto">
      <nav class="flex justify-between items-center px-6 pt-6 pb-4">
        <h1 class="text-xl text-#00C81F font-semibold">
          <router-link to="/">
            ORMNicro
          </router-link>
        </h1>

        <div class="flex items-center gap-4">
          <button
            aria-label="Open Notifications"
            class="p-2 rounded-full text-2xl text-slate-400 hover:bg-green-300/25 active:bg-green-300/50"
          >
            <div i-material-symbols:notifications-rounded />
          </button>

          <button
            aria-label="My Account Menu"
            class="p-2 rounded-full text-2xl text-slate-400 hover:bg-green-300/25 active:bg-green-300/50"
          >
            <div i-material-symbols:account-circle />
          </button>
        </div>
      </nav>

      <div class="flex flex-col gap-4 px-6">
        <header class="flex flex-col gap-10 px-4 py-6 bg-green-200 rounded-3xl">
          <div class="flex justify-between items-center">
            <button class="flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-green-300/25 active:bg-green-300/50">
              <div class="p-1 text-xs text-green-500">
                <div i-material-symbols:lens />
              </div>

              <span class="text-green-700 font-medium">
                Perangkat 1
              </span>

              <div i-material-symbols:arrow-drop-down class="text-base text-green-700" />
            </button>

            <div class="p-2">
              <div :aria-label="`Light status ${stats.light ? 'On' : 'Off'}`" i-material-symbols:light-mode class="text-2xl" :class="[stats.light ? 'text-orange-300' : 'text-slate-500']" />
            </div>
          </div>

          <div class="flex gap-4">
            <section class="grow flex gap-2">
              <div class="self-center p-2 text-2xl text-teal-300 bg-green-100 rounded-full">
                <div i-material-symbols:humidity-high />
              </div>
              <div class="flex flex-col">
                <h3 class="text-sm text-emerald-500 font-medium">
                  Kelembapan
                </h3>
                <div class="flex gap-2">
                  <span class="text-4xl text-teal-900 font-bold">
                    {{ stats.humidity * 100 }}
                  </span>
                  <span class="text-base text-green-500 font-semibold">
                    %
                  </span>
                </div>
              </div>
            </section>

            <section class="grow flex gap-2">
              <div class="self-center p-2 text-2xl text-red-300 bg-green-100 rounded-full">
                <div i-material-symbols:device-thermostat />
              </div>
              <div class="flex flex-col">
                <h3 class="text-sm text-emerald-500 font-medium">
                  Suhu
                </h3>
                <div class="flex gap-2">
                  <span class="text-4xl text-teal-900 font-bold">
                    {{ stats.temperature }}
                  </span>
                  <span class="text-base text-green-500 font-semibold">
                    ℃
                  </span>
                </div>
              </div>
            </section>
          </div>

          <section class="flex flex-col gap-2 pt-4 pb-6">
            <h3 class="text-sm text-emerald-500 font-medium">
              Usia Kompos
            </h3>

            <div class="flex gap-2">
              <span class="text-xs text-slate-500 font-medium">0h</span>
              <div class="grow relative bg-slate-300 rounded">
                <div class="absolute inset-0 bg-lime-500 rounded" :style="{ width: `${timeProgress.percentage}%` }" />
              </div>
              <span class="text-xs text-slate-500 font-medium">21h</span>
            </div>

            <div class="flex justify-center items-center gap-4">
              <span class="w-15ch text-base text-emerald-500 text-center font-medium">
                {{ timeProgress.days }}h {{ timeProgress.hours }}j {{ timeProgress.minutes }}m {{ timeProgress.seconds }}d
              </span>
              <button class="flex gap-1 px-2 py-1 bg-red-100/80 hover:bg-red-200/80 active:bg-red-300/80 text-red-500 text-sm rounded-lg">
                Stop
              </button>
            </div>
          </section>
        </header>

        <main class="flex flex-col gap-4">
          <section class="flex justify-between p-4 bg-teal-100 rounded-2xl">
            <h3 class="text-base text-slate-700 font-medium">
              Mode penyemprotan
            </h3>

            <select name="control_nozzleMode" class="text-green-800 font-medium bg-green-300 px-2 py-1 rounded-lg">
              <option value="0">
                Manual
              </option>
              <option value="1" selected>
                Auto
              </option>
            </select>
          </section>

          <div class="flex flex-col gap-4 py-2">
            <section class="flex flex-col">
              <div class="flex items-center gap-1 mb-2">
                <h3 class="text-lg text-slate-700 font-medium">
                  Skala pH
                </h3>
                <div i-material-symbols:help class="text-base text-slate-400" />
              </div>
              <!-- Create progress bar with 14 divided bars  -->
              <div class="h-3 flex gap-1">
                <div
                  v-for="n in 14"
                  :key="n"
                  class="grow relative bg-slate-300 overflow-hidden first:rounded-l last:rounded-r"
                >
                  <div
                    class="absolute inset-y-0 left-0 bg-teal-700 rounded-inherit"
                    :style="{ width: `${(stats.pH - Number(n)) * 100}%` }"
                  />
                </div>
              </div>
              <div class="flex justify-between text-slate-700">
                <span w-2ch>1</span>
                <span w-2ch>7</span>
                <span w-2ch>14</span>
              </div>
            </section>

            <section class="flex flex-col">
              <div class="flex items-center gap-1 mb-2">
                <h3 class="text-lg text-slate-700 font-medium">
                  Tingkatan Air
                </h3>
                <div i-material-symbols:help class="text-base text-slate-400" />
              </div>
              <div class="h-3 flex gap-1">
                <div
                  v-for="n in 4"
                  :key="n"
                  class="grow relative bg-slate-300 overflow-hidden first:rounded-l last:rounded-r"
                >
                  <div
                    class="absolute inset-y-0 left-0 bg-yellow-500 rounded-inherit"
                    :style="{ width: `${(stats.waterLevel) * 100}%` }"
                  />
                </div>
              </div>
              <div class="flex justify-between text-slate-700">
                <span w-4ch>0%</span>
                <span w-4ch>100%</span>
              </div>
            </section>

            <section class="flex flex-col">
              <div class="flex items-center gap-1 mb-2">
                <h3 class="text-lg text-slate-700 font-medium">
                  Kapasitas penampungan
                </h3>
                <div i-material-symbols:help class="text-base text-slate-400" />
              </div>
              <div class="h-3 flex gap-1">
                <div class="grow relative bg-slate-300 overflow-hidden first:rounded-l last:rounded-r">
                  <div
                    class="absolute inset-y-0 left-0 bg-green-500 rounded-inherit"
                    :style="{ width: `${(stats.capacity / MAX_CAPACITY) * 100}%` }"
                  />
                </div>
              </div>
              <div class="flex text-slate-700">
                <span>{{ stats.capacity }}/{{ MAX_CAPACITY }} Liter</span>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>

    <nav class="max-w-inherit bg-green-100 flex gap-4 px-4 py-3">
      <router-link
        :to="{ name: 'deviceId-compost' }"
        class="grow flex justify-center items-center gap-1 px-4 py-2 bg-emerald-200 text-lg text-emerald-700 font-medium rounded-full"
      >
        Kompos
      </router-link>
      <router-link
        :to="{ name: 'deviceId-magot' }"
        class="grow flex justify-center items-center gap-1 px-4 py-2 text-lg text-emerald-500 font-medium rounded-full"
      >
        Magot
      </router-link>
    </nav>
  </div>
</template>

