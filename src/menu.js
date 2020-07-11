const Mousetrap = require('mousetrap');
const { ipcRenderer } = require('electron');

Mousetrap.bind(['command+r', 'ctrl+r', 'f5'], () => {
	window.location.reload();
});

Mousetrap.bind('esc', () => {
	//Exit App
})

function test() {
	ipcRenderer.send('changePage', 'ExampleModule');
}