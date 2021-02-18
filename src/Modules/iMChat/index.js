/*START SETUP*/
const Mousetrap = require('mousetrap');
const { ipcRenderer } = require('electron');
const MultyTool = require(__dirname+'/../../globalFunction.js');

Mousetrap.bind('esc', () => {
	MultyTool.goToModule('menu');
});
Mousetrap.bind(['command+r', 'ctrl+r', 'f5'], () => {
	window.location.reload();
});
function goBack() {
	ipcRenderer.send('changePage', 'menu');
}
/*END SETUP*/

/*START LIKE POST*/
/*
const likeIcon = document.getElementById('likeIcon');
likeIcon.addEventListener('click', addFunction);
function likeToggle() {
	likeIcon.classList.toggle('activeLike');
}
*/
/*END LIKE POST*/