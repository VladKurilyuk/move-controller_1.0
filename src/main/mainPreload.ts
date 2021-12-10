import { contextBridge, ipcRenderer } from "electron";
import * as path from "path";

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    ready() {
      ipcRenderer.send("main-ready");
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      const validChannels: string[] = ["main-predict"];
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

contextBridge.exposeInMainWorld("threeModel", {
  getModelPath(): string {
    return path.join(__dirname, "./model/RobotExpressive.glb");
  },
});