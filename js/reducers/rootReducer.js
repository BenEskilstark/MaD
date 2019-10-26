// @flow

const {initState} = require('../state/initState');
const {initGameState} = require('../state/initGameState');
const {gameReducer} = require('./gameReducer');
const {tickReducer} = require('./tickReducer');
const {modalReducer} = require('./modalReducer');

import type {State, Action} from '../types';

const rootReducer = (state: State, action: Action): State => {
  if (state === undefined) return initState();

  switch (action.type) {
    case 'START':
      return {
        ...state,
        game: initGameState(),
      };
    case 'SET_MODAL':
    case 'DISMISS_MODAL':
      return modalReducer(state, action);
    case 'START_TICK':
    case 'STOP_TICK':
    case 'TICK':
      if (!state.game) return state;
      return {
        ...state,
        game: tickReducer(state.game, action),
      };
    case 'SET_TURN':
    case 'SET_THRUST':
    case 'FIRE_LASER':
    case 'FIRE_MISSILE':
    case 'MAKE_EXPLOSION':
    case 'SHIFT_TARGET':
    case 'DESTROY_MISSILE':
      if (!state.game) return state;
      return {
        ...state,
        game: gameReducer(state.game, action),
      };
  }
  return state;
};

module.exports = {rootReducer}
