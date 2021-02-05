const Fs = require('fs');
const { ipcRenderer } = require('electron');

module.exports = {
	loadUserTheme: function() {
		/*Fs.readFile((`${__dirname}/UserData/settings.json`), 'utf8', (err, jsonString) => {
			var sObject = JSON.parse(jsonString);
	    var themeType  = sObject.preferences.theme;

			Fs.readFile((`${__dirname}/UserData/Themes/theme_${themeType}.json`), 'utf8', (err, themeJson) => {
		    var themeObject = JSON.parse(themeJson);
				document.documentElement.style.setProperty('--TextPrimary', themeObject.colors.textPrimary);
				document.documentElement.style.setProperty('--BGPrimary', themeObject.colors.bgPrimary);
		    document.documentElement.style.setProperty('--MenuPrimary', themeObject.colors.menuPrimary);
		    document.documentElement.style.setProperty('--Hover', themeObject.colors.hover);
		    document.documentElement.style.setProperty('--Active', themeObject.colors.active);
				document.documentElement.style.setProperty('--Spacer', themeObject.colors.spacer);
		    document.documentElement.style.setProperty('--Error', themeObject.colors.error);
		    document.body.style.backgroundImage 					 = themeObject.links.bgImage;
		    document.getElementById(`BackgroundVideo`).src = themeObject.links.bgVideo;
		  });
	  });*/
		//Old unused theme loader used as template
		// TODO: adjust for multytool themes
		// TODO: centralize colors first
		// TODO: apply to all default modules
		// TODO: add instructions in modulebuilder
  },
	sendNotification: function(/*Fill this*/) {
		//Modular notification system
		// TODO: find way to make it not require html and css, or just not html.
		// TODO: actually make the function
		// TODO: list all attributes needed
	},
	toggleFullScreen: function() {
		// TODO: actually make the function
	},
	getUserName: function() {
		// TODO: actually make the function
	},
	getUserPronoun: function(/*Selection here*/) {
		// TODO: actually make the function
	}
}