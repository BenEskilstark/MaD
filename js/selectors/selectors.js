// @flow

const {invariant} = require('../utils/errors');
const {config} = require('../config');

import type {GameID, State, Player, PlayerID, Game} from '../types';

const getEntityByID = (game: GameState, id: EntityID): ?Entity => {
  const {entities} = state;
  const entityIDs = entities.map(entity => entity.id);

  const index = entityIDs.indexOf(id);
  if (index == -1) {
    return null;
  }
  return entities[index];
}

module.exports = {
  getEntityByID,
};
