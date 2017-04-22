
var Game = {};

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    game.load.tilemap('map', 'assets/map/basic_1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('brick_1', 'assets/map/tiles/brick_1.png');
    game.load.image('lava_2', 'assets/map/tiles/lava_2.png');

    game.load.image('sprite','assets/sprites/sprite.png');
};

Game.create = function(){
    Game.playerMap = {};
    var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);
    var map = game.add.tilemap('map');
    map.addTilesetImage('brick_1');
    map.addTilesetImage('lava_2');

    var layer;
    for(var i = 0; i < map.layers.length; i++) {
        layer = map.createLayer(i);
    }

    layer.inputEnabled = true; // Allows clicking on the map ; it's enough to do it on the last layer
    layer.events.onInputUp.add(Game.getCoordinates, this);
    Client.askNewPlayer();

    game.world.setBounds(0, 0, 1300, 2200);
    cursors = game.input.keyboard.createCursorKeys();

};

Game.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

Game.addNewPlayer = function(id,x,y){
    Game.playerMap[id] = game.add.sprite(x,y,'sprite');

    if(id = Game.getID()) {
        initPlayerCamera(id);
    }
};

function initPlayerCamera(id) {

    game.camera.follow(Game.playerMap[id], 0, .3, .3);
    var w =  game.camera.width / 8;
    var h =  game.camera.height / 4;
    game.camera.deadzone = new Phaser.Rectangle(200,h,1,1);
}

Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var tween = game.add.tween(player);
    var duration = distance*5;
    tween.to({x:x,y:y}, duration);
    tween.start();
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

Game.update = function() {

}

Game.getID = function () {
    return Game.getID.id;
}

Game.render = function() {
    // game.debug.cameraInfo(game.camera, 32, 32);
}
