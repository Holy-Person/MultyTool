const Fs = require('fs');
const { remote, ipcRenderer } = require('electron');
//const { BrowserWindow } = require('@electron/remote') //For electron 12 and later, remote module gets deprecated and needs to be replaced with this.

module.exports = {
	loadUserTheme: function() {
		Fs.readFile((`${__dirname}/Data/appSettings.json`), 'utf8', (err, jsonString) => {
			var settingsObject = JSON.parse(jsonString);
	    var userTheme  		 = settingsObject.app.theme;

			Fs.readFile((`${__dirname}/Data/Themes/${userTheme}.json`), 'utf8', (err, themeJson) => {
		    var themeObject = JSON.parse(themeJson);
				console.log(themeObject);
				alert('This function does nothing as of right now. Please wait for the release of themes to use this.');
				/*document.documentElement.style.setProperty('--text', themeObject.colors.text);
		    document.body.style.backgroundImage 					 = themeObject.links.bgImage;
		    document.getElementById(`BackgroundVideo`).src = themeObject.links.bgVideo;*/
		  });
	  });
		// TODO: adjust for multytool themes
		// TODO: centralize colors first
		// TODO: apply to all default modules
		// TODO: add instructions in modulebuilder
  },
	sendNotification: function(/*Fill this*/) {
		alert('customizable notification here');
		//Modular notification system
		// TODO: find way to make it not require html and css, or just not html.
		// TODO: actually make the function
		// TODO: list all attributes needed
	},
	toggleFullScreen: function() {
		var window = remote.getCurrentWindow();
		if (window.isFullScreen() ) {
			window.setFullScreen(false);
		} else {
			window.setFullScreen(true);
		}
	},
	getUserName: function() {
		alert('username here');
		// TODO: actually make the function
	},
	getUserPronoun: function(/*Selection here*/) {
		alert('selected pronoun here');
		// TODO: actually make the function
	},
	goToModule: function(moduleName) {
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
}