export class Cell {
	constructor (GridElement, x, y) {
		const cell = document.createElement(div);
		cell.classList.add('cell');
		GridElement.append(cell);
		this.x = x;
		this.y = y;

	}
}