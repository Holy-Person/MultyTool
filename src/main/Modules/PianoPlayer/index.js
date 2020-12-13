const Mousetrap = require('mousetrap');
const { ipcRenderer } = require('electron');

Mousetrap.bind('esc', () => {
	ipcRenderer.send('changePage', 'menu');
});
Mousetrap.bind(['command+r', 'ctrl+r', 'f5'], () => {
	window.location.reload();
});

window.addEventListener("keydown", keyPress);

function keyPress(keyObject) {
	if(keyObject.keyCode >= 48 && keyObject.keyCode <= 90) {
		document.getElementById(`pKey_${keyObject.key}`).style.fontWeight = "bold";
		handleNote(keyObject.key);
		setTimeout(() => {
			document.getElementById(`pKey_${keyObject.key}`).style.fontWeight = "normal";
		}, 200);
	}
}

function handleNote(key) {
	document.getElementById('noteContainer').innerHTML = document.getElementById('noteContainer').innerHTML + key;
}

//String.fromCharCode(n1, n2, ..., nX)