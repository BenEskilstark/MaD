// @flow

const config = {
  msPerTick: 30,
  width: 1000,
  height: 1000,
  canvasWidth: 800,
  canvasHeight: 800,

  laserSpeed: 5,

  missile: {
    speed: 10,
    radius: 12,
  },

  g: 0.1,

  maxHistorySize: 200,
  playerColors: ['blue', 'red', 'green'],
};

module.exports = {config};
