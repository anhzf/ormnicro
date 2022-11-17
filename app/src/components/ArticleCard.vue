<script lang="ts" setup>
interface Props {
  title: string
  url: string
  imgSrc: string
}

defineProps<Props>()
</script>

<template>
  <article>
    <router-link :to="url" class="flex items-center gap-4 px-3 py-2 hover:bg-green-100 active:bg-green-200 rounded-xl active:rounded-3xl active:ring-2 focus:ring-2 ring-green transition-border-radius,box-shadow">
      <div class="shrink-0 w-1/3 aspect-1.4 overflow-hidden rounded-xl">
        <img :src="imgSrc" :alt="`Cover ${title}`" class="w-full h-full">
      </div>
      <div class="grow flex flex-col">
        <h3 class="text-base text-slate-700 font-medium">
          {{ title }}
        </h3>
      </div>
    </router-link>
  </article>
</template>
