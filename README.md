# E-Sports Manager

E-Sports Manager (ESM) is a Fantasy Football experienced wrapped up in an elegant, gamer-loving package tailored to the theme of League of Legends (LoL). This application allows its users to live out the fantasy of being an e-sports manager in the world of LoL. The system generates players who select new champions every season and battle against eachother. As a manager your job can be to train players until they become successful, or even just betting on the right people. You can buy players from the active roster or sell them for a gain or loss.

## Tech Stack

### Backend + API
1. Mongo/Mongoose
2. Express.js
3. NodeJS

### Frontend
1. Pug

**App is currently coupled (frontend and backend are in the same app). It would be nice to decouple (separate frontend + backend) the application.**

## Startup (Initialization)
1. You'll need Node.js (and npm) to run this project
2. Run `npm install`
3. Launch mongodb instance (or cluster) and configure mongodb settings in config/database.js
4. Once mongo is running, you should be able to kick the app off with `npm start PORT=XXXX` or `node app PORT=XXXX` where X is a number
5. Web application will be available at http://localhost:PORT (defaults to 1337)
6. Matches and player stats will accrue over time if the daemon.js file is running (`node daemon.js`) on a separate process

## Home Page
The home page provides links to the account creation, login, players, and roster pages. These pages are public by default, however logging in will grant you access to additional pages.
![Alt](/public/assets/images/static/screen-shot-home.png "Home Page")

## Players Page
On the players page you can see the active LoL players currently in the league. These players are generated by the system and are not real. By viewing their profile, you can see a player's story, their favorite champions, their age, and even their stats (wins, losses, etc.).
![Alt](/public/assets/images/static/screen-shot-players.png "Players Page")

## Roster Page
The roster page has the list of active players this season as well as their champion and lane. You can also see the cost and match history of a player on this page and whether or not their contract is available for purchase (assuming you have the funds).
![Alt](/public/assets/images/static/screen-shot-roster.png "Roster Page")

## Profile Page
After creating an account (with email or FB) and logging in, you will be redirected to your profile page. This is where you can see any players you currently have under contract as well as their stats. At any time you can sell a player, but depending on that player's performance you can gain or lose money.
![Alt](/public/assets/images/static/screen-shot-profile.png "Profile Page")

## Grow Page
This page allows you as a user to grow, either by paying to create your own player with random stats (whose contract comes with the purchase) or by becoming able to manage more players simultaneously. The cost of adding a player to your roster increases as you accumulate more slots.
![Alt](/public/assets/images/static/screen-shot-grow.png "Grow Page")

## Hire Page
As an E-Sports Manager, you can either hire an analyst or a trainer. Trainers motivate your players to perform better. Analysts observe play history and do the homework to equip you with the best prospects.
![Alt](/public/assets/images/static/screen-shot-hire.png "Hire Page")

## Train Page
Different trainers have different odds in successfully motivating your players more. Good enough trainers can also make significant strides in improving the mood of the players you manage.
![Alt](/public/assets/images/static/screen-shot-train.png "Train Page")
