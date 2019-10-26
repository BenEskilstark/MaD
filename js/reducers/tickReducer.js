// @flow

const {queueAdd} = require('../utils/queue');
const {subtract, distance} = require('../utils/vectors');
const {
  updateEntity,
} = require('../utils/updateEntities');
const {config} = require('../config');
const {sin, cos, abs, sqrt} = Math;
const {gameReducer} = require('./gameReducer');
const {invariant} = require('../utils/errors');
const {getEntityByID} = require('../selectors/selectors');

import type {GameState, Entity, Action} from '../types';

const tickReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'START_TICK':
      if (state.game != null && state.game.tickInterval != null) {
        return state;
      }
      return {
        ...state,
        tickInterval: setInterval(
          // HACK: store is only available via window
          () => store.dispatch({type: 'TICK'}),
          config.msPerTick,
        ),
      };
    case 'STOP_TICK':
      clearInterval(state.tickInterval);
      state.tickInterval = null;
      return state;
    case 'TICK':
      return handleTick(state);
  }
  return state;
};

const handleTick = (state: GameState): GameState => {

  // update entities
  const nextEntities = [];
  for (let i = 0; i < state.entities.length; i++) {
    nextEntities.push(updateEntity(state, state.entities[i]));
  }

  return {
    ...state,
    time: state.time + 1,
    entities: nextEntities,
  };
}

module.exports = {tickReducer};
