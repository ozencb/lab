const projects = {
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
}


window.addEventListener('load', () => {
	const projectsEl = document.querySelector('#projects');
	const projectCountEl = document.querySelector('#project-count'); // 

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
		projectLinkEl.innerText = 'Click to see project';

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
	}
});
