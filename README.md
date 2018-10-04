# Memory Card Game

This is the card game **Memory** implmented using react/redux, reselect, and redux-sagas.

## Rules
The basic rules of memory:

* All cards begin face down.
* The player turns one card face up, and then a second.
  * If they match, the pair is removed from the game.
  * If they do not match, both cards turn back over.
* The game ends when the player finds all matching pairs.

## Setup
```
npm install
npm run build
npm start
```

## Notes
The game's logic is mostly handled in the Game container saga.
It handles matches and mismatches and ends the game when all the cards are selected.

I wrote a lot of tests. You should check them out, especially the saga tests.
They help clarify what is exactly going on there.

I've created index files for each component/container.
The purpose is to simplify importing a components/containers exports and provide a `public interface` 
to a component, or container.

## Resources
[reselect](https://github.com/reduxjs/reselect)
[redux](https://redux.js.org/)
[redux-sagas](https://github.com/redux-saga/redux-saga)
