<script lang="ts" setup>
const MAX_DAYS = 30

const stats = reactive({
  startAt: new Date(2022, 9, 15),
  isOnline: true,
  light: true,
  humidity: 0.89,
  temperature: 22.5,
  nozzleMode: 0,
  lumix: 4.2,
  waterLevel: 0.36,
})
</script>

<template>
  <div>
    <section class="flex flex-col gap-2 p-4">
      <stats-highlight-card
        device-name="Perangkat 1"
        :session-start-at="stats.startAt"
        :is-device-online="stats.isOnline"
        :is-light-on="stats.light"
        :max-days="MAX_DAYS"
        :parameters="[
          {
            label: 'Kelembapan',
            value: stats.humidity * 100,
            suffix: '%',
            icon: 'i-material-symbols:humidity-high',
            iconClass: 'text-teal-300',
          },
          {
            label: 'Suhu',
            value: stats.temperature,
            suffix: '℃',
            icon: 'i-material-symbols:device-thermostat',
            iconClass: 'text-red-300',
          },
          {
            label: 'Pencahayaan',
            value: stats.light ? 'ON' : 'OFF',
            suffix: '',
            icon: 'i-material-symbols:light-mode',
            iconClass: 'text-yellow-300',
          },
        ]"
      />
    </section>

    <main class="flex flex-col">
      <!-- Controllable -->
      <div class="p-4">
        <section class="flex justify-between items-center p-4 bg-teal-200 rounded-2xl shadow-sm">
          <h3 class="text-base text-$bw-strong font-medium">
            Mode penyemprotan
          </h3>

          <!-- TODO: show select actions -->
          <button class="btn btn--slate btn--with-icon-r btn--dense">
            <span>Auto</span>
            <i class="btn__icon i-material-symbols:expand-more" />
          </button>
        </section>
      </div>

      <div class="stats">
        <section>
          <div class="flex flex-col gap-2">
            <h3 class="label">
              Lumix
            </h3>
            <progress-bar :value="stats.lumix / 14" :bar="10" bar-class="bg-yellow-300" />
          </div>
          <div class="flex text-$bw-strong">
            <span class="w-2ch">1</span>
            <div class="grow" />
            <span class="w-2ch">10</span>
          </div>
        </section>

        <section>
          <div class="flex flex-col gap-2">
            <h3 class="label">
              Tingkatan Air
            </h3>
            <progress-bar :value="stats.waterLevel" :bar="4" bar-class="bg-blue-300" />
          </div>
          <div class="flex text-$bw-strong">
            <span class="w-4ch">0%</span>
            <div class="grow" />
            <span class="w-4ch">100%</span>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
