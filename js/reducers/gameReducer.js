// @flow

const {config} = require('../config');
const {fireProjectileReducer} = require('./fireProjectileReducer');

import type {State, GameState, Ship, Action} from '../types';

const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'SET_TURN': {
      return state;
    }
    case 'SET_THRUST': {
      return state;
    }
    case 'FIRE_MISSILE':
    case 'FIRE_LASER':
      return fireProjectileReducer(state, action);
    case 'MAKE_EXPLOSION': {
      return state;
    }
    case 'SHIFT_TARGET': {
      return state;
    }
    case 'DESTROY_ENTITY': {
      const {id} = action;
      const nextEntities = state.entities.filter(entity => entity.id != id);
      return {
        ...state,
        entities: nextEntities,
      }
    }

  }

  return state;
};

module.exports = {gameReducer};
