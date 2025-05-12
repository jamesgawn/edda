<script setup lang="ts">
import { useEDDLServerStore } from '@/stores/eddl'

const eddlServerConnectionStore = useEDDLServerStore()

const stats = [
  { name: 'Earthlike', value: '0' },
  { name: 'Water World', value: '0' },
  { name: 'Ammonia World', value: '0' },
  { name: 'High Metal Content', value: '0' },
  { name: 'Metal-Rich', value: '0' },
  { name: 'Icy', value: '0' },
  { name: 'Rocky Icy', value: '0' },
  { name: 'Rocky', value: '0' },
  { name: 'Gas Giant', value: '0' },
  { name: 'Water Giant', value: '0' },
]
</script>

<template>
  <main>
    <!-- <div class="mb-2.5 text-white md:flex md:items-center md:justify-between">
      <div class="min-w-0 flex-1">
        <h2 class="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">Dashboard</h2>
      </div>
    </div> -->

    <!-- Planetary Finds  -->
    <div
      class="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8"
    >
      <div>
        <h2 class="text-base/7 font-semibold text-white">
          Newly Discovered Planetary Bodies By Class
        </h2>
        <!-- <p class="mt-2 text-xs/6 text-gray-400">Since...</p> -->
      </div>
    </div>
    <div class="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-5">
      <div
        v-for="(stat, statIdx) in stats"
        :key="stat.name"
        :class="[
          statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
          'border-t border-white/5 px-4 py-6 sm:px-6 lg:px-8',
        ]"
      >
        <p class="text-sm/6 font-medium text-gray-400">{{ stat.name }}</p>
        <p class="mt-2 flex items-baseline gap-x-2">
          <span class="text-4xl font-semibold tracking-tight text-white">{{ stat.value }}</span>
        </p>
      </div>
    </div>

    <!-- Latest Exploration Activity -->
    <div class="border-t border-white/10 pt-11">
      <h2 class="px-4 text-base/7 font-semibold text-white sm:px-6 lg:px-8">
        Recently discovered bodies
      </h2>
      <table class="mt-6 w-full text-left whitespace-nowrap">
        <colgroup>
          <col class="w-full sm:w-4/12" />
          <col class="lg:w-4/12" />
          <col class="lg:w-2/12" />
          <col class="lg:w-1/12" />
          <col class="lg:w-1/12" />
        </colgroup>
        <thead class="border-b border-white/10 text-sm/6 text-white">
          <tr>
            <th scope="col" class="py-2 pr-8 pl-4 font-semibold sm:pl-6 lg:pl-8">Name</th>
            <th scope="col" class="hidden py-2 pr-8 pl-0 font-semibold sm:table-cell">Class</th>
            <th
              scope="col"
              class="hidden py-2 pr-4 pl-0 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
            >
              Discovered At
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr v-for="item in eddlServerConnectionStore.planetaryFinds">
            <td class="py-4 pr-8 pl-4 sm:pl-6 lg:pl-8">
              <div class="flex items-center gap-x-4">
                <div class="truncate text-sm/6 font-medium text-white">{{ item.BodyName }}</div>
              </div>
            </td>
            <td class="hidden py-4 pr-4 pl-0 sm:table-cell sm:pr-8">
              <div class="flex gap-x-3">
                <div class="font-mono text-sm/6 text-gray-400">{{ item.PlanetClass }}</div>
              </div>
            </td>
            <td
              class="hidden py-4 pr-4 pl-0 text-right text-sm/6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8"
            >
              <time>{{ item.Timestamp.toLocaleString() }}</time>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
