<script setup lang="ts">
const props = defineProps<{}>()
import { useEDDLServerStore } from '@/stores/eddl'

const eddlServerConnectionStore = useEDDLServerStore()
</script>

<template>
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
</template>
