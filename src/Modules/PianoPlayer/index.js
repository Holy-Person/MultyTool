// TODO: restyle sheetviewer, maybe like actual sheets, also add a marker showing you can play in sheet-view

/*START Default Vars*/
const Mousetrap = require('mousetrap');
const { ipcRenderer } = require('electron');
const Fs = require('fs');
const Tone = require('tone');
const whiteNotesQWERTY = [
	'1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
	'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'
];
const blackNotesQWERTY = [
	'!', '@', '$', '%', '^', '*', '(',
	'Q', 'W', 'E', 'T', 'Y', 'I', 'O', 'P', 'S', 'D', 'G', 'H', 'J', 'L', 'Z', 'C', 'V', 'B'
];
var fullNotes = [];
var sheetObjects = [];
var sheetPos = 0;
//Unused vars
var acceptedYoutubeWarning = false;
var userExp = 0;
/*END Default Vars*/


/*START Keyboard Controls*/
Mousetrap.bind('esc', () => {
	goBack();
});
Mousetrap.bind('tab', () => {
	toggleSheetSelector();
});
Mousetrap.bind(['command+r', 'ctrl+r', 'f5'], () => {
	window.location.reload();
});
Mousetrap.bind('left', () => {
	moveSheetSelector('left');
});
Mousetrap.bind('right', () => {
	moveSheetSelector('right');
});
function goBack() {
	ipcRenderer.send('changePage', 'menu');
}

window.addEventListener("keydown", keyPress);
function keyPress(keyObject) {
	if (keyObject.repeat) { return; }
	if(whiteNotesQWERTY.includes(keyObject.key) || blackNotesQWERTY.includes(keyObject.key)) {
		handleNote(keyObject.key);
	}
}
/*END Keyboard Controls*/



/*START Load*/
window.onload = startUp;
function startUp() {
	loadPianoKeys();
	loadSheets();
}

function loadPianoKeys() {
	whiteNotesQWERTY.forEach(function (note) {
		var pianoKey = new PianoKey(note);
		createdKey = pianoKey.lightKey;
		document.getElementById(`lightKeyContainer`).innerHTML = document.getElementById(`lightKeyContainer`).innerHTML + createdKey;
	});
	blackNotesQWERTY.forEach(function (note) {
		var pianoKey = new PianoKey(note);
		createdKey = pianoKey.darkKey;
		document.getElementById(`darkKeyContainer`).innerHTML = document.getElementById(`darkKeyContainer`).innerHTML + createdKey;
	});
	
	fullNotes = whiteNotesQWERTY.concat(blackNotesQWERTY);
}

var PianoKey = function (note) {
  this.lightKey =
  `<div class="pianoKey lightKey" id="pKey_${note}" onmousedown="handleNote('${note}')">`+
		`${note}`+
  `</div>`;
	this.darkKey =
	`<div class="pianoKey darkKey" id="pKey_${note}" onmousedown="handleNote('${note}')">`+
		`${note}`+
  `</div>`;
}

function loadSheets() {
	const filePath = `${__dirname}/Sheets/`;
	var counter = 0;
	var introPage;
  Fs.readdir(filePath, function(err, sheets) {
    sheets.forEach(function (sheet) {
      if(sheet.startsWith(`VP_`) && sheet.endsWith(`.json`)) {
        Fs.readFile((`${__dirname}/Sheets/${sheet}`), 'utf8', (err, sheetJsonString) => {
					var sheetObject = JSON.parse(sheetJsonString);
					if (sheet.startsWith(`VP_HowTo`)) { introPage = sheetObject; } else { sheetObjects.push(sheetObject); }
					counter++;
					if (counter >= sheets.length) {
						sheetObjects.sort(function(a, b) {
							let fa = a.data.title.toLowerCase(),
				        	fb = b.data.title.toLowerCase();
							if (fa < fb) {
								return -1;
							} else if (fa > fb) {
								return 1;
							}
							return 0;
						});
						sheetObjects.unshift(introPage);
						displaySheetPreview();
					}
        });
      }
    });
  });
}
/*END Load*/



/*START SHEETSELECTOR*/
function toggleSheetSelector() {
	var screenBlocker = 					document.getElementById('screenBlocker');
	var sheetSelectorContainer = 	document.getElementById('sheetSelectorContainer');
	if (sheetSelectorContainer.style.display == 'block') {
		screenBlocker.style.display = 'none';
		sheetSelectorContainer.style.display = 'none';
	} else {
		screenBlocker.style.display = 'block';
		sheetSelectorContainer.style.display = 'block';
	}
}

