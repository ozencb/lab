window.addEventListener('keydown', (e) => {
	e.preventDefault();
	document.querySelector('#keycode').innerText = e.keyCode;
});
