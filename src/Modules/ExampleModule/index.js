const Mousetrap = require('mousetrap');										//Mousetrap is a node module used to make local keybinds
const MultyTool = require(__dirname+'/../../globalFunction.js'); //Default MultyTool functions to use in your module

Mousetrap.bind('esc', () => {															//Default function to return the user to the menu by pressing [ESC]
	MultyTool.app.goToModule('menu');
});
Mousetrap.bind(['command+r', 'ctrl+r', 'f5'], () => {			//Default function to reload the page with keybinds
	window.location.reload();
});