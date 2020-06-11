console.info('Checkout this awesome article if to learn more about how time stuff works in JS: https://meowni.ca/posts/metronomes/');

const rangeTempoEl = document.querySelector('#rngTempo');
const playButtonEl = document.querySelector('#playButton');
const increment = document.querySelector('#increment');
const decrement = document.querySelector('#decrement');
const tempoNumEl = document.querySelector('#tempo');
const spans = document.querySelectorAll('#visualizer > span');

let tempo;
let visualizerTimeout = [];
let audioCtx = null;
let tick1 = null;
let tick2 = null;
let tick1Volume = null;
let isPlaying = false;

const lodash = _;

const updateTempo = () => {
	tempo = rangeTempoEl.value;
	tempoNumEl.innerHTML = tempo;
};



const visualizer = (x) => {
	const currentSpanNum = x % 4;

	for (let i = 0; i < 4; i++) {
		if (i === currentSpanNum) {
			spans[i].style.color = 'red';
		} else {
			spans[i].style.color = 'white';
		}
	}
};

const initAudio = () => {
	audioCtx = new(window.AudioContext || window.webkitAudioContext)();
	tick1 = audioCtx.createOscillator();
	tick2 = audioCtx.createOscillator();

	tick1Volume = audioCtx.createGain();
	tick2Volume = audioCtx.createGain();

	tick1.type = 'sine';
	tick2.type = 'sine';
	tick1.frequency.value = 1000;
	tick2.frequency.value = 500;
	tick1Volume.gain.value = 0;
	tick2Volume.gain.value = 0;

	tick1.connect(tick1Volume);
	tick1Volume.connect(audioCtx.destination);
	tick1.start(0);

	tick2.connect(tick2Volume);
	tick2Volume.connect(audioCtx.destination);
	tick2.start(0);
};

const clickAtTime = (time, i) => {
	tick1Volume.gain.cancelScheduledValues(time);
	tick1Volume.gain.setValueAtTime(0, time);

	tick2Volume.gain.cancelScheduledValues(time);
	tick2Volume.gain.setValueAtTime(0, time);

	const note = i % 4 === 3 ? 'high' : 'low';

	if (note === 'high') {
		tick1Volume.gain.linearRampToValueAtTime(1, time + .001);
		tick1Volume.gain.linearRampToValueAtTime(0, time + .001 + .01);
	} else if (note === 'low') {
		tick2Volume.gain.linearRampToValueAtTime(1, time + .001);
		tick2Volume.gain.linearRampToValueAtTime(0, time + .001 + .01);
	}
};

const start = (callback) => {
	initAudio();
	isPlaying = true;
	let now = audioCtx.currentTime;
	const timeOut = 60 / tempo;

	// Currenntly, the app creates a thousand orders for
	// both the clicks and the visuals so it stops after 1000 clicks :)
	// Kinda hacky and shitty solution but it stays until I figure it out
	for (let i = 0; i < 1000; i++) {
		clickAtTime(now, i);
		visualizerTimeout.push(setTimeout(() => callback(i), now * 1000));
		now += timeOut;
	}
};

const stop = () => {
	tick1.stop();
	tick2.stop();

	isPlaying = false;

	visualizerTimeout.forEach(fn => {
		clearTimeout(fn);
	});
	spans.forEach(span => {
		span.style.color = 'white';
	});
	visualizerTimeout = [];
};

const play = (eventType) => {
	const btn = document.querySelector('#playButton');

	if (eventType === 'click') {
		if (btn.value === 'Play') {
			start(visualizer);
			btn.value = 'Stop';
		} else if (btn.value === 'Stop') {
			stop();
			btn.value = 'Play';
		}
	} else if (eventType === 'input' && btn.value === 'Stop') {
		stop();
		start(visualizer);
	}
}


window.addEventListener('load', updateTempo);

playButtonEl.addEventListener('click', (e) => {
	play(e.type);
});

// Use debounce to prevent annoying fast clicks on input adjustment
const debounceInput = lodash.debounce(() => {
	if (isPlaying) {
		play('input');
	}
}, 50);

increment.addEventListener('click', () => {
	tempo = Number(tempo) + 1;
	rangeTempoEl.value = tempo;
	updateTempo();
	debounceInput();
});

decrement.addEventListener('click', () => {
	tempo = Number(tempo) - 1;
	rangeTempoEl.value = tempo;
	updateTempo();
	debounceInput();
});

rangeTempoEl.addEventListener('input', () => {
	updateTempo();
	debounceInput();
});
