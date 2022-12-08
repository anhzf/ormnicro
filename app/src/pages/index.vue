<script lang="ts" setup>
const articles = [
  {
    id: '1',
    title: 'Sampah Organik jadi Kompos, Gimana Sampah Anorganik Saya?',
    imgSrc: '/content/DALL·E 2022-10-18 18.54.49 - plastic waste on a pile of organic waste.png',
    url: '#',
  },
  {
    id: '2',
    title: 'Menangkan Hadiah Mobil selama Penukaran Poin periode September - Desember 2022',
    imgSrc: '/content/article_prize-info-sept-des-2022.png',
    url: '#',
  },
  {
    id: '3',
    title: 'Top Global Penukar Sampah periode Juni - Agustus 2022',
    imgSrc: '/content/article_top-global-june-aug-2022.png',
    url: '#',
  },
]
</script>

<template>
  <div>
    <!-- Profile Bar -->
    <div class="flex gap-4 px-6 py-5">
      <router-link to="#" class="btn btn--flat btn--dense">
        <div class="i-material-symbols:account-circle w-10 h-10 text-green-700" />
        <div class="flex flex-col">
          <div class="text-slate-700 font-medium">
            Agus Riyanto
          </div>
          <div class="flex gap-1">
            <span class="text-green-900 font-semibold">1908</span>
            <span class="self-end text-xs text-slate-500 font-medium">poin</span>
          </div>
        </div>
      </router-link>

      <div class="grow" />

      <div class="flex justify-end gap-4">
        <button class="btn btn--icon btn--flat text-slate-500">
          <div class="btn__icon i-material-symbols:notifications" />
        </button>
      </div>
    </div>

    <!-- Notifications -->
    <section class="flex flex-col gap-2 px-section py-2">
      <div class="notification-banner bg-green-500">
        <div class="notification-banner__message">
          <div class="i-material-symbols:info notification-banner__icon" />
          <span>2 hari lagi kompos kamu jadi!</span>
        </div>
        <div class="notification-banner__actions">
          <button class="btn btn--sm btn--bw">
            Pantau
          </button>
        </div>
      </div>

      <div class="notification-banner bg-amber-500">
        <div class="notification-banner__message">
          <div class="i-material-symbols:local-shipping notification-banner__icon" />
          <span>Penjemput sampah kamu akan tiba 3 menit lagi!</span>
        </div>
        <div class="notification-banner__actions">
          <button class="btn btn--sm btn--bw">
            Lacak
          </button>
        </div>
      </div>
    </section>

    <!-- Main Menus -->
    <section class="flex flex-col gap-2 px-section py-4">
      <div class="headline">
        <h1>
          Menu Utama
        </h1>
      </div>
      <div class="main-menus">
        <router-link to="/<select-device>" class="menu">
          <div class="i-material-symbols:compost menu__illustration" />
          <span class="menu__title">Monitoring</span>
        </router-link>
        <router-link to="/bank" class="menu">
          <div class="i-material-symbols:account-balance menu__illustration" />
          <span class="menu__title">Bank Sampah</span>
        </router-link>
        <router-link to="/shop" class="menu">
          <div class="i-material-symbols:store menu__illustration" />
          <span class="menu__title">Belanja</span>
        </router-link>
      </div>
    </section>

    <!-- Banner Info -->
    <section class="flex flex-col gap-2 px-section py-4">
      <article class="relative block overflow-hidden w-full aspect-2.1 rounded-2xl shadow">
        <img src="/content/home-info-banner.png" alt="Info Banner" class="w-full h-full object-cover">
        <div class="absolute inset-y-8 left-4 flex flex-col justify-end">
          <router-link to="#" class="btn btn--sm btn--bw">
            Baca artikel →
          </router-link>
        </div>
      </article>
    </section>

    <!-- Articles -->
    <section class="flex flex-col gap-2 px-section-half py-4">
      <div class="headline flex items-center px-section-half">
        <h2>Artikel lainnya</h2>
        <div class="grow" />
        <button class="btn btn--icon btn--flat btn--bw">
          <div class="i-material-symbols:search w-6 h-6" />
        </button>
      </div>

      <ul class="flex flex-col gap-4">
        <li v-for="el in articles" :key="el.id">
          <ArticleCard :title="el.title" :img-src="el.imgSrc" :url="el.url" />
        </li>

        <div class="p-4">
          <p class="text-slate-500 text-center font-medium">
            Anda telah mencapai batas akhir.
          </p>
        </div>
      </ul>
    </section>
  </div>
</template>

<style lang="sass" scoped>
.notification-banner
  @apply flex items-center gap-4 px-3 py-2 rounded-xl

  &__message
    @apply grow text-white font-semibold flex items-center gap-2

  &__icon
    @apply w-6 h-6 text-white

  &__actions
    @apply flex items-center gap-1

section > .headline
  @apply text-lg font-semibold text-slate-700

.main-menus
  @apply flex gap-2

  .menu
    @apply w-full flex flex-col items-center gap-4 px-4 py-8 bg-white rounded-2xl shadow-md
    -webkit-tap-highlight-color: transparent
    -webkit-touch-callout: none
    &:hover
      @apply bg-green-100
    &:active
      @apply bg-green-200 shadow-none

    &__illustration
      @apply w-12 h-12 text-green-500

    &__title
      @apply text-base text-teal-700 text-center font-semibold whitespace-pre w-min

.px-section
  @apply px-4
.px-section-half
  @apply px-2
</style>
