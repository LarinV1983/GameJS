export class Cell {
	constructor (gridElement, x, y) {
		const cell = document.createElement("div");
		cell.classList.add("cell");
		gridElement.append(cell);
		this.x = x;
		this.y = y;
	}

	linkTile(tile){
		tile.setXY(this.x, this.y);
		this.linkedTile = tile;
	}

	unLinkTile(){
		this.linkedTile = null;
	}

	isEmpty(){
		return !this.linkedTile;
	}

	linkTileMerge(tile) {
		tile.setXY(this.x, this.y);
		this.linkTileMerge = tile;
	}

	hasTileMerg() {
		return !!this.linkTileMerge;
	}

	canAccept(newTile) {
		return (
			this.isEmpty() || (!this.hasTileMerg() && 
			this.linkedTile.value === newTile.value)
		);
	}
}