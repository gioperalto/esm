// PlayerManager service
var PlayerManager = {

	getRank: function(elo) {
		if(elo < 1149) {
			return 'Bronze';
		} else if(elo < 1499) {
			return 'Silver';
		} else if(elo < 1849) {
			return 'Gold';
		} else if(elo < 2199) {
			return 'Platinum';
		} else if(elo < 2499) {
			return 'Diamond';
		} else {
			return 'Masters';
		}
	},

	getValue: function(elo) {
		if(elo < 1149) {
			return 0;
		} else if(elo < 1499) {
			return Math.floor(Math.pow(((elo/100)/3),2) - 5); 
		} else if(elo < 1849) {
			return Math.floor(Math.pow(((elo/100)/2),2) - 11);
		} else if(elo < 2199) {
			return Math.floor(Math.pow(((elo/100)/1.5),2));
		} else if(elo < 2499) {
			return Math.floor(Math.pow((elo/100),(((elo/100-22)/10)+2)));
		} else {
			return Math.floor(Math.pow((elo/100),(elo/1000)));
		}
	},

	createPlayer: function() {
		// Random player names
		var fNames = ['Aaron','Adam','Albert','Anthony','Arthur','Benjamin','Billy','Bobby','Brandon','Brian','Bruce',
		'Carl','Carlos','Charles','Chewy','Chris','Christopher','Clarence','Craig','Daniel','David','Dennis','Donald',
		'Douglas','Edward','Eric','Ernest','Eugene','Frank','Fred','Gary','George','Gerald','Gregory','Harold','Harry',
		'Mary','Patricia','Linda','Barbara','Elizabeth','Jennifer','Maria','Susan','Margaret','Dorothy','Lisa','Nancy',
		'Henry','Howard','Jack','James','Jason','Jeffrey','Jeremy','Jerry','Jesse','Jim','Jimmy','Joe','John','Johnny',
		'Jonathan','Jose','Joseph','Joshua','Juan','Justin','Keith','Kenneth','Kevin','Larry','Lawrence','Louis','Mark',
		'Martin','Matthew','Michael','Nicholas','Patrick','Paul','Peter','Philip','Phillip','Ralph','Randy','Raymond',
		'Karen','Betty','Helen','Sandra','Donna','Carol','Ruth','Sharon','Michelle','Laura','Sarah','Kimberly','Jessica',
		'Richard','Robert','Ronald','Roy','Russell','Ryan','Scott','Sean','Shawn','Stephen','Steve','Steven','Terry',
		'Thomas','Timothy','Todd','Victor','Walter','Wayne','William','Willie'];

		// Random last names
		var lNames = ['Smith','Johnson','Williams','Jones','Brown','Miller','Wilson','Moore','Taylor','Anderson','Thomas',
		'Jackson','White','Harris','Martin','Thompson','Garcia','Martinez','Robinson','Clark','Rodriguez','Lewis','Lee',
		'Walker','Hall','Allen','Young','Hernandez','King','Wright','Lopez','Hill','Scott','Green','Adams','Baker','Gonzalez',
		'Nelson','Carter','Mitchell','Perez','Roberts','Turner','Phillips','Campbell','Parker','Evans','Edwards','Collins',
		'Stewart','Sanchez','Morris','Rogers','Reed','Cook','Morgan','Bell','Murphy','Bailey','Rivera','Cooper','Richardson','Cox'];

		// Random roles
		var roles = ['Top','Mid','Jungle','Support','ADC'];

		// Random moods
		var moods = ['Motivated','Normal','Anxious','Bored','Apathetic'];

		// Hidden ELO factor lowest elo possible to be created 700 and highest 1300
		var elo_factor = Math.floor(Math.random() * 600)+700;

		// Random player images
		var images = [];
		for(var i = 1; i < 20; i++) {
			images.push('/images/player/default' + i + '.png');
		}

		// Creates player
		Player.create({
			name: fNames[Math.floor(Math.random() * fNames.length)] + " " + lNames[Math.floor(Math.random() * lNames.length)],
			role: roles[Math.floor(Math.random() * roles.length)],
			visible_elo: 1000,
			hidden_elo: elo_factor,
			mood: moods[Math.floor(Math.random() * moods.length)],
			age: 6 + Math.floor(Math.random() * 19),
			rank:  this.getRank(1000),
			value: this.getValue(1000),
			picture: images[Math.floor(Math.random() * images.length)],
			owner: ''
		}).done(function createCreatePlayer(err, plyr) {
			if(err) {
				console.log('Error creating player!');
			} else {
				console.log('Player created!');
				console.log(plyr);
			}
		});
	}
	
};

module.exports = PlayerManager;