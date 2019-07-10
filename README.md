# E-Sports Manager

A Fantasy Football experienced wrapped up in a beautiful gamer-loving package suited to League of Legends.

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
![Alt](/public/assets/static/screen-shot-home.png "Home Page")
