//noinspection JSCheckFunctionSignatures,JSCheckFunctionSignatures,JSCheckFunctionSignatures
var game = new Phaser.Game(1300, 1280, Phaser.AUTO, document.getElementById('game'));
game.state.add('Game', Game);
game.state.start('Game');