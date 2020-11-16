const Mousetrap = require('mousetrap');
const { ipcRenderer } = require('electron');

Mousetrap.bind('esc', () => {
	ipcRenderer.send('changePage', 'menu');
});
Mousetrap.bind(['command+r', 'ctrl+r', 'f5'], () => {
	window.location.reload();
});

window.onload = getSettings();

function menuReturn() {
	ipcRenderer.send('changePage', 'menu');
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