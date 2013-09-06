
//設定
requirejs.config({

  shim: {

    enchant: {
      exports: 'enchant'
    },

    nineleap: {
      deps: ['enchant']
    },

    ui: {
      deps: ['enchant']
    }

  },

  paths: {
    enchant: './../lib/enchantjs/enchant',
    nineleap: './../lib/enchantjs/nineleap.enchant',
    ui: './../lib/enchantjs/ui.enchant',
    core: './common'
  }

});

//実行関数
require([
  'enchant',
  'core'
], function(enchant, core) {

  core.addEventListener('load', function(e) {

    /**
     * 背景を生成
     * @type {Sprote}
     */
    var bg = new Sprite(320, 640);
    bg.image = core.assets['img/bg.png'];
    bg.y = -320;
    core.rootScene.addChild(bg);

    /**
     * はしごを表示する
     */
    for (var i = 0; i < 6; i++) {
      var ladder = new Sprite(32, 64);
      ladder.image = core.assets['img/ladder.png'];
      ladder.x = 160 - 16;
      ladder.y = 320 - i * 64;
      core.rootScene.addChild(ladder);
    }

    /**
     * プレイヤーを生成
     */
    var player = new Sprite(64, 64);
    player.image = core.assets['img/player.png'];
    player.frame = 8;
    player.x = 160 - 32;
    player.y = 250;
    core.rootScene.addChild(player);

    /**
     * タイムラベル生成
     */
    var timeLabel = new MutableText(10, 0);
    timeLabel.text = 'TIME: ' + core.limitTime;
    core.rootScene.addChild(timeLabel);

    var scorelabel = new ScoreLabel(160, 0);
    scorelabel.score = 0;
    scorelabel.easing = 0;
    core.rootScene.addChild(scorelabel);

    //タッチスタート
    core.rootScene.addEventListener('touchstart', function(e) {
      player.frame = 9;
      bg.y += 2;
      player.y -= 2;
      if(bg.y > 0) {
        bg.y = -320;
      }
      core.score++;
    }, false);

    //タッチエンド
    core.rootScene.addEventListener('touchend', function(e) {
      player.frame = 11;
      bg.y += 2;
      player.y -= 2;
      if(bg.y > 0) {
        bg.y = -320;
      }
      core.score++;
    }, false);

    core.rootScene.addEventListener('enterframe', function(e) {

      //制限時間が「0」ならタイムアップ
      if (core.limitTime === 0) {
        core.end(null, null, core.assets['img/timeup.png']);
      }

      //一秒間に一回実行する
      if ( core.frame % core.fps === 0 ) {
        core.limitTime--;
        timeLabel.text = 'TIME: ' + core.limitTime;
        scorelabel.score = core.score;
      }

    }, false)

  }, false);

  core.start();
});