'use strict';

var _require = require('../config'),
    config = _require.config;

var _require2 = require('../selectors/selectors'),
    getPlayerColor = _require2.getPlayerColor,
    getEntityByID = _require2.getEntityByID;

var _require3 = require('../entities/projectile'),
    renderMissile = _require3.renderMissile;

var d3 = require('d3');
var topojson = require('topojson-client');

/**
 * Render things into the canvas
 */
var initRenderSystem = function initRenderSystem(store) {

  var time = store.getState().game.time;
  var canvas = null;
  var ctx = null;
  var svg = null;
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
      svg = d3.select('body').append('svg');
    }

    // clear
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, config.canvasWidth, config.canvasHeight);

    render(state, ctx);
  });
};

var renderD3 = function renderD3(state, svg) {
  var projection = d3.geoOrthographic().scale(config.canvasWidth / 2).translate(config.canvasWidth / 2, config.canvasHeight / 2).clipAngle(90).precision(0);

  var path = d3.geoPath().projection(projection);
  d3.json('../world_110m.json', function (error, world) {
    if (error) throw error;
    svg.selectAll('path').data(topojson.feature(world, world.objects.countries).features).enter().append('path').attr('d', path);
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