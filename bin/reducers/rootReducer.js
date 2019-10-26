'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('../state/initState'),
    initState = _require.initState;

var _require2 = require('../state/initGameState'),
    initGameState = _require2.initGameState;

var _require3 = require('./gameReducer'),
    gameReducer = _require3.gameReducer;

var _require4 = require('./tickReducer'),
    tickReducer = _require4.tickReducer;

var _require5 = require('./modalReducer'),
    modalReducer = _require5.modalReducer;

var rootReducer = function rootReducer(state, action) {
  if (state === undefined) return initState();

  switch (action.type) {
    case 'START':
      return _extends({}, state, {
        game: initGameState()
      });
    case 'SET_MODAL':
    case 'DISMISS_MODAL':
      return modalReducer(state, action);
    case 'START_TICK':
    case 'STOP_TICK':
    case 'TICK':
      if (!state.game) return state;
      return _extends({}, state, {
        game: tickReducer(state.game, action)
      });
    case 'SET_TURN':
    case 'SET_THRUST':
    case 'FIRE_LASER':
    case 'FIRE_MISSILE':
    case 'MAKE_EXPLOSION':
    case 'SHIFT_TARGET':
    case 'DESTROY_MISSILE':
      if (!state.game) return state;
      return _extends({}, state, {
        game: gameReducer(state.game, action)
      });
  }
  return state;
};

module.exports = { rootReducer: rootReducer };