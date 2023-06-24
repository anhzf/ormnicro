<script lang="ts" setup>
interface Props {
  message: string
  icon?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  action?: {
    label: string
    onClick?(): void
    to?: string
    href?: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'i-material-symbols:info',
  type: 'info',
})

const actionComponent = computed(() => {
  if (props.action?.to)
    return 'router-link'
  if (props.action?.href)
    return 'a'
  return 'button'
})

const color = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-500'
    case 'warning':
      return 'bg-amber-500'
    case 'error':
      return 'bg-red-500'
    default:
      return 'bg-blue-500'
  }
})
</script>

<template>
  <div class="surface bg-amber-500" :class="color">
    <div class="message">
      <div class="icon" :class="icon" />
      <span>{{ message }}</span>
    </div>
    <div v-if="action" class="actions">
      <component :is="actionComponent" class="btn btn--sm btn--bw" v-bind="action">
        {{ action.label }}
      </component>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.surface
  @apply flex items-center gap-4 px-3 py-2 rounded-xl

.message
  @apply grow text-white font-semibold flex items-center gap-2

.icon
  @apply shrink-0 w-6 h-6 text-white

.actions
  @apply flex items-center gap-1
</style>