function moveSheetSelector(direction) {
	if (direction == 'left') { sheetPos--; } else { sheetPos++; }
	if (sheetPos < 0) { sheetPos = sheetObjects.length - 1; }
	if (sheetPos >= sheetObjects.length) { sheetPos = 0; }
	displaySheetPreview();
}

function displaySheetPreview() {
	var sheetTitle = sheetObjects[sheetPos].data.title;
	var sheetAuthor = sheetObjects[sheetPos].data.author;
	var sheetOrigin = sheetObjects[sheetPos].data.origin;
	var sheetGenre = sheetObjects[sheetPos].data.genre;
	var sheetDifficulty = sheetObjects[sheetPos].data.difficulty;
	var sheetInstrument = sheetObjects[sheetPos].data.mainInstrument;
	var sheetSource = sheetObjects[sheetPos].data.source;
	var sheetYTUrl = sheetObjects[sheetPos].data.youtubeUrl;
	var sheetNotes = sheetObjects[sheetPos].sheets.VP.join('<br>');
	
	document.getElementById('sheetTitle').innerHTML = sheetTitle;
	document.getElementById('sheetNotes').innerHTML = sheetNotes;
	
	if (sheetAuthor == 'none') {
		document.getElementById('sheetAuthor').style.display = 'none';
	} else {
		document.getElementById('sheetAuthor').innerHTML = sheetAuthor;
		document.getElementById('sheetAuthor').style.display = 'inline';
	}
	if (sheetGenre == 'none') {
		document.getElementById('sheetGenre').style.display = 'none';
	} else {
		document.getElementById('sheetGenre').innerHTML = sheetGenre;
		document.getElementById('sheetGenre').style.display = 'inline';
	}
	
	if (sheetDifficulty == 'none') {
		document.getElementById('sheetDifficulty').style.display = 'none';
	} else {
		document.getElementById('sheetDifficulty').innerHTML = sheetDifficulty;
		document.getElementById('sheetDifficulty').style.display = 'inline';
	}
	if (sheetOrigin == 'none') {
		document.getElementById('sheetOrigin').style.display = 'none';
	} else {
		document.getElementById('sheetOrigin').innerHTML = sheetOrigin;
		document.getElementById('sheetOrigin').style.display = 'inline';
	}
	
	if (sheetYTUrl == 'none') {
		document.getElementById('sheetYTButton').style.display = 'none';
	} else {
		document.getElementById('sheetYTButton').href = sheetYTUrl;
		document.getElementById('sheetYTButton').style.display = 'inline';
	}
	if (sheetSource == 'none') {
		document.getElementById('sheetSrcButton').style.display = 'none';
	} else {
		document.getElementById('sheetSrcButton').href = sheetSource;
		document.getElementById('sheetSrcButton').style.display = 'inline';
	}
	
	if (sheetInstrument == 'none') {
		document.getElementById('sheetInstrument').style.display = 'none';
	} else {
		document.getElementById('sheetInstrument').innerHTML = sheetInstrument;
		document.getElementById('sheetInstrument').style.display = 'inline';
	}
}

function selectSheet() {
	console.log('executed unused function \'selectSheet\'');
	toggleSheetSelector();
}
/*END SHEETSELECTOR*/



/*START NoteHandler*/
//const synth = new Tone.Synth().connect(vol).toDestination();
//synth.oscillator.type = "sine";
const vol = new Tone.Volume(-100).toDestination();
const sampler = new Tone.Sampler({
	urls: {
		A0: "A0.mp3",
		C1: "C1.mp3",
		"D#1": "Ds1.mp3",
		"F#1": "Fs1.mp3",
		A1: "A1.mp3",
		C2: "C2.mp3",
		"D#2": "Ds2.mp3",
		"F#2": "Fs2.mp3",
		A2: "A2.mp3",
		C3: "C3.mp3",
		"D#3": "Ds3.mp3",
		"F#3": "Fs3.mp3",
		A3: "A3.mp3",
		C4: "C4.mp3",
		"D#4": "Ds4.mp3",
		"F#4": "Fs4.mp3",
		A4: "A4.mp3",
		C5: "C5.mp3",
		"D#5": "Ds5.mp3",
		"F#5": "Fs5.mp3",
		A5: "A5.mp3",
		C6: "C6.mp3",
		"D#6": "Ds6.mp3",
		"F#6": "Fs6.mp3",
		A6: "A6.mp3",
		C7: "C7.mp3",
		"D#7": "Ds7.mp3",
		"F#7": "Fs7.mp3",
		A7: "A7.mp3",
		C8: "C8.mp3"
	},
	baseUrl: "https://tonejs.github.io/audio/salamander/",
	release: 1
}).connect(vol).toDestination();

