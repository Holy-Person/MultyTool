/*START MAIN*/
const Mousetrap = require('mousetrap');
const { ipcRenderer } = require('electron');
const Fs = require('fs');
var moduleObjects = [];
var moduleNum = [0, 0, 0, 0, 0, 0];



Mousetrap.bind(['command+r', 'ctrl+r', 'f5'], () => {
	window.location.reload();
});

Mousetrap.bind('esc', () => {
	quitApp('toggle');

	/*for(var i in this) {
		if((typeof this[i]).toString()=="function"&&this[i].toString().indexOf("native")==-1){
			console.log(this[i].name);
		}
	}*/ //This is for a future feature that lists all functions a dev can call
});



function quitApp(type) {
	if(type == 'toggle') {
		if(document.getElementById(`quitConfirmContainer`).style.display == "flex") {
			document.getElementById(`quitConfirmContainer`).style.display = "none";
		} else {
			document.getElementById(`quitConfirmContainer`).style.display = "flex";
		}
	} else if(type == 'confirm') {
		window.close();
	}
}
/*END MAIN*/

/*START LOAD*/
window.onload = startUp;
function startUp() {
	loadModules();
	fillChangelogs();
	fillUpcoming();
}

function loadModules() {
	var filePath = `${__dirname}/Modules/`;

  Fs.readdir(filePath, function(err, modules) {
    modules.forEach(function (module) {
      Fs.readFile((`${__dirname}/Modules/${module}/moduleinfo.json`), 'utf8', (err, moduleJsonString) => {
				if(err) { console.log(err); } //make nice looking error handler, might even make notif in-app
				var moduleObject = JSON.parse(moduleJsonString);

				moduleObjects.push(moduleObject);
				var moduleName = moduleObject.module.name;



				if(moduleObjects.length == modules.length) {
					console.group(`%cFinished loading modules.`, `color:green; font-size: 2em`);
					console.info(`Loaded a total of ${moduleObjects.length} modules.`);
					console.groupEnd();

					moduleObjects.sort(function(a, b) {
						let fa = a.module.name.toLowerCase(),
			        	fb = b.module.name.toLowerCase();
						if (fa < fb) {
							return -1;
						} else if (fa > fb) {
							return 1;
						} return 0;
					});
					insertModules();
  			}
      });
    });
  });
}

function insertModules() {
	var targetModuleNum = 0;

	moduleObjects.forEach(function (moduleObject) {
		var moduleType = moduleObject.module.type;

		switch (moduleType) {
			case 'tool': 			targetModuleNum = 0; break;
			case 'minigame':	targetModuleNum = 1; break;
			case 'workshop':	targetModuleNum = 2; break;
			case 'other':			targetModuleNum = 3; break;
			case 'preview': 	targetModuleNum = 5; break;
			default: 					targetModuleNum = 4; break;
		}

		var moduleName =				moduleObject.module.name;
		var moduleDescription = moduleObject.module.description;
		var moduleSize =				moduleObject.module.size;

		createModuleButton(moduleName, moduleType, moduleDescription, moduleSize, targetModuleNum);
	});
}

function createModuleButton(moduleName, moduleType, moduleDescription, moduleSize, x) {
	var modulePos;
	var createdModule;
	if(moduleNum[x] % 2 == 0 && moduleSize != 'large') {
		moduleNum[x]++;
		modulePos = 'first';
	} else if(moduleNum[x] % 2 == 1 && moduleSize != 'large') {
		modulePos = 'second';
		moduleNum[x]++;
	}
	var moduleButton = new ModuleButton(moduleName, moduleDescription, modulePos);
	if(moduleSize == 'large') {
		createdModule = moduleButton.largeModule;
	} else if(moduleType == 'preview') {
		createdModule = moduleButton.previewModule;
	} else {
		createdModule = moduleButton.smallModule;
	}
	document.getElementById(`${moduleType}SubList`).innerHTML += createdModule;
}

