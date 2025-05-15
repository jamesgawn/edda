<script setup lang="ts">
import NewlyDiscoveredPlanetsByClassStatsPanel from '@/components/panels/NewlyDiscoveredPlanetsByClassStatsPanel.vue'
import RecentlyDiscoveredBodiesPanel from '@/components/panels/RecentlyDiscoveredBodiesPanel.vue'
import { useEDDLServerStore } from '@/stores/eddl'

const eddlServerConnectionStore = useEDDLServerStore()
</script>

<template>
  <main>
    <NewlyDiscoveredPlanetsByClassStatsPanel></NewlyDiscoveredPlanetsByClassStatsPanel>
    <RecentlyDiscoveredBodiesPanel></RecentlyDiscoveredBodiesPanel>
  </main>
</template>
