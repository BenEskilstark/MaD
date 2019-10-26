// @flow

const Button = require('./ui/Button.react');

// -------------------------------------------------------------------------------
// Generic Types
// -------------------------------------------------------------------------------

export type Color = string;

export type Listener = () => mixed; // some callback passed to subscribe
export type Unsubscribe = () => mixed; // unsubscribe a listener
export type Store = {
  getState: () => State,
  dispatch: (action: Action) => Action, // dispatched action returns itself
  subscribe: (Listener) => Unsubscribe,
};

// -------------------------------------------------------------------------------
// Multiplayer
// -------------------------------------------------------------------------------

export type PlayerID = string;
export type GameID = string;

export type Player = {
  id: PlayerID,
  name: string,
  isThisClient: boolean,
  gameID: GameID,
  ready: boolean,
};

export type GameMetaData = {
  id: GameID,
  players: Array<PlayerID>,
  started: boolean,
};

// -------------------------------------------------------------------------------
// General State
// -------------------------------------------------------------------------------

export type State = {
  players: {[id: PlayerID]: Player}, // all players in any game
  games: {[id: GameID]: Game},
  game: ?GameState,
  modal: ?{
    title: string,
    text: string,
    buttons: Array<Button>
  },
  localChat: string, // what the player has typed but not yet submitted
  chat: string,
};

// -------------------------------------------------------------------------------
// Game State
// -------------------------------------------------------------------------------

export type GameState = {
  time: number,
  tickInterval: any, // when running, this is set
  players: Array<PlayerID>,
  entities: Array<Entity>,
};

export type EntityID = number;

export type Entity = {
  id: EntityID,
  type: string,
  age: number,
  position: Vector,
  velocity: Vector,
  accel: Vector,

  radius: Size,

  theta: Radians,
  thetaSpeed: Radians, // how theta changes over time

  history: Array<Entity>,

  // for rendering
  frameIndex: number,
  maxFrames: number,
  spriteSet: string,
};

// -------------------------------------------------------------------------------
// Actions
// -------------------------------------------------------------------------------

export type Action =
  {type: 'RESTART'} |
  {type: 'START', gameID: GameID} |
  {
    type: 'SET_MODAL',
    text: string,
    title: string,
    buttons: Array<{label: string, onClick: () => void}>
  } |
  {type: 'DISMISS_MODAL'} |
  {type: 'STOP_TICK'} |
  {type: 'TICK'};
