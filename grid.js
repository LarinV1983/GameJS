import {Cell} from './cell.js';

const GridSize = 4;
const CellsCount = GridSize * GridSize;

export class Grid {
	constructor(gridElement) {
	  this.cells = [];
	  for (let i = 0; i < CellsCount; i++) {
			this.cells.push(
				new Cell(gridElement, i % GridSize, Math.floor(i / GridSize)))	  
		}

		this.cellsGroupColumn = this.groupCellsColumn();
		this.cellsGroupReversedColumn = this.cellsGroupColumn.map(column => [...column].reverse());
		this.cellsGroupRow = this.groupCellsRow();
		this.cellsGroupReversedRow = this.cellsGroupRow.map(raw => [...raw].reverse());
	}

	getRandomCell(){
		const emptyCell = this.cells.filter(cell => cell.isEmpty());
		const randomIndex = Math.floor(Math.random() * emptyCell.length);
		return emptyCell[randomIndex];
	}

	groupCellsColumn() {
		return this.cells.reduce((groupCells, cell) => {
			groupCells[cell.x] = groupCells[cell.x] || [];
			groupCells[cell.x][cell.y] = cell;
			return groupCells;
		}, []);
	}

	groupCellsRow() {
		return this.cells.reduce((groupCells, cell ) => {
			groupCells[cell.y] = groupCells[cell.y] || [];
			groupCells[cell.y][cell.x] = cell;
			return groupCells;
		}, []);
	}
}