const fs = require('fs');
const { ipcRenderer } = require('electron');

module.exports = {
	loadTheme: function() {
		fs.readFile((`${__dirname}/UserData/settings.json`), 'utf8', (err, jsonString) => {
			var sObject = JSON.parse(jsonString);
	    var themeType  = sObject.preferences.theme;

			fs.readFile((`${__dirname}/UserData/Themes/theme_${themeType}.json`), 'utf8', (err, themeJson) => {
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
	  });
  },clock: function(clockTarget) {
		var puretime = "Clock Error";

		setInterval(timeMenu, 1000);

		function updateClock() {
			var rawtime = new Date();

			var year = rawtime.getFullYear();
			var month = rawtime.getMonth();
			var day = rawtime.getDate();
			var hours = rawtime.getHours();
			var minutes = rawtime.getMinutes();
			var seconds = rawtime.getSeconds();

			month = month + 1;

			if (minutes < 10) {
				minutes = "0" + minutes;
			} if (seconds < 10) {
				seconds = "0" + seconds;
			}

			if (month < 10) {
				month = "0" + month;
			} if (day < 10) {
				day = "0" + day;
			}

			var AMPM = "";
			if (hours == 0) {
				AMPM = "AM";
				hours = 12;
			} else if (hours < 12) {
				AMPM = "AM";
			} else if (hours == 12) {
				AMPM = "PM";
			} else if (hours > 12) {
				AMPM = "PM";
				hours -= 12;
			}
			puretime = ""+hours+":"+minutes+":"+seconds+""+AMPM;
		}
  }
}