'use strict';

var React = require('react');

var _require = require('../config'),
    config = _require.config;

function Sidebar(props) {

  return React.createElement('div', {
    className: 'sidebar',
    style: {
      height: config.canvasHeight
    }
  });
}

module.exports = Sidebar;