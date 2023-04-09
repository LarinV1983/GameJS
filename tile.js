export class Tile {
	constructor (gridElement ) {
		this.tileElement = document.createElement('div');
		this.tileElement.classList.add('tile');
		this.setValue(Math.random() > 0.5 ? 2 : 4);
		// this.tileElement.textContent = this.value;
		gridElement.append(this.tileElement);
	}

	setValue(value){
		this.value = value;
		this.tileElement.textContent = value;
		const bgLight = 100 - Math.log2(value) * 9;
		this.tileElement.style.setProperty('--bg-Light', `${bgLight}%`);
		this.tileElement.style.setProperty('--text-Light', `${bgLight < 50 ? 90 : 10}%`);
	}

	setXY(x, y){
		this.x = x;
		this.y = y;
		this.tileElement.style.setProperty('--x', x);
		this.tileElement.style.setProperty('--y', y);
	}

	
} 