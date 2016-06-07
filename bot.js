/*
* Mr.Bottt - Archivo Principal
*/

// Datos de consola
global.info = function(text) {
	if (config.debuglevel > 3) return;
	if (!colors) global.colors = require('colors');
	console.log('info'.cyan + '  ' + text);
};

global.debug = function(text) {
	if (config.debuglevel > 2) return;
	if (!colors) global.colors = require('colors');
	console.log('debug'.blue + ' ' + text);
};

global.recv = function(text) {
	if (config.debuglevel > 0) return;
	if (!colors) global.colors = require('colors');
	console.log('recv'.grey + '  ' + text);
};

global.cmdr = function(text) { // receiving commands
	if (config.debuglevel !== 1) return;
	if (!colors) global.colors = require('colors');
	console.log('cmdr'.grey + '  ' + text);
};

global.dsend = function(text) {
	if (config.debuglevel > 1) return;
	if (!colors) global.colors = require('colors');
	console.log('send'.grey + '  ' + text);
};

global.error = function(text) {
	if (!colors) global.colors = require('colors');
	console.log('error'.red + ' ' + text);
};

global.ok = function(text) {
	if (config.debuglevel > 4) return;
	if (!colors) global.colors = require('colors');
	console.log('ok'.green + '    ' + text);
};

global.toId = function(text) {
	return text.toLowerCase().replace(/[^a-z0-9]/g, '');
};

global.stripCommands = function(text) {
	return ((text.trim().charAt(0) === '/') ? '/' : ((text.trim().charAt(0) === '!') ? ' ':'')) + text.trim();
};

global.send = function(connection, data) {
	if (connection.connected) {
		if (!(data instanceof Array)) {
			data = [data.toString()];
		}
		data = JSON.stringify(data);
		dsend(data);
		connection.send(data);
	}
};


// Instalacion automatica de Dependencias mediante el 'runNpm'
function runNpm(command) {
	console.log('Ejecutando el comando `npm ' + command + '`...');

	var child_process = require('child_process');
	var npm = child_process.spawn('npm', [command]);

	npm.stdout.on('data', function(data) {
		process.stdout.write(data);
	});

	npm.stderr.on('data', function(data) {
		process.stderr.write(data);
	});

	npm.on('close', function(code) {
		if (!code) {
			child_process.fork('bot.js').disconnect();
		}
	});
}

try {
	require('sugar');
	require('colors');
	require('websocket');
	
	global.colors = require('colors');
	global.config = require('./config.js');
	global.fs = require('fs');
	global.sys = require('sys');
    global.WebSocketClient = require('websocket').client;
} catch (e) {
	console.log('No se encontraron las dependencias!... Se procedera a instalarlas');
	return runNpm('install');
}

console.log('------------------------------------'.yellow);
console.log('|          Iniciando Bot!          |'.yellow);
console.log('------------------------------------'.yellow);
console.log('');


info('Cargando...');

// Datos
global.Commands = require('./commands.js').commands;
global.Parse = require('./command-parser.js').parse;

var connect = function(retry) {
	if (retry) {
		info('retrying...');
	}

	var bottt = new WebSocketClient();

	bottt.on('connectFailed', function(err) {
		error('No se pudo conectar al servidor ' + config.server + ' : ' + sys.inspect(err));
		info('Reintentando en 1 minuto...');

		setTimeout(function() {
			connect(true);
		}, 60000);
	});

	bottt.on('connect', function(connection) {
		ok('Conexion exitosa al servidor ' + config.server);

		connection.on('error', function(err) {
			error('Conexion fallida:: ' + sys.inspect(err));
		});

		connection.on('close', function() {
			error('Conexion interrumpida: ' + sys.inspect(arguments));
			info('Reintentando en 1 minuto...');

			setTimeout(function() {
				connect(true);
			}, 60000);
		});

		connection.on('message', function(message) {
			if (message.type === 'utf8') {
				recv(sys.inspect(message.utf8Data));
				Parse.data(message.utf8Data, connection);
			}
		});
	});

	var id = ~~(Math.random() * 900) + 100;
	var chars = 'abcdefghijklmnopqrstuvwxyz0123456789_';
	var str = '';
	for (var i = 0, l = chars.length; i < 8; i++) {
		str += chars.charAt(~~(Math.random() * l));
	}

	var conStr = 'ws://' + config.server + ':' + config.port + '/showdown/' + id + '/' + str + '/websocket';
	info('conectado a ' + conStr + ' - protocolos secundarios: ' + sys.inspect(config.secprotocols));
	bottt.connect(conStr, config.secprotocols);
};

connect();
