<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
let showDeviceSelector = $ref(false)
let showDeviceAdder = $ref(false)

/** @todo Check to server if current deviceId is available */
const isDeviceAvailable = () => route.params.deviceId === '<select-device>'

const addDevice = () => {
  showDeviceAdder = false
  showDeviceSelector = false
}

onMounted(() => {
  if (isDeviceAvailable())
    showDeviceSelector = true
  else
    router.replace({ name: 'deviceId-compost' })
})
</script>

<template>
  <div class="layout">
    <div class="grow flex flex-col overflow-y-scroll">
      <nav class="flex items-center gap-4 px-6 py-5">
        <router-link to="/" class="btn btn--icon btn--flat">
          <div class="btn__icon i-material-symbols:arrow-back-ios-new" />
        </router-link>

        <h1 class="text-xl text-$primary-xstrong font-semibold">
          Monitoring
        </h1>

        <div class="grow" />

        <div class="flex items-center gap-4">
          <button class="btn btn--unelevated btn--secondary btn--with-icon-r group" @click="showDeviceSelector = true">
            <span>Perangkat 1</span>
            <div class="btn__icon i-material-symbols:expand-more group-focus:rotate-180 transition-transform" />
          </button>
        </div>
      </nav>

      <router-view />
    </div>

    <nav class="bottom-navigation">
      <router-link
        :to="{ name: 'deviceId-compost' }"
        class="btn btn--flat btn--rounded item"
      >
        Kompos
      </router-link>
      <router-link
        :to="{ name: 'deviceId-magot' }"
        class="btn btn--flat btn--rounded item"
      >
        Magot
      </router-link>
    </nav>
  </div>

  <teleport to="body">
    <transition>
      <div v-show="showDeviceSelector" class="modal">
        <div class="modal__overlay" @click="showDeviceSelector = false" />
        <div class="modal__content w-full">
          <div class="modal__header">
            <h2 class="text-lg text-$primary-strong font-semibold">
              Pilih Perangkat
            </h2>
          </div>

          <label class="form-control flex items-center gap-4 bg-green-100 hover:bg-green-200 px-3 py-4 rounded-t border-b-2 border-inset border-$primary-outline focus-within:border-$primary transition">
            <div class="i-material-symbols:search text-2xl text-$primary" />
            <input
              type="text"
              class="form-control__input w-full bg-transparent text-$bw valid:text-$bw-xstrong outline-none"
              placeholder="Masukkan nama perangkat"
            >
          </label>

          <ul class="self-center h-96 max-h-full w-[calc(100%+1rem)] px-2 py-1 flex flex-col gap-4 overflow-y-scroll">
            <li v-for="i in 7" :key="i">
              <router-link :to="{ name: 'deviceId-compost', params: { deviceId: 'qwf34y90' } }" class="btn btn--flat flex items-center justify-start gap-4 px-4 py-2" @click="showDeviceSelector = false">
                <div class="flex flex-col">
                  <span class="text-$primary-strong font-semibold">Perangkat 1</span>
                  <span class="text-xs text-$bw font-medium">qwf34y90</span>
                </div>
              </router-link>
            </li>
          </ul>

          <div class="flex items-center gap-4 mt-2">
            <button class="btn btn--secondary btn--unelevated btn--rounded" @click="showDeviceAdder = true">
              Tambah Perangkat
            </button>

            <div class="grow" />

            <button class="btn btn--flat btn--rounded" @click="showDeviceSelector = false">
              Kembali
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>

  <teleport to="body">
    <transition>
      <div v-show="showDeviceAdder" class="modal">
        <div class="modal__overlay" @click="showDeviceAdder = false" />
        <div class="modal__content">
          <div class="modal__header">
            <h2 class="text-lg text-$primary-strong font-semibold">
              Tambah Perangkat
            </h2>
          </div>

          <div class="flex flex-col gap-4">
            <label class="form-control flex items-center gap-4 bg-green-100 hover:bg-green-200 px-3 py-4 rounded-t border-b-2 border-inset border-$primary-outline focus-within:border-$primary transition">
              <div class="i-material-symbols:tag-rounded text-2xl text-$primary" />
              <input
                type="text"
                class="form-control__input w-full bg-transparent text-$bw valid:text-$bw-xstrong outline-none"
                placeholder="Masukkan ID perangkat (cth: SewKjTcu)"
              >
            </label>
          </div>

          <div class="flex items-center gap-4 mt-2">
            <button class="btn btn--flat btn--rounded" @click="showDeviceAdder = false">
              Batal
            </button>

            <div class="grow" />

            <button class="btn btn--secondary btn--unelevated btn--rounded" @click="addDevice">
              Tambah Perangkat
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style lang="sass" scoped>
.layout
  @apply flex flex-col h-screen

.bottom-navigation
  @apply z-100 max-w-inherit bg-$primary-weak flex gap-4 px-4 py-3

  .item
    @apply grow bg-green-300 text-lg text-$primary-strong px-4 py-2
    &:hover
      @apply bg-green-200
    &:active
      @apply bg-green-400
    &.router-link-active
      @apply bg-green-100 text-$primary-strong
      &:hover
        @apply bg-green-50
      &:active
        @apply bg-green-200
      &:focus
        @apply ring-0

.modal
  $root: &
  @apply fixed inset-0 z-1000 flex items-center justify-center transition

  &__overlay
    @apply fixed inset-0 bg-black/50

  &__content
    @apply z-1 flex flex-col gap-6 max-w-[calc(100vw-2rem)] bg-$bw-bg rounded-3xl shadow-2xl p-6 transition-transform,opacity
    #{$root}.v-enter-active &
      @apply delay-[0,100ms]
    #{$root}.v-enter-from &
      @apply translate-y-1/4 opacity-0
    #{$root}.v-enter-to &
      @apply translate-y-0 opacity-100
    #{$root}.v-leave-active &
      @apply delay-[100ms,0]
    #{$root}.v-leave-from &
      @apply translate-y-0 opacity-100
    #{$root}.v-leave-to &
      @apply translate-y-1/4 opacity-0

:deep(.stats)
  @apply flex flex-col gap-4 py-2

  > section
    @apply flex flex-col

    .label
      @apply flex items-center gap-1 mb-2

      h3
        @apply text-base text-$primary-strong font-medium
</style>
