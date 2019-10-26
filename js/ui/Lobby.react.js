
const React = require('React');
const {
} = require('../selectors/selectors');
const {
  getNextGameID,
  getClientPlayer,
  getClientGame,
} = require('../selectors/playerSelectors');
const Button = require('./components/Button.react');

/**
 * props: {store}
 * state: {...state.getState()}
 */
class Lobby extends React.Component {

  constructor(props) {
    super(props);
    props.store.subscribe(() => {
      this.setState({...this.props.store.getState()});
    });
    this.state = {...this.props.store.getState()};
  }

  render() {
    const state = this.state;
    const {dispatch} = this.props.store;
    const {players, games} = state;

    let hostedGame = null;
    const gameRows = [];
    for (const gameID in games) {
      if (gameID == 0) {
        continue;
      }
      const game = games[gameID];
      const host = game.players[0];
      if (host == clientPlayer.id) {
        hostedGame = (
          <div className="hostedGame">
            <p>Joined: {
              game.players.length == 2
                ? getPlayerByID(state, game.players[1]).name
                : 'None'
            }</p>
            {this.startButton()}
          </div>
        );
        continue;
      }
      const hostName = getPlayerByID(state, host).name;
      gameRows.push(
        <div className="gameRow" key={'gameRow_' + host}>
          <p>Host: {hostName}</p>
          <p># Players: {game.players.length}</p>
          <p>
            {game.started
              ? 'Game in progress'
              : this.joinButton(game.id, game.players.length > 1)
            }
          </p>
        </div>
      );
    }

    return (
      <Button
        label="Start Game"
        onClick={() => {
          dispatch({type: 'START'});
          dispatch({type: 'START_TICK'});
        }}
      />
    );
  }
}

module.exports = Lobby;
