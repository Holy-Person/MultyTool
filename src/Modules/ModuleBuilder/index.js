const Mousetrap = require('mousetrap');
const { ipcRenderer } = require('electron');

Mousetrap.bind('esc', () => {
	goBack();
});
Mousetrap.bind(['command+r', 'ctrl+r', 'f5'], () => {
	window.location.reload();
});

var currentType = 'main';
function selectOption(num) {
	var x = document.getElementsByClassName("optionCard");
	var y = document.getElementsByClassName("optionContainer");
	for (var i = 0; i < x.length; i++) {
	  x[i].style.display = `none`;
	}
	y[num].style.display = `block`;
	currentType = 'option';
}

function goBack() {
	if(currentType == 'option') {
		var x = document.getElementsByClassName("optionCard");
		var y = document.getElementsByClassName("optionContainer");
		for (var i = 0; i < y.length; i++) {
		  y[i].style.display = `none`;
			x[i].style.display = `block`;
		}
		currentType = 'main';
	} else {
		ipcRenderer.send('changePage', 'menu');
	}
}