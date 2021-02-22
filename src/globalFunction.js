const Fs = require('fs');
const { remote, ipcRenderer } = require('electron');
//const { BrowserWindow } = require('@electron/remote') //For electron 12 and later, remote module gets deprecated and needs to be replaced with this.

async function sendNotification(type, content) {
	var notifBox = document.createElement("div");
	notifBox.style.position = "absolute";
	notifBox.style.boxSizing = "border-box";
	notifBox.style.whiteSpace = "nowrap";
	notifBox.style.padding = "1%";
	notifBox.style.overflow = "hidden";
	notifBox.style.textOverflow = "ellipsis";
	notifBox.style.top = "1.5%";
	notifBox.style.right = "1.5%";
	notifBox.style.minHeight = "100px";
	notifBox.style.minWidth = "35%";
	notifBox.style.maxWidth = "55%";
	notifBox.style.background = "rgba(50,50,50,0.5)";
	notifBox.style.borderRadius = "5px";
	notifBox.style.border = "1px solid rgb(50,50,50)";
	notifBox.style.borderLeft = "6px solid rgb(50,50,50)";
	notifBox.style.color = "white";
	notifBox.style.userSelect = "text";
	notifBox.innerHTML = content;

	const delay = ms => new Promise(res => setTimeout(res, ms));
	document.body.appendChild(notifBox);
	await delay(5000);
	notifBox.remove();
	//Modular notification system
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