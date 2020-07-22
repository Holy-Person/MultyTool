const Mousetrap = require('mousetrap');
const { ipcRenderer } = require('electron');

Mousetrap.bind(['command+r', 'ctrl+r', 'f5'], () => {
	window.location.reload();
});

Mousetrap.bind('esc', () => {
	//Exit App
})

function test() {
	var element  		= event.target;
	var destination = element.id;
	ipcRenderer.send('changePage', `${destination}`);
}