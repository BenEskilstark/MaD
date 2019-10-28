'use strict';

var initState = function initState() {
  return {
    players: {},
    games: {},
    game: null,
    modal: null,
    localChat: '',
    chat: ''
  };
};

module.exports = { initState: initState };