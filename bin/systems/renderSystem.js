'use strict';

var _require = require('../config'),
    config = _require.config;

var _require2 = require('../selectors/selectors'),
    getPlayerColor = _require2.getPlayerColor,
    getEntityByID = _require2.getEntityByID;

var _require3 = require('../entities/projectile'),
    renderMissile = _require3.renderMissile;

/**
 * Render things into the canvas
 */
var initRenderSystem = function initRenderSystem(store) {

  var time = store.getState().game.time;
  var canvas = null;
  var ctx = null;
  store.subscribe(function () {
    var state = store.getState();
    // only check on a new tick
    if (state.game.time == time && state.game.tickInterval != null) {
      return;
    }
    // important to track time this way so this only happens once per tick
    time = state.game.time;

    if (!canvas) {
      canvas = document.getElementById('canvas');
      if (!canvas) return; // don't break
      ctx = canvas.getContext('2d');
    }

    // clear
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, config.canvasWidth, config.canvasHeight);

    render(state, ctx);
  });
};

var render = function render(state, ctx) {
  var game = state.game;

  // scale world to the canvas

  ctx.save();
  // set the origin to the bottom left instead of top right
  ctx.translate(0, config.canvasHeight);
  ctx.scale(1, -1);
  ctx.scale(config.canvasWidth / config.width, config.canvasHeight / config.height);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = game.entities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entity = _step.value;

      renderEntity(state, ctx, entity);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ctx.restore();
};

var renderEntity = function renderEntity(state, ctx, entity) {
  if (entity.type == 'missile') {
    renderMissile(state, ctx, entity);
  }
};

module.exports = { initRenderSystem: initRenderSystem };