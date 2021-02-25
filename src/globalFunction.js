const Fs = require('fs');
const { remote, ipcRenderer } = require('electron');
//const { BrowserWindow } = require('@electron/remote') //For electron 12 and later, remote module gets deprecated and needs to be replaced with this.
var toast;
var toastsActive = 0;
async function sendToast(type, content, timer = 3500) {
	type = type.toLowerCase();
	if (toast) {
		toast.remove();
		toast = undefined;
	}
	toastsActive += 1;
	toast = document.createElement("div");
	toast.style.position = "absolute";
	toast.style.zIndex = "1000";
	toast.style.boxSizing = "border-box";
	toast.style.whiteSpace = "nowrap";
	toast.style.padding = "1%";
	toast.style.overflow = "hidden";
	toast.style.textOverflow = "ellipsis";
	toast.style.backdropFilter = "blur(4px)";
	toast.style.top = "1.5%";
	toast.style.right = "1.5%";
	toast.style.minHeight = "100px";
	toast.style.minWidth = "30%";
	toast.style.maxWidth = "45%";
	toast.style.borderRadius = "5px";
	toast.style.color = "white";
	toast.style.userSelect = "text";
	if (type === 'info') {
		toast.innerHTML = '<h2 style="margin: 0">&#8505; Info</h2><hr style="height: 2px; border-width: 0; background-color: rgba(41, 20, 210, 1)">' + content;
		toast.style.background = "rgba(41, 20, 210, 0.5)";
		toast.style.border = "1px solid rgb(41, 20, 210)";
		toast.style.borderLeft = "6px solid rgb(41, 20, 210)";
	} else if (type === 'warning') {
		toast.innerHTML = '<h2 style="margin: 0">&#9888; Warning</h2><hr style="height: 2px; border-width: 0; background-color: rgba(210, 175, 20, 1)">' + content;
		toast.style.background = "rgba(140, 105, 0, 0.5)";
		toast.style.border = "1px solid rgba(210, 175, 20, 1)";
		toast.style.borderLeft = "6px solid rgba(210, 175, 20, 1)";
	} else if (type === 'error') {
		toast.innerHTML = '<h2 style="margin: 0">&#128721; Error</h2><hr style="height: 2px; border-width: 0; background-color: rgba(108, 8, 8, 1)">' + content;
		toast.style.background = "rgba(140, 20, 20, 0.5)";
		toast.style.border = "1px solid rgba(108, 8, 8, 1)";
		toast.style.borderLeft = "6px solid rgba(108, 8, 8, 1)";
	} else {
		toast.innerHTML = content;
		toast.style.background = "rgba(50, 50, 50, 0.5)";
		toast.style.border = "1px solid rgb(50, 50, 50)";
		toast.style.borderLeft = "6px solid rgb(50, 50, 50)";
	}

	document.body.appendChild(toast);
	var delay = ms => new Promise(res => setTimeout(res, ms));
	await delay(timer);
	if (toastsActive <= 1) {
		toast.remove();
	}
	toastsActive -= 1;
}
async function sendSnackBar() {
	alert(`Could not execute MultyTool function "${arguments.callee.name}".\nThis function is unfinished.`);
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
	sendToast,
	sendSnackBar,
	//sendDesktopNotification,
	loadUserTheme,
	forceTheme
};