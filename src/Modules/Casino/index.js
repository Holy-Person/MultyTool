const Mousetrap = require('mousetrap');										//Mousetrap is a module used to make local keybinds
const { ipcRenderer } = require('electron');							//ipc is a module that sends commands to electronCore.js

Mousetrap.bind('esc', () => {															//Placeholder function to return the user to the menu by pressing [ESC]
	ipcRenderer.send('changePage', 'menu');
});
Mousetrap.bind(['command+r', 'ctrl+r', 'f5'], () => {			//Default function to reload the page with keybinds
	window.location.reload();
});