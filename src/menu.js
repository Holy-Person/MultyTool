/*START MAIN*/
const Mousetrap = require('mousetrap');
const { ipcRenderer } = require('electron');
const Fs = require('fs');

Mousetrap.bind(['command+r', 'ctrl+r', 'f5'], () => {
	window.location.reload();
});

Mousetrap.bind('esc', () => {
	quitApp('toggle');
})

function quitApp(type) {
	if(type == 'toggle') {
		if(document.getElementById(`quitConfirmContainer`).style.display == "block") {
			document.getElementById(`quitConfirmContainer`).style.display = "none";
			document.getElementById(`screenBlocker`).style.display = "none";
		} else {
			document.getElementById(`quitConfirmContainer`).style.display = "block";
			document.getElementById(`screenBlocker`).style.display = "block";
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
}

var ModuleButton = function (moduleName) {
  this.smallModule =
  `<div class="smallModuleButton moduleButton onclick="openModule()">`+
	`${moduleName}`+
  `</div>`;
}

function loadModules() {
	var filePath = `${__dirname}/Modules/`;

  Fs.readdir(filePath, function(err, modules) {
    modules.forEach(function (module) {
      if(!module.startsWith(`off_`)) {

        Fs.readFile((`${__dirname}/Modules/${module}/moduleinfo.json`), 'utf8', (err, moduleJsonString) => {
					console.log(err); //make nice looking error handler, might even make notif in-app
          var infoObject = JSON.parse(moduleJsonString);
          var moduleType = infoObject.module.type;
					var moduleName = infoObject.module.name;
					
					var listModule = new ModuleButton(moduleName);
					
					switch (moduleType) {
						case "installed": console.log('a');
						break;
						case "core": console.log('b');
						break;
						case "preview": console.log('c');
						break;
					}
        });
      }
    });
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
	console.log(destination);
	document.getElementById(`${destination}DC`).style.display = "block";
}
/*END MAINMENU*/



/*
Mousetrap.bind('esc', () => {
	//Open confirmation window
	//window.close();
	//console.log('%c Loaded', 'color:green; font-size: 1.5em');
})

window.onload = startUp;
function startUp() {
	getModules();
	fillChangelog();
}

function openModule() {
	var element  		= event.target;
	var destination = element.id;
	ipcRenderer.send('changePage', `${destination}`);
}

var ModuleButton = function (mType, mName) {
  this.defaultModule =
  `<div class="moduleButton ${mType}Style" id="${mName}" onclick="openModule()">`+
	`${mName}`+
  `</div>`;
	this.previewModule =
  `<div class="moduleButton ${mType}Style" id="${mName}">`+
	`${mName}`+
  `</div>`;
}

function getModules() {
  var filePath = `${__dirname}/Modules/`;

  Fs.readdir(filePath, function(err, modules) {
    modules.forEach(function (module) {
      if(!module.startsWith(`off_`)) {

        Fs.readFile((`${__dirname}/Modules/${module}/moduleinfo.json`), 'utf8', (err, moduleJsonString) => {
          var infoObject = JSON.parse(moduleJsonString);
          var moduleType = infoObject.module.type;
					var moduleName = infoObject.module.name;
					
					var listModule = new ModuleButton(moduleType, moduleName);
					
					switch (moduleType) {
						case "installed": document.getElementById("InstalledList").innerHTML = document.getElementById("InstalledList").innerHTML + listModule.defaultModule;
						break;
						case "core": document.getElementById("DefaultList").innerHTML = document.getElementById("DefaultList").innerHTML + listModule.defaultModule;
						break;
						case "preview": document.getElementById("DownloadList").innerHTML = document.getElementById("DownloadList").innerHTML + listModule.previewModule;
						break;
					}
        });
      }
    });
  });
}

async function fillChangelog() {
	var rawChangelog = await fetch((`${__dirname}/AppData/changelog.txt`)).then(response => response.text());

	var changelog = rawChangelog
    .split('|').join('<br>')
    .split('{').join('<div class="updateHeader"><span class="updateType">')
    .split('}').join('</span><br><span class="updateTitle">')
		.split('(').join('</span>&nbsp;&nbsp;<span class="updateVersion">(')
		.split(')').join(')</span></div>')
    .split('*').join('⦿&nbsp;')
		.split('^').join('&nbsp;&nbsp;•&nbsp;')
		.split('°').join('<hr>');

  document.getElementById("changelogContent").innerHTML = changelog;
}
*/