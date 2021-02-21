const Fs = require('fs');
const { remote, ipcRenderer } = require('electron');
//const { BrowserWindow } = require('@electron/remote') //For electron 12 and later, remote module gets deprecated and needs to be replaced with this.

function sendNotification(content) {
	var div = document.createElement("div");
	div.style.position = "absolute";
	div.style.width = "100px";
	div.style.height = "100px";
	div.style.background = "red";
	div.style.color = "white";
	div.style.top = "10px";
	div.style.right = "15px";
	div.innerHTML = content;

	document.body.appendChild(div);
	console.log(div);
	//Modular notification system
	// TODO: find way to make it not require html and css, or just not html.
	// TODO: actually make the function
	// TODO: list all attributes needed
}
function getUserName() {
	alert(`Could not execute MultyTool function "${arguments.callee.name}".\nThis function is unfinished.`);
	// TODO: actually make the function
}
function getUserPronoun(/*Selection here*/) {
	alert(`Could not execute MultyTool function "${arguments.callee.name}".\nThis function is unfinished.`);
	// TODO: actually make the function
}



function goToModule(moduleName) {
	if (moduleName.toLowerCase() === "menu") {
		ipcRenderer.send('changePage', `${__dirname}/menu.html`);
	} else {
		var filePath = `${__dirname}/Modules/${moduleName}/index.html`;

		Fs.access(filePath, Fs.F_OK, (err) => {
			if (err) {
				console.error(`${err}`);
				return;
			}
			ipcRenderer.send('changePage', filePath);
		});
	}
}
function toggleFullScreen() {
	const window = remote.getCurrentWindow();
	( window.isFullScreen() ) ? window.setFullScreen(false) : window.setFullScreen(true);
}
function loadUserTheme() {
	Fs.readFile((`${__dirname}/Data/appSettings.json`), 'utf8', (err, jsonString) => {
		var settingsObject = JSON.parse(jsonString);
		var userTheme  		 = settingsObject.app.theme;

		Fs.readFile((`${__dirname}/Data/Themes/${userTheme}.json`), 'utf8', (err, themeJson) => {
			var themeObject = JSON.parse(themeJson);
			console.log(themeObject);
			/*document.documentElement.style.setProperty('--text', themeObject.colors.text);
			document.body.style.backgroundImage 					 = themeObject.links.bgImage;
			document.getElementById(`BackgroundVideo`).src = themeObject.links.bgVideo;*/
		});
	});
	// TODO: adjust for multytool themes
	// TODO: centralize colors first
	// TODO: apply to all default modules
	// TODO: add instructions in modulebuilder
	alert(`Could not execute MultyTool function "${arguments.callee.name}".\nThis function is unfinished.`);
}
function forceTheme() {
	alert(`Could not execute MultyTool function "${arguments.callee.name}".\nThis function is unfinished.`);
}

module.exports.account = {
	//getValue,
  //addValue,
	//updateValue,
	//removeValue
};
module.exports.app = {
  goToModule,
	toggleFullScreen,
	sendNotification,
	loadUserTheme,
	forceTheme
};