export class EventEmitter<T> {
  private handlers: { [eventName in keyof T]?: ((value: T[eventName]) => void)[] }

  constructor() {
      this.handlers = {}
  }

  emit<K extends keyof T>(event: K, value: T[K]): void {
      this.handlers[event]?.forEach(h => h(value));
  }

  addHandler<K extends keyof T>(event: K, handler: (value: T[K]) => void): void {
      if(!this.handlers[event]) {
          this.handlers[event] = [handler];
      } else {
          this.handlers[event].push(handler);
      }
  }
}