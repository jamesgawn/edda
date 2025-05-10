<script setup lang="ts">
defineProps<{
  href: string
  alt: string
}>()
</script>

<template>
  <a class="underline hover:text-orange-400" :href="href" :alt="alt"><slot></slot></a>
</template>

<style scoped></style>
