// TODO: Create unclickable button class
// TODO: Create grouped classes for repeated css stuff
// TODO: Tell console ammount of modules loaded
// TODO: Flexbox center part and detail container for full spacings
// TODO: Exit/close button at bottom of menu
// TODO: extend upcoming section to support general updates and one full upcoming
// TODO: upcoming text file
// TODO: notes module
// TODO: flexbox the modulebuilder with mdn layout
// TODO: make empty categories be closed by default
// TODO: move these todos to upcoming
// TODO: centralize colors to prepare for themes
// TODO: clean up html (after cleaned css to make it nice)
// TODO: add more to the app made with using
// TODO: add option to open keylogger again
// TODO: add update button to check new version
// TODO: sort modules on main page


/*START MAIN*/
const Mousetrap = require('mousetrap');
const { ipcRenderer } = require('electron');
const Fs = require('fs');
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
	}*/
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
}

function loadModules() {
	var filePath = `${__dirname}/Modules/`;
	var modulesLoaded = 0;
	
  Fs.readdir(filePath, function(err, modules) {
    modules.forEach(function (module) {
      if(!module.startsWith(`off_`)) {

        Fs.readFile((`${__dirname}/Modules/${module}/moduleinfo.json`), 'utf8', (err, moduleJsonString) => {
					//console.log(err); //make nice looking error handler, might even make notif in-app
          var infoObject = JSON.parse(moduleJsonString);
          var moduleType = infoObject.module.type;
					var moduleName = infoObject.module.name;
					var moduleDescription = infoObject.module.description;
					var moduleSize = infoObject.module.size;
					
					var targetModuleNum = 0;
					
					switch (moduleType) {
						case 'tool': 			targetModuleNum = 0; break;
						case 'minigame': 	targetModuleNum = 1; break;
						case 'workshop': 	targetModuleNum = 2; break;
						case 'other': 		targetModuleNum = 3; break;
						case 'preview': 	targetModuleNum = 5; break;
						default: 					targetModuleNum = 4; break;
					}
					createModuleButton(moduleName, moduleType, moduleDescription, moduleSize, targetModuleNum);
					modulesLoaded++;
					
					if(modulesLoaded == modules.length) {
						console.log(`%cFinished loading modules.\n`, `color:green; font-size: 1.5em`);
    			}
        });
      }
    });
  });
}

var ModuleButton = function (moduleName, moduleDescription, sortPos) {
  this.smallModule =
  `<div class="smallModuleButton moduleButton" id="${sortPos}SmallButton" onclick="openModule()">`+
		`<div class="moduleButtonHeader">${moduleName}</div>`+
		`<div class="moduleButtonDesc">${moduleDescription}</div>`+
  `</div>`;
	this.previewModule =
  `<div class="smallModuleButton moduleButton" id="${sortPos}SmallButton">`+
		`<div class="moduleButtonHeader">${moduleName}</div>`+
		`<div class="moduleButtonDesc">${moduleDescription}</div>`+
  `</div>`;
	this.largeModule =
  `<div class="largeModuleButton moduleButton" onclick="openModule()">`+
		`<div class="moduleButtonHeader">${moduleName}</div>`+
		`<div class="moduleButtonDesc">${moduleDescription}</div>`+
  `</div>`;
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
	document.getElementById(`${moduleType}SubList`).innerHTML = document.getElementById(`${moduleType}SubList`).innerHTML + createdModule;
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