function handleNote(key) {
	var note = '';
	switch (fullNotes.indexOf(key) ) {
		case 0: note = 'C2'; break;
		case 1: note = 'D2'; break;
		case 2: note = 'E2'; break;
		case 3: note = 'F2'; break;
		case 4: note = 'G2'; break;
		case 5: note = 'A2'; break;
		case 6: note = 'B2'; break;
		case 7: note = 'C3'; break;
		case 8: note = 'D3'; break;
		case 9: note = 'E3'; break;
		
		case 10: note = 'F3'; break;
    case 11: note = 'G3'; break;
    case 12: note = 'A3'; break;
    case 13: note = 'B3'; break;
    case 14: note = 'C4'; break;
    case 15: note = 'D4'; break;
    case 16: note = 'E4'; break;
		case 17: note = 'F4'; break;
		case 18: note = 'G4'; break;
		case 19: note = 'A4'; break;
		case 20: note = 'B4'; break;
		case 21: note = 'C5'; break;
		case 22: note = 'D5'; break;
		case 23: note = 'E5'; break;
		case 24: note = 'F5'; break;
		case 25: note = 'G5'; break;
    case 26: note = 'A5'; break;
		case 27: note = 'B5'; break;
		case 28: note = 'C6'; break;
		case 29: note = 'D6'; break;
		case 30: note = 'E6'; break;
		case 31: note = 'F6'; break;
		case 32: note = 'G6'; break;
    case 33: note = 'A6'; break;
		case 34: note = 'B6'; break;
		case 35: note = 'C7'; break;
		
		case 36: note = 'C#2'; break;
		case 37: note = 'D#2'; break;
		
		case 38: note = 'F#2'; break;
		case 39: note = 'G#2'; break;
		case 40: note = 'A#2'; break;
		
		case 41: note = 'C#3'; break;
		case 42: note = 'D#3'; break;
		
		case 43: note = 'F#3'; break;
    case 44: note = 'G#3'; break;
    case 45: note = 'A#3'; break;
		
    case 46: note = 'C#4'; break;
    case 47: note = 'D#4'; break;
		
		case 48: note = 'F#4'; break;
		case 49: note = 'G#4'; break;
		case 50: note = 'A#4'; break;
		
		case 51: note = 'C#5'; break;
		case 52: note = 'D#5'; break;
		
		case 53: note = 'F#5'; break;
		case 54: note = 'G#5'; break;
    case 55: note = 'A#5'; break;
		
		case 56: note = 'C#6'; break;
		case 57: note = 'D#6'; break;
		
		case 58: note = 'F#6'; break;
		case 59: note = 'G#6'; break;
    case 60: note = 'A#6'; break;
    default: return;
	}
	sampler.triggerAttackRelease(note, "2n");
	
	const keyLogger = document.getElementById(`keyLoggerCore`);
	
	keyLogger.innerHTML = keyLogger.innerHTML + key;
	keyLogger.scrollTo(0, keyLogger.scrollHeight);
	
	const noteKey = document.getElementById(`pKey_${key}`);
	
	noteKey.style.fontWeight = "bold";
	if (noteKey.classList.contains('darkKey')) {
		noteKey.style.boxShadow = "1px 1px 1px #404040";
		setTimeout(() => {
			noteKey.style.fontWeight = "normal";
			noteKey.style.backgroundColor = "#454545";
			noteKey.style.boxShadow = "3px 0px 3px #202020, 1px 2px 3px #202020, inset 0px 12px 8px -10px #202020";
		}, 250);
	} else {
		noteKey.style.filter = "brightness(90%)";
		noteKey.style.boxShadow = "1px 1px 1px #404040, inset 0px 18px 8px -10px #202020, inset 4px 0px 4px -3px #202020";
		setTimeout(() => {
			noteKey.style.filter = "none";
			noteKey.style.fontWeight = "normal";
			noteKey.style.backgroundColor = "#FFFFFF";
			noteKey.style.boxShadow = "1px 5px 3px #404040, inset 0px 15px 8px -10px #202020";
		}, 250);
	}
}
/*END NoteHandler*/

function toggleKeyLogger() {
	const keyLogger = document.getElementById(`keyLogger`);
	const keyLoggerCore = document.getElementById(`keyLoggerCore`);
	if (keyLoggerCore.style.display === 'none') {
		keyLogger.style.height = '200px';
		keyLogger.style.resize = 'both';
		keyLoggerCore.style.display = 'block';
	} else {
		keyLogger.style.height = '25px';
		keyLogger.style.resize = 'none';
		keyLoggerCore.style.display = 'none';
	}
	keyLogger.style.width = '300px';
}