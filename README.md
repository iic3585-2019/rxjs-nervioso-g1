# Nervioso

This repo contains the code to run the game 'Nervioso' on your browser.
This project uses `node` and `yarn`.

## Setup

Clone the repo and install the dependencies using the followinf command:

```
yarn
```

## Run the game

To run the game you have to run the following command
```
yarn start
```

Then visit `localhost:8080` and there you go!

## Code structure

The main game logic lies in `src/game/index.js`. The idea is that the game class holds the 
current state of the game and exposes an api to interact with the game. Then observes can 
subscribe to the game state and listen to its changes.

To add functionallity to the game make sure to call the `next` method of the subscriber.

The observers are in the `src/observers` folder. The idea behnd this observers is to listen to both dom events
and game state changes

The HTML index `stc/static/index.html` is inside the static folder since this is the
folder that is served alongside the webpack bundles.
