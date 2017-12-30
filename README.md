# PaperBattleships
A battleship style game built with [React](https://reactjs.org/) and bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)

## Requirements 
To run or build the game make sure you have [npm](https://www.npmjs.com/). The best way to get npm is to install [Node](https://nodejs.org/en/).

## Install
To install simply clone or download this repository and run the following command in the corrisponding folder:
```
$ npm install
```

## Running 
The simplest way to run the game is to navigate to the folder containing the game and run:
```
$ npm start
```
Then open your browser to http://localhost:3000/ 


## Building
The above instructons run the game in development mode. To create a production build run:
```
$ npm run build
```

## Deploying
After running `npm run build` serve the `build` directory with an HTTP server.

For example:
```
$ npm install serve
$ serve -s build
```


## Config
Edit the GameConfig object in `src/config/GameConfig.js` to change game settings.


## Folder Structure
```
.
├── docs
├── public
└── src
    ├── components
    ├── config
    ├── containers
    ├── css
    ├── helpers
    └── res
```
- `docs/` is documentation folder created by jsdoc
- `public` contains the html template and assets not processed by webpack
- `src/` contains the games code
  - `src/components/` contains presentational react components
  - `src/container/` contains container react components
  - `src/css` contains stylesheets
  - `src/helpers` contains shared helper code/functions
  - `src/res` contains resources such as images and text
  - `src/config` contains config files