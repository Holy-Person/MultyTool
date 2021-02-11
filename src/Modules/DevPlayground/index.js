/*START SETUP*/
const Mousetrap = require('mousetrap');
const { ipcRenderer } = require('electron');
const MultyTool = require(__dirname+'/../../globalFunction.js');

Mousetrap.bind('esc', () => {
	goBack();
});
Mousetrap.bind(['command+r', 'ctrl+r', 'f5'], () => {
	window.location.reload();
});
function goBack() {
	ipcRenderer.send('changePage', 'menu');
}
/*END SETUP*/

function test() {
	MultyTool.loadUserTheme();
}

/*START LOAD*/
function loadButtons() {
	var screens = document.querySelectorAll('.contentScreen');
	console.log(screens);
	screens.forEach(function (screen) {
		var screenID = screen.id;
		screenID = screenID
			.split('cs_').join('')
		  .split('-').join(' ');

		var sb_content = new SB_Content(screenID);
		document.getElementById('sidebarList').innerHTML += sb_content.button;
	});
}

const SB_Content = function (buttonName) {
  this.button =
  `<div class="button" onclick="switchCotentScreen()">`+
		`${buttonName}`+
  `</div>`;
}
/*END LOAD*/

/*START CS LOGIC*/
function switchCotentScreen() {
	var targetScreen = event.target.innerHTML.split(' ').join('-');

	var x = document.getElementsByClassName("contentScreen");
	for (var i = 0; i < x.length; i++) {
		x[i].style.display = `none`;
	}
	document.getElementById(`cs_${targetScreen}`).style.display = "block";
}
/*END CS LOGIC*/