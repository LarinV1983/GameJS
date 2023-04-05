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
	}
	getRandomCell(){
		const emptyCell = this.cells.filter(cell => cell.isEmpty());
		const randomIndex = Math.floor(Math.random() * emptyCell.length);
		return emptyCell[randomIndex];
	}
}