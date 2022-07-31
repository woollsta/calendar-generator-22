const { ipcRenderer } = require('electron');
window.printFancy = () => {
   ipcRenderer.send('print');
};
