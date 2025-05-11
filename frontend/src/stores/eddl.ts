import { defineStore } from 'pinia'
import { socket } from '@/socket'
import type { PlanetScanEvent } from '../../../shared/types/PlanetScanEvent'

export const useEDDLServerStore = defineStore('connection', {
  state: () => ({
    isConnected: false,
    planetaryFinds: [] as PlanetScanEvent[],
  }),

  actions: {
    bindEvents() {
      socket.on('connect', () => {
        this.isConnected = true
      })

      socket.on('disconnect', () => {
        this.isConnected = false
      })

      socket.on('PlanetScanNewlyDiscovered', (data) => {
        data.Timestamp = new Date(data.Timestamp as string)
        this.planetaryFinds.unshift(data)
        if (this.planetaryFinds.length > 20) {
          this.planetaryFinds.pop()
        }
      })
    },
  },
})
