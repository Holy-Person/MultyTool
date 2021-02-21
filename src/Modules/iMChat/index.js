/*START SETUP*/
const Mousetrap = require('mousetrap');
const MultyTool = require(__dirname+'/../../globalFunction.js');

Mousetrap.bind('esc', () => {
	MultyTool.app.goToModule('menu');
});
Mousetrap.bind(['command+r', 'ctrl+r', 'f5'], () => {
	window.location.reload();
});
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