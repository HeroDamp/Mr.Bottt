/*
* Mr.Bottt - Archivo de configuracion
* ADVERTENCIA: No editar lo que no sabes editar
*/

/*
* Datos del Servidor
*
* En dado caso de no saber los datos del servidor.
* ejecutar el comando 'node searchdata.js'.
*
* NOTA: Si el servidor es hosteado en Openshift
* establecer el puerto a '8000'
*/

exports.server = 'serverexample-kevinxzllz.rhcloud.com';

exports.port = 8000;

exports.serverid = 'serverexample-kevinxzllz.rhcloud.com:80';

/*
* Datos de Usuario
*
* Ingrese el nombre de usuario y la
* contraseña de la cuenta del bot.
* El bot debe contar con una cuenta 
* de showdown registrada
*/

exports.nick = ''; // EJ: exports.nick = 'Mr.Bottt';
exports.pass = ''; // EJ: exports.pass = '1234567890';

/*
* Salas privadas y publicas
*
* Indica a que salas entrara el bot
* al iniciar session. El Lobby esta por
* defecto
*/

exports.rooms = ['lobby'];

exports.privaterooms = []; //Salas Privadas

/*
* Command Token
*
* Indica el icono o token que 
* se usara para ejecutar los comandos
* del bot.
*
* OJO: No uses el "/".
*/

exports.commandcharacter = '.';

/*
* Excepciones
*/

exports.excepts = ['kevinxzllz'];

/*
* Rango limite de moderacion
* Selecciona el rango al cual apartir de este el bot no dara sanciones
*/ 

exports.defaultrank = '%';

/*
* Guia de comandos
*
* Especifica el link de la guia de comandos del bot
*/

exports.botguide = '';

/*
* Otros
*/

exports.debuglevel = 3;
exports.watchconfig = false;
exports.secprotocols = [];
exports.whitelist = [];
exports.allowmute = false;
exports.punishvals = {
	1: 'warn',
	2: 'mute',
	3: 'hourmute',
	4: 'roomban',
	5: 'ban'
};

