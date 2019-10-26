// @flow

import type {State} from '../types';

const initState = (): State => {
  return {
    players: {},
    games: {},
    game: null,
    modal: null,
    localChat: '',
    chat: '',
  };
}

module.exports = {initState};
