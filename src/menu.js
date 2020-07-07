const Mousetrap = require('mousetrap');

Mousetrap.bind(['command+r', 'ctrl+r', 'f5'], () => {
	window.location.reload();
})