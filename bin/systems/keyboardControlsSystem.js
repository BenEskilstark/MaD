'use strict';

var _require = require('../config'),
    config = _require.config;

var _require2 = require('../selectors/selectors'),
    getNextTarget = _require2.getNextTarget;

var initKeyboardControlsSystem = function initKeyboardControlsSystem(store) {
  var dispatch = store.dispatch;

  var state = store.getState();

  document.onkeydown = function (ev) {
    var state = store.getState();
    var _state$game = state.game,
        time = _state$game.time,
        ships = _state$game.ships;

    switch (ev.keyCode) {
      case 37:
        {
          // left
          break;
        }
      case 38:
        {
          // up
          break;
        }
      case 39:
        {
          // right
          break;
        }
    }
  };

  document.onkeyup = function (ev) {
    var state = store.getState();
    var time = state.game.time;

    var target = null;
    switch (ev.keyCode) {
      case 37:
        {
          // left
          break;
        }
      case 38:
        {
          // up
          break;
        }
      case 39:
        {
          // right
          break;
        }
      case 32:
        {
          // space
          break;
        }
      case 16:
        {
          // shift
          break;
        }
    }
  };
};

module.exports = { initKeyboardControlsSystem: initKeyboardControlsSystem };