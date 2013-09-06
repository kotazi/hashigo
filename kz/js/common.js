define([
  'enchant',
  'nineleap',
  'ui'
], function(enchant, nineleap, ui) {
  enchant();
  var core = new Core(320, 320);
  core.fps = 16;
  core.preload('img/player.png', 'img/ladder.png', 'img/bg.png', 'img/timeup.png');
  core.score = 0;
  core.limitTime = 10;
  return core;
});