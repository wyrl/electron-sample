// filepath: /C:/Users/gyn_j/Desktop/wyrl/electron-sample/app.js
const { app, BrowserWindow } = require("electron");
const express = require('express');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Load the Angular application from the local server
  mainWindow.loadURL('http://localhost:3000');

  // Hide the menu bar
  mainWindow.setMenuBarVisibility(false);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

// Start the Express server
const startServer = () => {
  const server = express();
  server.use(express.static(path.join(__dirname, 'dist/electron-sample/browser')));

  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/electron-sample/browser/index.html'));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    createWindow();
  });
};

app.on("ready", startServer);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});