var ModuleButton = function (moduleName, moduleDescription, sortPos) {
  this.smallModule =
  `<div class="smallModuleButton moduleButton neuButton" id="${sortPos}SmallButton" onclick="openModule()">`+
		`<div class="moduleButtonHeader">${moduleName}</div>`+
		`<div class="moduleButtonDesc noScrollBar">${moduleDescription}</div>`+
  `</div>`;
	this.previewModule =
  `<div class="smallModuleButton moduleButton neuButton" id="${sortPos}SmallButton">`+
		`<div class="moduleButtonHeader">${moduleName}</div>`+
		`<div class="moduleButtonDesc noScrollBar">${moduleDescription}</div>`+
  `</div>`;
	this.largeModule =
  `<div class="largeModuleButton moduleButton neuButton" onclick="openModule()">`+
		`<div class="moduleButtonHeader">${moduleName}</div>`+
		`<div class="moduleButtonDesc noScrollBar">${moduleDescription}</div>`+
  `</div>`;
}

function fillChangelogs() {
	Fs.readFile(`${__dirname}/Data/changelog.txt`, 'utf8', function(err, data) {
  	if (err) throw err;
  	var rawChangelog = data;

		var startOfFirst = rawChangelog.indexOf(')');
		var endOfFirst = rawChangelog.indexOf('°');
		var cutRawChangelog = rawChangelog.substr(startOfFirst+1, endOfFirst - startOfFirst-1);

		var cutChangelog = cutRawChangelog
	    .split('|').join('<br>')
	    .split('*').join('⦿&nbsp;')
			.split('^').join('&nbsp;&nbsp;•&nbsp;')
			.split('°').join('<hr>');

		var fullChangelog = rawChangelog
		  .split('|').join('<br>')
		  .split('{').join('<div class="updateHeader"><span class="updateType">')
		  .split('}').join('</span><br><span class="updateTitle">')
			.split('(').join('</span>&nbsp;&nbsp;<span class="updateVersion">(')
			.split(')').join(')</span></div>')
		 	.split('*').join('⦿&nbsp;')
			.split('^').join('&nbsp;&nbsp;•&nbsp;')
			.split('°').join('<hr>');

	  document.getElementById("changelogPreview").innerHTML = cutChangelog;

		document.getElementById("changelogFull").innerHTML = fullChangelog;
	});
}

function fillUpcoming() {
	Fs.readFile(`${__dirname}/Data/upcoming.txt`, 'utf8', function(err, data) {
  	if (err) throw err;
  	var rawUpcoming = data;

		var fullUpcoming = rawUpcoming
			.split('*').join('⦿&nbsp;')
			.split('^').join('<br>&nbsp;&nbsp;•&nbsp;')
			.split('°').join('<hr>');

		document.getElementById("upcomingPreview").innerHTML = fullUpcoming;
	});
}
/*END LOAD*/


/*START MODULELIST*/
function toggleCategoryVisibility() {
	var siblings = event.target.parentElement.children;
	if(siblings[1].style.display == "none") {
		siblings[1].style.display = "block";
		siblings[0].children[0].innerHTML = "▽&nbsp;";
	} else {
		siblings[1].style.display = "none";
		siblings[0].children[0].innerHTML = "◁&nbsp;";
	}
}

function openModule() {
	var targetChildren = event.target.children;
	var destination = targetChildren[0].innerHTML.split(' ').join('');
	ipcRenderer.send('changePage', `${destination}`);
}

function openModuleFolder() {
	require('child_process').exec(`start "" "${__dirname}/Modules"`);
}
/*END MODULELIST*/


/*START MAINMENU*/
function switchDetailContainer() {
	var destination = event.target.innerHTML.toLowerCase().split(' ').join('');

	var x = document.getElementsByClassName("detailContainer");
	for (var i = 0; i < x.length; i++) {
	  x[i].style.display = `none`;
	}
	document.getElementById(`${destination}DC`).style.display = "block";
}
/*END MAINMENU*/


/*START ACCOUNT*/
function createAccount() {
	const accountName = document.getElementById(`accountNameField`).value;
	const accountPronouns = document.getElementById(`accountPronounField`).value;
	console.log(accountName + 'and' + accountPronouns);
	console.log('account tested');
	return false;
}
/*END ACCOUNT*/