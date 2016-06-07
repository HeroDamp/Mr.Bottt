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
    
};