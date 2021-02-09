const Fs = require('fs');
const { ipcRenderer } = require('electron');

module.exports = {
	loadUserTheme: function() {
		Fs.readFile((`${__dirname}/Data/settings.json`), 'utf8', (err, jsonString) => {
			var settingsObject = JSON.parse(jsonString);
	    var userTheme  		 = settingsObject.app.theme;

			Fs.readFile((`${__dirname}/Themes/${userTheme}.json`), 'utf8', (err, themeJson) => {
		    var themeObject = JSON.parse(themeJson);
				console.log(themeObject);
				console.log('This function does nothing yet. Please wait for the release of themes.');
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
		alert('username here');
		// TODO: actually make the function
	},
	getUserName: function() {
		alert('username here');
		// TODO: actually make the function
	},
	getUserPronoun: function(/*Selection here*/) {
		alert('selected pronoun here');
		// TODO: actually make the function
	}
}