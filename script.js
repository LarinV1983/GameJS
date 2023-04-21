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
				if (!canMoveUp()) {
					setupInput();
					return;
				}
				moveUp();
			break;
			case 'ArrowDown':
				if (!canMoveDown()) {
					setupInput();
					return;
				}
				moveDown();
			break;
			case 'ArrowLeft':
				if (!canMoveLeft()) {
					setupInput();
					return;
				}
				moveLeft();
			break;
			case 'ArrowRight':
				if (!canMoveRight()) {
					setupInput();
					return;
				}
				moveRight();
			break;
		default:
			setupInput();
			return;
		}
		const newTile = new Tile(gameBoard);
		grid.getRandomCell().linkTile(newTile);

		if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
			newTile.waitAnimationEnd();
			alert('Try again!');
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

	function moveLeft() {
		slideTiles(grid.cellsGroupRow);
	}

	function moveRight() {
		slideTiles(grid.cellsGroupReversedRow);
	}

	function slideTiles(groupCells) {
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

	function canMoveUp() {
		return canMove(grid.cellsGroupColumn);
	}

	function canMoveDown() {
		return canMove(grid.cellsGroupReversedColumn);
	}

	function canMoveLeft() {
		return canMove(grid.cellsGroupRow);
	}

	function canMoveRight() {
		return canMove(grid.cellsGroupReversedRow);
	}

	function canMove(groupCells) {
		return groupCells.some(group => canMoveGroup(group));
	}

	function canMoveGroup(group) {
		return group.some((cell, index) => {
			if (index === 0) {
				return false;
			}
			if (cell.isEmpty()) {
				return false;
			}
			const targetCell = group[index - 1];
			return targetCell.canAccept(cell.linkedTile);
		});
	}