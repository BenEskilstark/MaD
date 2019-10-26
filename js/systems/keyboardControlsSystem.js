
const {config} = require('../config');
const {
  getNextTarget,
} = require('../selectors/selectors');

const initKeyboardControlsSystem = (store) => {
  const {dispatch} = store;
  const state = store.getState();

  document.onkeydown = (ev) => {
    const state = store.getState();
    const {time, ships} = state.game;
    switch (ev.keyCode) {
      case 37: { // left
        break;
      }
      case 38: { // up
        break;
      }
      case 39: { // right
        break;
      }
    }
  }

  document.onkeyup = (ev) => {
    const state = store.getState();
    const {time} = state.game;
    let target = null;
    switch (ev.keyCode) {
      case 37: { // left
        break;
      }
      case 38: { // up
        break;
      }
      case 39: { // right
        break;
      }
      case 32: { // space
        break;
      }
      case 16: { // shift
        break;
      }
    }
  }
};

module.exports = {initKeyboardControlsSystem};
