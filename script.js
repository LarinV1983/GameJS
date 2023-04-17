import {Grid} from './grid.js';
import {Tile} from './tile.js';

const gameBoard = document.getElementById("game-board");

const grid = new Grid(gameBoard);
grid.getRandomCell().linkTile(new Tile(gameBoard));
grid.getRandomCell().linkTile(new Tile(gameBoard));
setupInput();

function setupInput() {
	window.addEventListener('keydown', handleInput, {once: true});
	}

	function handleInput(event) {
		switch (event.key) {
			case 'ArrowUp':
				moveUp();
			break;
			case 'ArrowDown':
				moveDown();
			break;
			case 'ArrowLeft':
				// moveLeft();
			break;
			case 'ArrowRight':
				// moveRight();
			break;

		default:
			setupInput();
			return;
		}

		setupInput();
	}

	function moveUp() {
		slideTiles(grid.cellsGroupColumn);
	}

	function moveDown() {
		slideTiles(grid.cellsGroupReversedColumn);
	}

	function slideTiles(groupCells) {
		groupCells.forEach(group => slideTitleGroup(group));

		grid.cells.forEach(cell => {
			cell.hasTileMerge() && cell.mergeTiles();
		});
	}

	function slideTitleGroup(group) {
		for (let i = 1; i< group.length; i++) {
			if (group[i].isEmpty()) {
				continue;
			}
			const cellTile = group[i];
			let targetCell;
			let j = i - 1;
			if (!targetCell) {
				continue;
			}
			if (targetCell.isEmpty()) {
				targetCell.linkTile(cellTile.linkTile);
			} else {
				targetCell.linkTileMerge(cellTile.linkTile);
			}
			cellTile.unlinkTile();
		}
	}