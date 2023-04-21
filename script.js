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
				moveLeft();
			break;
			case 'ArrowRight':
				moveRight();
			break;

		default:
			setupInput();
			return;
		}
		const newTile = new Tile(gameBoard);
		grid.getRandomCell().linkTile(newTile);

		setupInput();
	}

	function moveUp() {
		slideTiles(grid.cellsGroupColumn);
	}

	function moveDown() {
		slideTiles(grid.cellsGroupReversedColumn);
	}

	function moveLeft() {
		slideTiles(grid.cellsGroupRow);
	}

	function moveRight() {
		slideTiles(grid.cellsGroupReversedRow);
	}


	function slideTiles(groupCells) {
		const promises = [];
		groupCells.forEach(group => slideTileGroup(group));

		grid.cells.forEach(cell => {
			cell.hasTileMerge() && cell.mergeTiles();
		});
	}

	function slideTileGroup(group) {
		for (let i = 1; i < group.length; i++) {
			if (group[i].isEmpty()) {
				continue;
			}
			const cellTile = group[i];
			let targetCell;
			let j = i - 1;
			while (j >= 0 && group[j].canAccept(cellTile.linkedTile)) {
				targetCell = group[j];
				j--;
			}
			if (!targetCell) {
				continue;
			}
			if (targetCell.isEmpty()) {
				targetCell.linkTile(cellTile.linkedTile);
			} else {
				targetCell.linkTileMerge(cellTile.linkedTile);
			}
			cellTile.unLinkTile();
		}
	}