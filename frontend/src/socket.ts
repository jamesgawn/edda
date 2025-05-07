import { reactive } from 'vue'
import { io } from 'socket.io-client'

export const state = reactive({
  connected: false,
})
const URL = 'http://localhost:3001'

export const socket = io(URL)
socket.connect()

socket.on('connect', () => {
  state.connected = true
  console.log('Connected to server')
})

socket.on('disconnect', () => {
  state.connected = false
  console.log('Disconnected from server')
})
