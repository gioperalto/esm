# E-Sports Manager

E-Sports Manager (ESM) is a Fantasy Football experienced wrapped up in an elegant, gamer-loving package tailored to the theme of League of Legends (LoL). This application allows its users to live out the fantasy of being an e-sports manager in the world of LoL. The system generates players who select new champions every season and battle against eachother. As a manager your job can be to train players until they become successful, or even just betting on the right people. You can buy players from the active roster or sell them for a gain or loss.

## Tech Stack
### Backend (MEN)
1. Mongo/Mongoose
2. Express.js
3. NodeJS

### Frontend (P)
1. Pug

**App is currently coupled (frontend and backend are in the same app). It would be nice to decouple (separate frontend + backend) the application.**

## Startup (Initialization)
1. Launch mongodb instance (or cluster) and configure mongodb settings in config/database.js
2. Once mongo is running, you should be able to kick the app off with `npm start PORT=XXXX` or `node app PORT=XXXX` where X is a number
3. Web application will be available at http://localhost:PORT (defaults to 1337)

## Home Page
The home page provides links to the account creation, login, players, and rosters pages. These pages are public by default, however logging in will grant you access to additional pages.
![Alt](/public/assets/images/static/screen-shot-home.png "Home Page")

## Players Page
On the players page you can see the active LoL players currently in the league. These players are generated by the system and are not real. By viewing their profile, you can see a player's story, their favorite champions, their age, and even their stats (wins, losses, etc.).
![Alt](/public/assets/images/static/screen-shot-players.png "Players Page")
