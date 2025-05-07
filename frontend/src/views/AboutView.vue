<script setup>
import { useEDDLServerStore } from '@/stores/eddl'

const eddlServerConnectionStsore = useEDDLServerStore()
eddlServerConnectionStsore.bindEvents()
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p class="text-orange-500">{{ eddlServerConnectionStsore.$state.isConnected }}</p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
