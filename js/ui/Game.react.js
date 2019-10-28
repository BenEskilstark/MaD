// @flow

const React = require('react');
const Canvas = require('./Canvas.react');

import type {State} from '../types';

type Props = {
  width: number,
  height: number,
  state: State,
};

function Game(props: Props): React.Node {

  return (
    <div className="background" id="background">
      <Canvas
        width={props.width} height={props.height}
      />
    </div>
  );
}

module.exports = Game;
