const projects = {
	colorPaletteGenerator: {
		name: 'Color Palette Generator',
		description: 'Get randomly generated color palettes',
		directory: 'Color Palette Generator',
	},
	metronome: {
		name: 'Metronome',
		description: 'A simple metronome',
		directory: 'Metronome',
	},
	creditCardValidator: {
		name: 'Credit Card Validator',
		description: 'Client-side credit card validation',
		directory: 'Credit Card Validator',
	},
	numeralConverter: {
		name: 'Numeral System Converter',
		description: 'Convert numbers between binary, octal, decimal, and hexadecimal',
		directory: 'Numeral System Converter',
	},
	JSKeyCodes: {
		name: 'JS Keycodes',
		description: 'Get JavaScript event keycodes',
		directory: 'JS Keycodes',
	},
	CameraTest: {
		name: 'Camera Test',
		description: 'Get JavaScript event keycodes',
		directory: 'Camera Test',
	},
}

let isMobile = false;

if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
	isMobile = true;
}


window.addEventListener('load', () => {
	const projectsEl = document.querySelector('#projects');
	const projectCountEl = document.querySelector('#project-count');
	const logo = document.querySelector('.logo');
	const logoSvg = document.querySelector('.logo > svg');


	const basePath = './Projects/';

	projectCountEl.textContent = `I have ${Object.keys(projects).length} experiments so far:`;

	// Iterate over through 'projects' values
	for (let project of Object.values(projects)) {
		// Create a card for every project in projects object
		// The card element and container looks like this:

		/*
		    <div class="cards-container" id="projects">
		        <div class="cards">
		            <div class="card">
		                <a href="Path to project root directory">
		                    <div class="card-display"><img src="Path to icon.svg">
		                        <h2>Project Title</h2>
		                    </div>
		                    <div class="card-hover">
		                        <h2>Project Title</h2>
		                        <p>Project Description</p>
		                        <p class="link">Click to see project</p>
		                    </div>
		                </a>
		                <div class="card-border"></div>
		            </div>
		        </div>
		    </div>
        */

		// Every card is injected to projectsEl

		const cardContainerEl = document.createElement('div');
		const cardEl = document.createElement('div');
		const cardLinkContainer = document.createElement('a');
		const divDisplayEl = document.createElement('div');
		const divHoverEl = document.createElement('div');
		const projectImgEl = document.createElement('img');
		const projectTitleEl = document.createElement('h2');
		const projectDescEl = document.createElement('p');
		const projectLinkEl = document.createElement('p');
		const cardBorderEl = document.createElement('div');

		const isDark = Math.random() >= 0.8; // 2/10 of cards will be dark

		cardContainerEl.className = 'cards';
		cardEl.className = 'card';

		if (isDark) {
			cardEl.classList.add('card-dark');
			projectImgEl.classList.add('svg-invert');
		}


		divDisplayEl.className = 'card-display';
		divHoverEl.className = 'card-hover';
		projectLinkEl.className = 'link';
		cardBorderEl.className = 'card-border';

		cardLinkContainer.href = basePath + project.name + '/index.html';

		projectImgEl.src = basePath + project.name + '/assets/icon.svg';
		projectTitleEl.innerText = `${project.name}`;


		projectDescEl.innerText = `${project.description}`;
		projectLinkEl.innerText = isMobile ? 'Tap to see the project' : 'Click to see the project';

		divDisplayEl.appendChild(projectImgEl);
		divDisplayEl.appendChild(projectTitleEl.cloneNode(true));

		divHoverEl.appendChild(projectTitleEl.cloneNode(true));
		divHoverEl.appendChild(projectDescEl);
		divHoverEl.appendChild(projectLinkEl);

		cardLinkContainer.appendChild(divDisplayEl);
		cardLinkContainer.appendChild(divHoverEl);

		cardEl.appendChild(cardLinkContainer);
		cardEl.appendChild(cardBorderEl);

		cardContainerEl.appendChild(cardEl);

		projectsEl.appendChild(cardContainerEl);


		// Event listeners for simulating :hover on both touch and pointer devices
		// :active, :hover, :focus etc did not work the way I wanted
		// them to work on both so JS it is.
		const addHoverClass = () => {
			divDisplayEl.style.display = 'none';
			divHoverEl.style.display = 'block';
			cardLinkContainer.classList.add('translate');
			cardLinkContainer.style.borderColor = !isDark ? getComputedStyle(document.body).getPropertyValue('--aqua') : 'black';

		};
		const removeHoverclass = () => {
			divDisplayEl.style.display = 'block';
			divHoverEl.style.display = 'none';
			cardLinkContainer.classList.remove('translate');
			cardLinkContainer.style.borderColor = 'black';

		};
		cardEl.addEventListener('mouseover', addHoverClass);
		cardEl.addEventListener('mouseout', removeHoverclass);
		cardEl.addEventListener('touchstart', addHoverClass);
		cardEl.addEventListener('touchend', removeHoverclass);


		// Event listeners for logo hover
		// I chose to do it in JS to trigger both svg and logo border animations
		// at the same time
		const addLogoHoverAnimation = () => {
			logo.classList.add('logo-border-animation');
			logoSvg.classList.add('svg-animation');
		};
		const removeLogoHoverAnimation = () => {
			logo.classList.remove('logo-border-animation');
			logoSvg.classList.remove('svg-animation');
		};

		if (isMobile) {
			addLogoHoverAnimation();
		} else {
			logo.addEventListener('mouseover', addLogoHoverAnimation);
			logo.addEventListener('mouseout', removeLogoHoverAnimation);
		}

	}
});
