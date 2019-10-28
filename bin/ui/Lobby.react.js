'use strict';

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var React = require('react');

var _require = require('../selectors/selectors');

_objectDestructuringEmpty(_require);

var _require2 = require('../selectors/playerSelectors'),
    getNextGameID = _require2.getNextGameID,
    getClientPlayer = _require2.getClientPlayer,
    getClientGame = _require2.getClientGame;

var Button = require('./components/Button.react');

function Lobby(props) {
  var dispatch = props.dispatch;

  return React.createElement(Button, {
    label: 'Start Game',
    onClick: function onClick() {
      dispatch({ type: 'START' });
      // dispatch({type: 'START_TICK'});
    }
  });
}

module.exports = Lobby;