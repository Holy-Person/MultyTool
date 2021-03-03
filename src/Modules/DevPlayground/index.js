/*START SETUP*/
const Mousetrap = require('mousetrap');
const { ipcRenderer } = require('electron');
const MultyTool = require(__dirname+'/../../globalFunction.js');

Mousetrap.bind('esc', () => {
	MultyTool.app.goToModule('menu');
});
Mousetrap.bind(['command+r', 'ctrl+r', 'f5'], () => {
	window.location.reload();
});
/*END SETUP*/



/*START LOAD*/
function startUp() {
	loadButtons();
	loadNodes();
}

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
var activeButtonNode;
var activeScreenNode;
function loadNodes() {
	activeScreenNode = document.getElementById('cs_About');
}
// TODO: make onload function that inits activescreennode
function switchCotentScreen() {
	if(activeButtonNode) { activeButtonNode.classList.remove('buttonActive'); }
	activeButtonNode = event.target;
	activeButtonNode.classList.add('buttonActive');

	var targetScreen = activeButtonNode.innerHTML.split(' ').join('-');

	if(activeScreenNode) { activeScreenNode.style.display = `none`; }
	activeScreenNode = document.getElementById(`cs_${targetScreen}`);
	activeScreenNode.style.display = "block";
}
/*END CS LOGIC*/

/*START TEST BUTTONS*/
function notificationTest(type) {
	MultyTool.app.sendToast(type, 'Hello<br><br><br><br><br><br>TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT<br><br><br><br><br><br><b<br>Bottom Text');
}

function fullScreenTest() {
	MultyTool.app.toggleFullScreen();
}

function forceThemeTest() {
	MultyTool.app.forceTheme('orange-blue');
}
function userThemeTest() {
	MultyTool.app.loadUserTheme();
}
function toggleAlwaysTopTest() {
	MultyTool.app.toggleAlwaysOnTop();
}
/*END TEST BUTTONS*/