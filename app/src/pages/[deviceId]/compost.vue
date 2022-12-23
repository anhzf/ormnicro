<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import useCompostParameters from '~/composables/use-device'

const MAX_CAPACITY = 1500
const MAX_DAYS = 21

const deviceId = inject<ComputedRef<string>>('deviceId')

const stats = useCompostParameters(deviceId.value)
</script>

<template>
  <div>
    <template v-if="stats">
      <section class="flex flex-col gap-2 p-4">
        <stats-highlight-card
          device-name="Perangkat 1"
          :session-start-at="stats.startAt"
          :is-device-online="stats.isOnline"
          :is-light-on="stats.isLightOn"
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
              value: stats.isLightOn ? 'ON' : 'OFF',
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

        <!-- Stats details -->
        <div class="stats">
          <section>
            <div class="flex flex-col gap-2">
              <h3 class="label">
                Skala pH
              </h3>
              <progress-bar :value="stats.pH / 14" :bar="14" bar-class="bg-teal-700" />
            </div>
            <div class="flex text-$bw-strong">
              <span class="w-2ch">1</span>
              <div class="grow" />
              <span class="w-2ch">7</span>
              <div class="grow" />
              <span class="w-2ch">14</span>
            </div>
          </section>

          <section>
            <div class="flex flex-col gap-2">
              <h3 class="label">
                Tingkatan Air
              </h3>
              <progress-bar :value="stats.waterLevel" :bar="4" bar-class="bg-yellow-500" />
            </div>
            <div class="flex text-$bw-strong">
              <span class="w-4ch">0%</span>
              <div class="grow" />
              <span class="w-4ch">100%</span>
            </div>
          </section>

          <section>
            <div class="flex flex-col gap-2">
              <h3 class="label">
                Kapasitas penampungan
              </h3>
              <progress-bar :value="stats.capacity / MAX_CAPACITY" bar-class="bg-green-500" />
            </div>
            <div class="flex text-$bw-strong">
              <span>{{ stats.capacity }}/{{ MAX_CAPACITY }} Liter</span>
            </div>
          </section>
        </div>
      </main>
    </template>

    <p v-else class="text-center">
      Loading data...
    </p>
  </div>
</template>
