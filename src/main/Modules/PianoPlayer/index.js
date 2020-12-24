/*START Default Vars*/
const Mousetrap = require('mousetrap');
const { ipcRenderer } = require('electron');
const Fs = require('fs');
const Tone = require('tone');
const whiteNotes = [
	'1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
	'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'
];
const blackNotes = [
	'!', '@', '$', '%', '^', '*', '(',
	'Q', 'W', 'E', 'T', 'Y', 'I', 'O', 'P', 'S', 'D', 'G', 'H', 'J', 'L', 'Z', 'C', 'V', 'B'
];
const sheetObjects = [];
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
	if(keyObject.keyCode >= 48 && keyObject.keyCode <= 90) {
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
	whiteNotes.forEach(function (note) {
		var pianoKey = new PianoKey(note);
		createdKey = pianoKey.lightKey;
		document.getElementById(`lightKeyContainer`).innerHTML = document.getElementById(`lightKeyContainer`).innerHTML + createdKey;
	});
	blackNotes.forEach(function (note) {
		var pianoKey = new PianoKey(note);
		createdKey = pianoKey.darkKey;
		document.getElementById(`darkKeyContainer`).innerHTML = document.getElementById(`darkKeyContainer`).innerHTML + createdKey;
	});
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
	var filePath = `${__dirname}/Sheets/`;
	var counter = 0;
  Fs.readdir(filePath, function(err, sheets) {
    sheets.forEach(function (sheet) {
      if(sheet.startsWith(`VP_`) && sheet.endsWith(`.json`)) {
        Fs.readFile((`${__dirname}/Sheets/${sheet}`), 'utf8', (err, sheetJsonString) => {
					var sheetObject = JSON.parse(sheetJsonString);
					sheetObjects.push(sheetObject);
					if (sheet.includes(`HowTo`)) { sheetPos = counter; }
					counter++;
					displaySheetPreview();
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
	var sheetGenre = sheetObjects[sheetPos].data.genre;
	var sheetDifficulty = sheetObjects[sheetPos].data.difficulty;
	var sheetInstrument = sheetObjects[sheetPos].data.mainInstrument;
	var sheetSource = sheetObjects[sheetPos].data.source;
	var sheetYTUrl = sheetObjects[sheetPos].data.youtubeUrl;
	var sheetNotes = sheetObjects[sheetPos].sheets.VP.join('<br>');
	
	
	
	if (sheetInstrument == 'none') {
		document.getElementById('sheetInstrument').style.visibility = 'hidden';
	} else {
		document.getElementById('sheetInstrument').innerHTML = sheetInstrument;
		document.getElementById('sheetInstrument').style.visibility = 'visible';
	}
	if (sheetYTUrl == 'none') {
		document.getElementById('sheetYTButton').style.visibility = 'hidden';
	} else {
		document.getElementById('sheetYTButton').href = sheetYTUrl;
		document.getElementById('sheetYTButton').style.visibility = 'visible';
	}
	if (sheetSource == 'none') {
		document.getElementById('sheetSrcButton').style.visibility = 'hidden';
	} else {
		document.getElementById('sheetSrcButton').href = sheetSource;
		document.getElementById('sheetSrcButton').style.visibility = 'visible';
	}
	document.getElementById('sheetTitle').innerHTML = sheetTitle;
	
	document.getElementById('sheetNotes').innerHTML = sheetNotes;
}

function selectSheet() {
	
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
	switch (key) {
		case "1": note = 'C2'; break;
		case "2": note = 'D2'; break;
		case "3": note = 'E2'; break;
		case "4": note = 'F2'; break;
		case "5": note = 'G2'; break;
		case "6": note = 'A2'; break;
		case "7": note = 'B2'; break;
		case "8": note = 'C3'; break;
		case "9": note = 'D3'; break;
		case "0": note = 'E3'; break;
		case "q": note = 'F3'; break;
    case "w": note = 'G3'; break;
    case "e": note = 'A3'; break;
    case "r": note = 'B3'; break;
    case "t": note = 'C4'; break;
    case "y": note = 'D4'; break;
    case "u": note = 'E4'; break;
		case "i": note = 'F4'; break;
		case "o": note = 'G4'; break;
		case "p": note = 'A4'; break;
		case "a": note = 'B4'; break;
		case "s": note = 'C5'; break;
		case "d": note = 'D5'; break;
		case "f": note = 'E5'; break;
		case "g": note = 'F5'; break;
		case "h": note = 'G5'; break;
    case "j": note = 'A5'; break;
		case "k": note = 'B5'; break;
		case "l": note = 'C6'; break;
		case "z": note = 'D6'; break;
		case "x": note = 'E6'; break;
		case "c": note = 'F6'; break;
		case "v": note = 'G6'; break;
    case "b": note = 'A6'; break;
		case "n": note = 'B6'; break;
		case "m": note = 'C7'; break;
		
		case "!": note = 'C#2'; break;
		case "@": note = 'D#2'; break;
		
		case "$": note = 'F#2'; break;
		case "%": note = 'G#2'; break;
		case "^": note = 'A#2'; break;
		
		case "*": note = 'C#3'; break;
		case "(": note = 'D#3'; break;
		
		case "Q": note = 'F#3'; break;
    case "W": note = 'G#3'; break;
    case "E": note = 'A#3'; break;
		
    case "T": note = 'C#4'; break;
    case "Y": note = 'D#4'; break;
		
		case "I": note = 'F#4'; break;
		case "O": note = 'G#4'; break;
		case "P": note = 'A#4'; break;
		
		case "S": note = 'C#5'; break;
		case "D": note = 'D#5'; break;
		
		case "G": note = 'F#5'; break;
		case "H": note = 'G#5'; break;
    case "J": note = 'A#5'; break;
		
		case "L": note = 'C#6'; break;
		case "Z": note = 'D#6'; break;
		
		case "C": note = 'F#6'; break;
		case "V": note = 'G#6'; break;
    case "B": note = 'A#6'; break;
    default: return;
	}
	sampler.triggerAttackRelease(note, "2n");
	
	var keyLogger = document.getElementById(`keyLoggerCore`);
	
	keyLogger.innerHTML = keyLogger.innerHTML + key;
	keyLogger.scrollTo(0, keyLogger.scrollHeight);
	
	var noteKey = document.getElementById(`pKey_${key}`);
	
	if (noteKey.classList.contains('darkKey')) {
		noteKey.style.fontWeight = "bold";
		noteKey.style.backgroundColor = "#252525";
		setTimeout(() => {
			noteKey.style.fontWeight = "normal";
			noteKey.style.backgroundColor = "#454545";
		}, 250);
	} else {
		noteKey.style.fontWeight = "bold";
		noteKey.style.backgroundColor = "#DFDFDF";
		setTimeout(() => {
			noteKey.style.fontWeight = "normal";
			noteKey.style.backgroundColor = "#FFFFFF";
		}, 250);
	}
}
/*END NoteHandler*/


//String.fromCharCode(n1, n2, ..., nX)