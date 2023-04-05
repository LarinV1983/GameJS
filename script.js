import {Grid} from './grid.js';
import {Tile} from './tile.js';

const gameBoard = document.getElementById("game-board");

const grid = new Grid(gameBoard);
grid.getRandomCell().linkTile(new Tile(gameBoard));
grid.getRandomCell().linkTile(new Tile(gameBoard));