import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    ready() {
      ipcRenderer.send("worker-ready");
    },
    setPrediction(value: string) {
      ipcRenderer.send("worker-predict", value);
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      const validChannels: string[] = [];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel: string, func: (...args: unknown[]) => void) {
      const validChannels: string[] = [];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
