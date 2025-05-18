<script setup lang="ts">
const props = defineProps<{}>()
import { useEDDLServerStore } from '@/stores/eddl'

const eddlServerConnectionStore = useEDDLServerStore()
</script>

<template>
  <div
    class="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8"
  >
    <div>
      <h2 class="text-base/7 font-semibold text-white">
        Newly Discovered Planetary Bodies By Class
      </h2>
      <p class="mt-2 text-xs/6 text-gray-400">So Far Today</p>
    </div>
  </div>
  <div class="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-5">
    <div class="border-t border-white/5 px-4 py-6 sm:border-l sm:px-6 lg:px-8">
      <p class="text-sm/6 font-medium text-gray-400">Earthlike</p>
      <p class="mt-2 flex items-baseline gap-x-2">
        <span class="text-4xl font-semibold tracking-tight text-white">{{
          eddlServerConnectionStore.newlyDiscoveredBysimplifiedClassToday.Earthlike
        }}</span>
      </p>
    </div>
    <div class="border-t border-white/5 px-4 py-6 sm:border-l sm:px-6 lg:px-8">
      <p class="text-sm/6 font-medium text-gray-400">Water World</p>
      <p class="mt-2 flex items-baseline gap-x-2">
        <span class="text-4xl font-semibold tracking-tight text-white">{{
          eddlServerConnectionStore.newlyDiscoveredBysimplifiedClassToday.WaterWorld
        }}</span>
      </p>
    </div>
    <div class="border-t border-white/5 px-4 py-6 sm:border-l sm:px-6 lg:px-8">
      <p class="text-sm/6 font-medium text-gray-400">Ammonia World</p>
      <p class="mt-2 flex items-baseline gap-x-2">
        <span class="text-4xl font-semibold tracking-tight text-white">{{
          eddlServerConnectionStore.newlyDiscoveredBysimplifiedClassToday.AmmoniaWorld
        }}</span>
      </p>
    </div>
    <div class="border-t border-white/5 px-4 py-6 sm:border-l sm:px-6 lg:px-8">
      <p class="text-sm/6 font-medium text-gray-400">High Metal Content</p>
      <p class="mt-2 flex items-baseline gap-x-2">
        <span class="text-4xl font-semibold tracking-tight text-white">{{
          eddlServerConnectionStore.newlyDiscoveredBysimplifiedClassToday.HighMetalContent
        }}</span>
      </p>
    </div>
    <div class="border-t border-white/5 px-4 py-6 sm:border-l sm:px-6 lg:px-8">
      <p class="text-sm/6 font-medium text-gray-400">Metal-Rich</p>
      <p class="mt-2 flex items-baseline gap-x-2">
        <span class="text-4xl font-semibold tracking-tight text-white">{{
          eddlServerConnectionStore.newlyDiscoveredBysimplifiedClassToday.MetalRich
        }}</span>
      </p>
    </div>
    <div class="border-t border-white/5 px-4 py-6 sm:border-l sm:px-6 lg:px-8">
      <p class="text-sm/6 font-medium text-gray-400">Icy</p>
      <p class="mt-2 flex items-baseline gap-x-2">
        <span class="text-4xl font-semibold tracking-tight text-white">{{
          eddlServerConnectionStore.newlyDiscoveredBysimplifiedClassToday.Icy
        }}</span>
      </p>
    </div>
    <div class="border-t border-white/5 px-4 py-6 sm:border-l sm:px-6 lg:px-8">
      <p class="text-sm/6 font-medium text-gray-400">Rocky Icy</p>
      <p class="mt-2 flex items-baseline gap-x-2">
        <span class="text-4xl font-semibold tracking-tight text-white">{{
          eddlServerConnectionStore.newlyDiscoveredBysimplifiedClassToday.RockyIcy
        }}</span>
      </p>
    </div>
    <div class="border-t border-white/5 px-4 py-6 sm:border-l sm:px-6 lg:px-8">
      <p class="text-sm/6 font-medium text-gray-400">Rocky</p>
      <p class="mt-2 flex items-baseline gap-x-2">
        <span class="text-4xl font-semibold tracking-tight text-white">{{
          eddlServerConnectionStore.newlyDiscoveredBysimplifiedClassToday.Rocky
        }}</span>
      </p>
    </div>
    <div class="border-t border-white/5 px-4 py-6 sm:border-l sm:px-6 lg:px-8">
      <p class="text-sm/6 font-medium text-gray-400">Gas Giant</p>
      <p class="mt-2 flex items-baseline gap-x-2">
        <span class="text-4xl font-semibold tracking-tight text-white">{{
          eddlServerConnectionStore.newlyDiscoveredBysimplifiedClassToday.GasGiant
        }}</span>
      </p>
    </div>
    <div class="border-t border-white/5 px-4 py-6 sm:border-l sm:px-6 lg:px-8">
      <p class="text-sm/6 font-medium text-gray-400">Water Giant</p>
      <p class="mt-2 flex items-baseline gap-x-2">
        <span class="text-4xl font-semibold tracking-tight text-white">{{
          eddlServerConnectionStore.newlyDiscoveredBysimplifiedClassToday.WaterGiant
        }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
