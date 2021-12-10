import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

let mainWindow: BrowserWindow | null = null;
let workerWindow: BrowserWindow | null = null;

interface Response { 
  action: string;
  duratation: number; 
}

const getKeyValue =
  <T extends object, U extends keyof T>(obj: T) =>
  (key: U) =>
    obj[key];

const actions = {
  state: {
    victory: "Dance",
    okay: "Walking",
    rock: "Death",
  },
  emotes: {
    thumbs_up: "Yes",
    thumbs_down: "No",
    hifive: "Wave",
    to_top: "Jump",
    punch: "Punch",
  },
};

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: true,
    width: 1024,
    height: 728,
    webPreferences: {
      preload: path.join(__dirname, "mainPreload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../src/renderer/mainWindow/index.html"));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
    workerWindow = null;
  });

  mainWindow.webContents.openDevTools();
}

function createWorkerWindow() {
    workerWindow = new BrowserWindow({
        show: true,
        width: 1024,
        height: 728,
        webPreferences: {
            preload: path.join(__dirname, "workerPreload.js"),
        }
    });

    workerWindow.loadFile(path.join(__dirname, "../src/renderer/workerWindow/index.html"));

    workerWindow.webContents.openDevTools();
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app
    .whenReady()
    .then(() => {
        createWorkerWindow();
        app.on("activate", () => {
          if (mainWindow === null) createWindow();
          if (workerWindow === null) createWorkerWindow();
        });
    })
    .catch(console.error);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Events
ipcMain.once("worker-ready", (_event) => {
    createWindow();
    console.log("Worker is ready");
})

ipcMain.once("main-ready", (_event) => {
    // END LOADING
    console.log("Main is ready");
})

ipcMain.on("worker-predict",(_event, value) => {
  console.log(value);
  const { state, emotes } = actions;
  const response: Response  = {
    action: "",
    duratation: 0,
  };

  if(value in state){
    response.action = getKeyValue(state)(value);
    response.duratation = 0.5;
  } else if(value in emotes){
    response.action = getKeyValue(emotes)(value);
    response.duratation = 0.2;
  }

  if(response.action && response.duratation) {
    mainWindow.webContents.send("main-predict", [response]);
  }
})

