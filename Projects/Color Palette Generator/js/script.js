const getRandomPalette = (colorAmount = 1, mode) => {
	const palette = [];
	let hex;

	if (mode === 'bright') {
		hex = '56789ABDEF';
	} else if (mode === 'dark') {
		hex = '0123456789A';
	} else {
		hex = '0123456789ABDEF';
	}

	for (let i = 0; i < colorAmount; i += 1) {
		let color = '';
		for (let j = 0; j < 6; j += 1) {
			color += hex[Math.floor(Math.random() * hex.length)];
		}

		if (colorAmount > 1) {
			palette.push(color);
		} else {
			return color;
		}
	}
	return palette;
};

// 
const copyToClipboard = (copyText) => {
	// Create a tmp element to put text value in
	const tmpInput = document.createElement('input');

	tmpInput.value = copyText;

	// execCommand needs the element attached to DOM in order to work
	document.body.appendChild(tmpInput);


	tmpInput.select();
	tmpInput.setSelectionRange(0, 99999); // For mobile, apparently

	// Copy text the selected value to clipboard
	document.execCommand("copy");

	document.body.removeChild(tmpInput);
};

const populatePalette = () => {
	const paletteContainer = document.querySelector('#palette');

	const numInput = document.querySelector('#quantity');
	const ddBrightness = document.querySelector('#brightness');

	const num = numInput.value;
	const selectedBrightness = ddBrightness.options[ddBrightness.selectedIndex].value;

	const palette = getRandomPalette(num, selectedBrightness);

	const url = palette.join('-');


	// Empty palette container
	paletteContainer.innerHTML = '';

	palette.forEach(color => {
		const colorContainer = document.createElement('div');

		const colorHex = '#' + color;
		
		colorContainer.className = 'color';
		
		colorContainer.style.backgroundColor = colorHex;
		colorContainer.innerText = colorHex;
		
		colorContainer.addEventListener('click', () => {
			copyToClipboard(colorHex);
		});
		
		paletteContainer.appendChild(colorContainer);
	});

	window.history.pushState('page1', 'title' ,'/' + url)
}

document.querySelector('#btnGenerate').addEventListener('click', populatePalette);

window.addEventListener('load', () => {
	populatePalette();
});