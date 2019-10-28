// @flow

const React = require('react');
const {config} = require('../config');

import type {State} from '../types';

type Props = {
  state: State,
};

function Sidebar(props: Props): React.Node {

  return (
    <div
      className="sidebar"
      style={{
        height: config.canvasHeight,
      }}
    >

    </div>
  );
}

module.exports = Sidebar;
