import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

let mainWindow: BrowserWindow | null = null;
let workerWindow: BrowserWindow | null = null;
let loadingWindow: BrowserWindow | null = null;

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
    walk: "Walking",
    rock: "Death",
  },
  emotes: {
    thumbs_up: "Yes",
    thumbs_down: "No",
    five: "Wave",
    index_top: "Jump",
    punch: "Punch",
  },
};

let isMainLoaded = false;
let isWorkerLoaded = false;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    minWidth: 800,
    minHeight: 640,
    title: "Robo Controller",
    backgroundColor: "#c1cdcd",
    icon: path.join(__dirname, "./assets/robotics.iso"),
    webPreferences: {
      preload: path.join(__dirname, "mainPreload.js"),
    },
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile(path.join(__dirname, "../src/renderer/mainWindow/index.html"));

  mainWindow.on("ready-to-show", () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }

    isMainLoaded = true;

    if (isWorkerLoaded) {
      setTimeout(() => {
        loadingWindow.close();
        mainWindow.show();
      }, 8000);
    }
  });

  mainWindow.on("closed", () => {
    workerWindow.close();
  });
}

function createWorkerWindow() {
  workerWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences: {
      preload: path.join(__dirname, "workerPreload.js"),
    }
  });

  workerWindow.loadFile(path.join(__dirname, "../src/renderer/workerWindow/index.html"));

  workerWindow.once("ready-to-show", () => {
    if (!workerWindow) {
      throw new Error('"workerWindow" is not defined');
    }

    isWorkerLoaded = true;

    if(isMainLoaded){
      setTimeout(()=>{
        loadingWindow.close();
        mainWindow.show();
      }, 8000);
    } 
  });
}

function createLoadingWindow(){
  loadingWindow = new BrowserWindow({
    frame: false,
    show: false,
    width: 500,
    height: 400,
    alwaysOnTop: true,
    resizable: false,
    icon: path.join(__dirname, "./assets/robotics.iso"),
  });

  loadingWindow.loadFile(path.join(__dirname, "../src/renderer/loadingWindow/index.html"));

  loadingWindow.once("ready-to-show", () => {
    if(!loadingWindow){
      throw new Error('"loadingWindow" is not defined');
    }

    loadingWindow.show();
    loadingWindow.focus();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app
  .whenReady()
  .then(() => {
    createLoadingWindow();
    createWorkerWindow();
    createMainWindow();

    app.on("activate", () => {
      if (mainWindow === null) createMainWindow();
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
ipcMain.on("worker-predict",(_event, value) => {
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

