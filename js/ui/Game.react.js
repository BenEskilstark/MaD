
const React = require('React');
const {config} = require('../config');
const Canvas = require('./Canvas.react');
const Lobby = require('./Lobby.react');
const Button = require('./components/Button.react');
const {
} = require('../selectors/selectors');

/**
 * props: {store}
 * state: {...store.getState()}
 */
class Game extends React.Component {

  constructor(props) {
    super(props);
    props.store.subscribe(() => {
      this.setState({...this.props.store.getState()});
    });
    this.state = {...this.props.store.getState()};
  }

  render() {
    const {dispatch} = this.props.store;
    const {state} = this;

    let content = null;
    if (state.game == null) {
      content = <Lobby store={this.props.store} />;
    } else {
      content = (
        <div className="background" id="background">
          <Canvas
            game={state.game}
            width={config.canvasWidth} height={config.canvasHeight}
          />
        </div>
      );
    }

    // make sure config knows the actual size of the canvas
    const backgroundDiv = document.getElementById('background');
    if (backgroundDiv != null) {
      const rect = backgroundDiv.getBoundingClientRect();
      if (rect.height < rect.width) {
        config.canvasHeight = rect.height;
        config.canvasWidth = rect.height;
      } else {
        config.canvasHeight = rect.width;
        config.canvasWidth = rect.width;
      }
    }

    return (
      <React.Fragment>
        {content}
        {this.getModal()}
      </React.Fragment>
    );
  }

  getModal() {
    if (!this.state.modal) {
      return null;
    }
    const {title, text, buttons} = this.state.modal;
    const rect = document.getElementById('container').getBoundingClientRect();
    const buttonHTML = buttons.map(button => {
      return <Button label={button.label} onClick={button.onClick} />;
    });
    return (
      <div className="modal"
        style={{
          width: 300,
          top: (rect.height - 200) / 2,
          left: (rect.width - 300) / 2,
        }}>
        <h3><b>{title}</b></h3>
        {text}
        <div className="modalButtons">
          {buttonHTML}
        </div>
      </div>
    );
  }
};

module.exports = Game;