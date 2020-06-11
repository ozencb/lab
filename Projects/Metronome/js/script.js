console.info('Checkout this awesome article if to learn more about how time stuff works in JS');

const rangeTempoEl = document.querySelector('#rngTempo');
const playButtonEl = document.querySelector('#playButton');
const tempoNumEl = document.querySelector('#tempo');

const spans = document.querySelectorAll('#visualizer > span');
let visualizerTimeout = [];

window.addEventListener('load', () => {
	tempo = rangeTempoEl.value;
	tempoNumEl.innerHTML = tempo;
});

rangeTempoEl.addEventListener('input', () => {
	tempo = rangeTempoEl.value;
	tempoNumEl.innerHTML = tempo;
});


audioCtx = null;
tick1 = null;
tick2 = null;
tick1Volume = null;

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

	visualizerTimeout.forEach(fn => {
		clearTimeout(fn);
	});
	spans.forEach(span => {
		span.style.color = 'white';
	});
	visualizerTimeout = [];
};

playButtonEl.addEventListener('click', function () {
	if (this.value === 'Play') {
		start((x) => {
			const currentSpanNum = x % 4;

			for (let i = 0; i < 4; i++) {
				if (i === currentSpanNum) {
					spans[i].style.color = 'red';
				} else {
					spans[i].style.color = 'white';
				}
			}
		});
		this.value = 'Stop';
	} else if (this.value === 'Stop') {
		stop();
		this.value = 'Play';
	}
});
