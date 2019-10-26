// @flow

const {createStore} = require('redux');
const Game = require('./ui/Game.react');
const React = require('react');
const ReactDOM = require('react-dom');
const {rootReducer} = require('./reducers/rootReducer');
const {initSystems} = require('./systems/initSystems');

const store = createStore(rootReducer);
window.store = store; // useful for debugging

// initializes the other systems on game start
initSystems(store);

ReactDOM.render(
  <Game store={store} />,
  document.getElementById('container'),
);
