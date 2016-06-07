/*
* Mr-Bottt - Comandos.
*/

exports.commands = {
    
    info: 'about',
	about: function(arg, by, room, con) {
		if (this.hasRank(by, '~#&') || room.charAt(0) === ',') {
			var text = '';
		} else {
			var text = '/pm ' + by + ', ';
		}
		text += 'Hola!!... Soy ' + config.nick + ', un bot creado por **Kevinxzllz** (https://github.com/Kevinxzllz/Mr.Bottt).';
		this.say(con, room, text);
	},
	
	custom: function(arg, by, room, con) {
		if (!this.hasRank(by, '~')) return false;
		if (arg.indexOf('[') === 0 && arg.indexOf(']') > -1) {
			var tarRoom = arg.slice(1, arg.indexOf(']'));
			arg = arg.substr(arg.indexOf(']') + 1).trim();
		}
		this.say(con, tarRoom || room, arg);
	},
	
	tell: 'say',
	say: function(arg, by, room, con) {
		if (!this.canUse('say', room, by)) return false;
		this.say(con, room, stripCommands(arg) + '');
	},
	
	pick: function(arg, by, room, con) {
		if (arg.indexOf(',') === -1) {
			var choices = arg.split(' ');
		} else {
			var choices = arg.split(',');
		}
		choices = choices.filter(function(i) {return (toId(i) !== '')});
		if (choices.length < 2) return this.say(con, room, (room.charAt(0) === ',' ? '': '/pm ' + by + ', ') + '.choose: You must give at least 2 valid choices.');

		var choice = choices[Math.floor(Math.random()*choices.length)];
		this.say(con, room, ((this.canUse('choose', room, by) || room.charAt(0) === ',') ? '':'/pm ' + by + ', ') + stripCommands(choice));
	},
	
	'helix': function(arg, by, room, con) {
		if (this.canUse('helix', room, by) || room.charAt(0) === ',') {
			var text = '';
		} else {
			var text = '/pm ' + by + ', ';
		}

		var rand = ~~(13 * Math.random()) + 1;

		switch (rand) {
	 		case 1: text += "Para que quieres saber eso??... Jajajaja salu2."; break;
	  		case 2: text += "Definitivamente."; break;
			case 3: text += "Nose :v."; break;
			case 4: text += "No estoy seguro."; break;
			case 5: text += "La respuesta esta en tu corazon <3."; break;
			case 6: text += "Si."; break;
			case 7: text += "No."; break;
			case 8: text += "Obviamente.. nolose."; break;
			case 9: text += "Sabias que, el hablar con una inteligencia artificial es un sintoma de temprana calvicie?."; break;
			case 10: text += "Por que deberia saberlo?."; break;
			case 11: text += "Preguntale a Kevin."; break;
			case 12: text += "Magikarp!!."; break;
			case 13: text += "Me ves cara de SimsSimi o que?."; break;
		}
		this.say(con, room, text);
	}
    
};