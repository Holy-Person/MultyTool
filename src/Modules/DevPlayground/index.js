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
	var screens = document.querySelectorAll('.contentItem');
	screens.forEach(function (screen) {
		var screenID = screen.id;
		screenID = screenID
			.split('cs_').join('')
			.split('ch_').join('')
		  .split('-').join(' ');

		if (screen.classList.contains('contentScreen') ) {
			screen.innerHTML = `<h1>${screenID}</h1><hr>` + screen.innerHTML;
			document.getElementById('sidebarList').innerHTML += SB_Content.button(screenID);
		} else if (screen.classList.contains('contentHeader') ) {
			document.getElementById('sidebarList').innerHTML += SB_Content.header(screenID);
		}
	});
}

var SB_Content = {
	headerTop: `<div class="header">`,
  buttonTop: `<div class="button" onclick="switchCotentScreen()">`,
	button: function(title) {
    return this.buttonTop + `${title}</div>`;
  },
	header: function(title) {
    return this.headerTop + `${title}</div><hr>`;
  }
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