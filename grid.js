const GridSize = 4;
const CellsCount = GridSize * GridSize;

export class Grid {
	constructor(GridElement) {
	  this.cells = [];
	  for (let i = 0; i < CellsCount; i++) {
			this.cells.push(
				new Cell(GridElement, x, y))	  
		}
	}
}