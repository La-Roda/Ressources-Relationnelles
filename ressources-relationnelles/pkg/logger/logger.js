const path = require('path');
const util = require('util');
const os = require('os');

let verbosity = 2;

//défini les codes couleurs pour les système Unix
const unixColors = {
    UnixColorReset: "\x1b[0m",
    UnixColorRed: "\x1b[1;31m",
    UnixColorDGreen: "\x1b[1;32m",
    UnixColorLGreen: "\x1b[1;92m",
    UnixColorBrown: "\x1b[1;33m",
    UnixColorYellow: "\x1b[1;93m",
    UnixColorDBlue: "\x1b[1;34m",
    UnixColorLBlue: "\x1b[1;94m",
    UnixColorDPurple: "\x1b[1;35m",
    UnixColorLPurple: "\x1b[1;95m",
    UnixColorDCyan: "\x1b[1;36m",
    UnixColorLCyan: "\x1b[1;96m",
    UnixColorGrey: "\x1b[1;37m",
    UnixColorWhite: "\x1b[1;97m"
};


//défini les codes couleurs pour les système Windows
const windowsColors = {
    WindowsColorReset: "\u001b[0m",
    WindowsColorRed: "\u001b[1;31m",
    WindowsColorDGreen: "\u001b[1;32mm",
    WindowsColorLGreen: "\u001b[1;92m",
    WindowsColorBrown: "\u001b[1;93m",
    WindowsColorYellow: "\u001b[1;93m",
    WindowsColorDBlue: "\u001b[1;34m",
    WindowsColorLBlue: "\u001b[1;94m",
    WindowsColorDPurple: "\u001b[1;35m",
    WindowsColorLPurple: "\u001b[1;95m",
    WindowsColorDCyan: "\u001b[1;36m",
    WindowsColorLCyan: "\u001b[1;96m",
    WindowsColorGrey: "\u001b[1;37m",
    WindowsColorWhite: "\u001b[1;97m"
};


//Defini le le niveau de log en fonction du type de message
const levelPerChar = {
  'E': -1,
  'U': -1,
  'W': 1,
  'I': 2,
  'D': 3,
  'd': 4,
  'F': 5,
  'u': 5,
  'v': 6,
  'M': 7,
  'm': 8
};

//Defini les couleur selon le niveau de log pour systeme Unix
const unixColorPerChar = {
    'E': unixColors.UnixColorRed,
    'U': unixColors.UnixColorLPurple,
    'W': unixColors.UnixColorYellow,
    'I': unixColors.UnixColorLGreen,
    'D': unixColors.UnixColorLBlue,
    'd': unixColors.UnixColorDBlue,
    'F': unixColors.UnixColorDGreen,
    'u': unixColors.UnixColorBrown,
    'v': unixColors.UnixColorDPurple,
    'M': unixColors.UnixColorDCyan,
    'm': unixColors.UnixColorGrey
};

//Defini les couleur selon le niveau de log pour systeme Windows
const windowsColorPerChar = {
    'E': windowsColors.WindowsColorRed,
    'U': windowsColors.WindowsColorLPurple,
    'W': windowsColors.WindowsColorYellow,
    'I': windowsColors.WindowsColorLGreen,
    'D': windowsColors.WindowsColorLBlue,
    'd': windowsColors.WindowsColorDBlue,
    'F': windowsColors.WindowsColorDGreen,
    'u': windowsColors.WindowsColorBrown,
    'v': windowsColors.WindowsColorDPurple,
    'M': windowsColors.WindowsColorDCyan,
    'm': windowsColors.WindowsColorGrey
};

const args = []

function Applog(msg, ...args) {
    if (msg === "") {
	return;
    }

    let lvl = levelPerChar[msg[0]];
    if (lvl === undefined) {
	lvl = 10;
    }

    const [logColor, colorReset] = SetColor(msg)
    if (logColor == "") {
	return;
    }
    const colorEnabled = true; // Votre choix ici pour activer ou désactiver la couleur

    const stack = new Error().stack.split("\n");
    const fileLine = stack[2].split(' ').slice(-1)[0].split(':');
    const file = path.basename(fileLine[0]);
    const line = fileLine[1];

    const currentDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
			// Format: '2012-11-04 14:55:45';

    if (lvl <= verbosity) {
	const logs = `${logColor}${util.format(msg, ...args)}${colorReset}`
	switch(lvl){
	case 3:
	    console.log(`[${currentDate}| ${file}:${line}] ${logs}`);
	    break;
	case 4:
	    console.log(`[${currentDate}| ${file}:${line}] ${logs}`);
	    break;
	default:
	    console.log(`[${currentDate}] ${logs}`);
	}
    }
}

function SetColor(msg) {
    const plateform = os.platform();
    if (plateform == "win32") {
	const logColor = windowsColors.WindowsColorPerChar[msg[0]];
	const reset =  WindowsColorReset;
	return [logColor, reset]
    } else if ((plateform == "linux") || (plateform == "darwin")) {
	const logColor = unixColorPerChar[msg[0]];
	const reset =  unixColors.UnixColorReset;
	return [logColor, reset];
    } else {
	console.log("Erreur: Système non supporté\n");
	return ["", ""];
    } 
}


function SetVerbosity(lvl) {
    verbosity = lvl;
}

module.exports = {
    Applog,
    SetVerbosity
};
