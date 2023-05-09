const path = require('path');
const util = require('util');

let verbosity = 2;

const colors = {
    ColorReset: "\x1b[0m",
    ColorRed: "\x1b[1;31m",
    ColorDGreen: "\x1b[32m",
    ColorLGreen: "\x1b[1;32m",
    ColorBrown: "\x1b[33m",
    ColorYellow: "\x1b[1;33m",
    ColorDBlue: "\x1b[34m",
    ColorLBlue: "\x1b[1;34m",
    ColorDPurple: "\x1b[35m",
    ColorLPurple: "\x1b[1;35m",
    ColorDCyan: "\x1b[36m",
    ColorLCyan: "\x1b[1;36m",
    ColorGrey: "\x1b[37m",
    ColorWhite: "\x1b[1;37m"
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

//Defini les couleur selon le niveau de log
const colorPerChar = {
    'E': colors.ColorRed,
    'U': colors.ColorLPurple,
    'W': colors.ColorYellow,
    'I': colors.ColorLGreen,
    'D': colors.ColorLBlue,
    'd': colors.ColorDBlue,
    'F': colors.ColorDGreen,
    'u': colors.ColorBrown,
    'v': colors.ColorDPurple,
    'M': colors.ColorDCyan,
    'm': colors.ColorGrey
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

    const logColor = colorPerChar[msg[0]];
    const colorEnabled = true; // Votre choix ici pour activer ou désactiver la couleur

    const stack = new Error().stack.split("\n");
    const fileLine = stack[2].split(' ').slice(-1)[0].split(':');
    const file = path.basename(fileLine[0]);
    const line = fileLine[1];

    const currentDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
			// Format: '2012-11-04 14:55:45';

    if (lvl <= verbosity) {
	const logs = `${logColor}${util.format(msg, ...args)}${colors.ColorReset}`
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

function SetVerbosity(lvl) {
    verbosity = lvl;
}

module.exports = {
    Applog,
    SetVerbosity
};
