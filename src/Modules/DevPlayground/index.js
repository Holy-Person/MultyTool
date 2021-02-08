const Mousetrap = require('mousetrap');
const { ipcRenderer } = require('electron');
const MultyTool = require(__dirname+'/../globalFunction.js'); //// TODO: fix this

Mousetrap.bind('esc', () => {
	ipcRenderer.send('changePage', 'menu');
});
Mousetrap.bind(['command+r', 'ctrl+r', 'f5'], () => {
	window.location.reload();
});

function test() {
	MultyTool.getUserName();
}