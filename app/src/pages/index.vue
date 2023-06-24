<script lang="ts" setup>
import { useAuth } from '@vueuse/firebase'
import config from '~/config'
import { auth } from '~/services/firebase'

interface BannerInfo {
  image: string
  action: {
    label: string
    to?: string
    onClick?(): void
    href?: string
  }
}

interface Article {
  id: string
  title: string
  imgSrc: string
  url: string
}

interface Notification {
  id: string
  message: string
  icon?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  action: {
    label: string
    to?: string
    href?: string
    target?: string
    onClick?(): void
  }
}

const { user } = useAuth(auth())

const notifications: Notification[] = [
  {
    id: '1',
    message: `Aplikasi ini masih dalam tahap pengembangan, Silakan laporkan bug atau saran ke ${config.supportEmail}`,
    icon: 'i-material-symbols:info',
    type: 'info',
    action: {
      label: 'Laporkan',
      href: `mailto:${config.supportEmail}`,
      target: '_blank',
    },
  },
]

const banner: BannerInfo = {
  image: '/content/home-info-banner.png',
  action: {
    label: 'Baca artikel →',
    onClick: () => window.alert('Artikel tidak tersedia untuk saat ini.'),
  },
}

const articles: Article[] = [
  // {
  //   id: '1',
  //   title: 'Sampah Organik jadi Kompos, Gimana Sampah Anorganik Saya?',
  //   imgSrc: '/content/DALL·E 2022-10-18 18.54.49 - plastic waste on a pile of organic waste.png',
  //   url: '#',
  // },
  // {
  //   id: '2',
  //   title: 'Menangkan Hadiah Mobil selama Penukaran Poin periode September - Desember 2022',
  //   imgSrc: '/content/article_prize-info-sept-des-2022.png',
  //   url: '#',
  // },
  // {
  //   id: '3',
  //   title: 'Top Global Penukar Sampah periode Juni - Agustus 2022',
  //   imgSrc: '/content/article_top-global-june-aug-2022.png',
  //   url: '#',
  // },
]

const inferActionComponentType = (action: Notification['action']) => {
  if (action.to)
    return 'router-link'
  if (action.href)
    return 'a'
  return 'button'
}
</script>

<template>
  <div>
    <!-- Profile Bar -->
    <div class="flex gap-4 px-6 py-5">
      <router-link to="#" class="btn btn--flat btn--dense">
        <div class="i-material-symbols:account-circle w-10 h-10 text-green-700" />
        <div class="flex flex-col">
          <div class="text-slate-700 font-medium">
            {{ user?.displayName }}
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
    <section v-if="notifications.length > 0" class="flex flex-col gap-2 px-section py-2">
      <NotificationBanner
        v-for="notification in notifications"
        :key="notification.id"
        :message="notification.message"
        :icon="notification.icon"
        :type="notification.type"
        :action="notification.action"
      />
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
        <img :src="banner.image" alt="Info Banner" class="w-full h-full object-cover">
        <div class="absolute inset-y-8 left-4 flex flex-col justify-end">
          <component :is="inferActionComponentType(banner.action)" class="btn btn--sm btn--bw" v-bind="banner.action">
            {{ banner.action.label }}
          </component>
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

      <ul v-if="articles.length > 0" class="flex flex-col gap-4">
        <li v-for="el in articles" :key="el.id">
          <ArticleCard :title="el.title" :img-src="el.imgSrc" :url="el.url" />
        </li>

        <div class="p-4">
          <p class="text-slate-500 text-center font-medium">
            Anda telah mencapai batas akhir.
          </p>
        </div>
      </ul>

      <div class="p-4">
        <p class="text-slate-500 text-center font-medium">
          Tidak ada artikel yang ditemukan.
        </p>
      </div>
    </section>
  </div>
</template>

<style lang="sass" scoped>
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
