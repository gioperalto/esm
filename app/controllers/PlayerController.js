// app/controllers/PlayerController.js

// Import Player model
var Player = require('../models/Player');

// Import Champion controller
var ChampionController = require('../controllers/ChampionController');

module.exports = {
  getPlayers: function(callback) {
    Player
      .find({})
      .exec(function(err, players) {
          callback(players, err);
      });
  },

  addChampions: function(arr, i, end) {
    if(i < end) {
      ChampionController.getRandomChampion(function(champion, err) {
        if(err) {
          console.log(err);
        }

        console.log('Adding to list of champions...');
        console.log(champion);
        arr.push(champion);
        module.exports.addChampions(arr,i + 1,end);
      });
    } else {
      return;
    }
  },

  createPlayer: function(callback) {
    // TODO: Create utility class for usernames, first names, last names, champions, age, story

    // username
    var uname_part1_arr = [
      'King', 'Ace', 'Shooter', 'Slayer', 'Goon', 'Rabbit', 'Savage', 'Ghost',
      'Merc', 'Reaper', 'Wan', 'Tofu', 'Yeti', 'Pig', 'Dawg', 'Dog', 'Wolf', 'Major',
      'Turtle', 'Monster', 'Uzi', 'Lil', 'Choppa', 'Tree', 'Herb', 'Elite', ''
    ];
    var uname_part2_arr = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ' ', 'The', '_', 'Le'
    ];
    var uname_part3_arr = [
      'Trapper', 'Big', 'Gigantic', 'Huge', 'Shrimp', 'Scrawn', 'Brawn', 'Horrid',
      'Soul', 'Shell', 'Bullet', 'Magic', 'Swerve', 'Money', 'Tree', 'Pen', 'Slayer',
      'Warrior', 'Vert', 'Key', 'Solid', 'Metal', 'Gear', 'Ribbit', 'Grim', 'Wall', ''
    ];
    var random_uname = uname_part1_arr[Math.floor(Math.random() * uname_part1_arr.length)]
    + uname_part2_arr[Math.floor(Math.random() * uname_part2_arr.length)]
    + uname_part3_arr[Math.floor(Math.random() * uname_part3_arr.length)];

    // first + last names
    var first_names = [
      'Bill', 'John', 'Jeanie', 'Jennifer', 'Kelly', 'Jen', 'Joe', 'Jimmy', 'Will', 'Wally',
      'Ashley', 'Ashton', 'Ariel', 'Gabriel', 'Manny', 'Dan', 'Crystal', 'Krystal', 'Tammy',
      'Agatha', 'Maria', 'Mariel', 'Allison', 'Shaun', 'Sean', 'Drew', 'Gio', 'Peter', 'Pete',
      'Johnny', 'Steven', 'Stephen', 'Daniel', 'Danny', 'Xavier', 'Kenny', 'Ron', 'Ronald',
      'Kathy', 'Katherine', 'Cassandra', 'Kassandra', 'Christina', 'Cristina', 'Kristina',
      'Carlos', 'Carl', 'Javier', 'Melissa', 'Janet', 'Michael', 'Keith', 'Charles', 'Brian',
      'Amy', 'Jennifer', 'Alex', 'Alexander', 'Matthew', 'Ryan', 'Zachary', 'Lucas', 'Victoria'
    ];
    var last_names = [
      'Carl', 'Isatora', 'Nikimi', 'Shaw', 'Lucas', 'Field', 'Bond', 'Brown', 'Charleston', 'Hob',
      'Wall', 'Lore', 'Lane', 'Rivera', 'Gonzalez', 'Dominguez', 'Hertz', 'Shone', 'Rud', 'James',
      'Gates', 'Johnson', 'Reid', 'Reed', 'Warren', 'Cuban', 'Cobain', 'Marks', 'Anthony', 'Saddler',
      'Horace', 'Barrio', 'Polk', 'Diaz', 'Diez', 'Rafael', 'Shane', 'Rand', 'Austin', 'Cooper', 'Fong',
      'Edwards', 'Rogers', 'Gomez', 'Hurt', 'Watt', 'Ryan', 'Pence', 'Bush', 'Kennedy', 'Washington'
    ];

    // moods[Math.floor(Math.random() * moods.length)]

    ChampionController.getRandomChampions(function(champs, err) {
        if(err) {
          callback(err);
        }

        var player = new Player({
          username: random_uname,
          name: {
            first: first_names[Math.floor(Math.random() * first_names.length)],
            last: last_names[Math.floor(Math.random() * last_names.length)]
          },
          champions: champs,
          age: Math.floor(Math.random() * 19) + 6
        });

        player.save(function(err) {
          if(err) {
            callback(err);
          }

          callback(player);
        });
    });

    
  }
};