/*
  The detection logic was copied from somewhere else when I was playing with JS years ago
  and now I cannot find the original code, so cannot credit the writer :(
*/

let ccErrorNo = 0;
let ccErrors = new Array();

ccErrors[0] = 'Unknown card type';
ccErrors[1] = 'No card number provided';
ccErrors[2] = 'Credit card number is in invalid format';
ccErrors[3] = 'Credit card number is invalid';
ccErrors[4] = 'Credit card number has an inappropriate number of digits';

const checkCardInfo = () => {
	let result = document.querySelector('#result');
	let input = document.querySelector('#input');
	let cardNo = document.querySelector('#input').value;
	let cardType = detectCardType(cardNo);

	if (document.querySelector('#input').value === '') {
		result.innerText = '';
		document.querySelector('#input').style.borderColor = '#cccccc';
	} else if (validateCard(cardNo, cardType) === true) {
		input.value = addSpaces();
		result.innerText = 'This is a valid ' + cardType + ' card.';
		document.querySelector('#input').style.borderColor = '#52ff5b';

	} else if (validateCard(cardNo, cardType) === false) {
		input.value = addSpaces();		input.value = addSpaces();
		result.innerText = ccErrors[ccErrorNo];
		document.querySelector('#input').style.borderColor = '#ff5252';
	}
}

const detectCardType = (number) => {
	let cards = {
		VisaElectron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
		Maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
		Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
		MasterCard: /^5[1-5][0-9]{14}$/,
		AmEx: /^3[47][0-9]{13}$/,
		DinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
		Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
		JCB: /^(?:2131|1800|35\d{3})\d{11}$/
	}

	for (let key in cards) {
		if (cards[key].test(number)) {
			return key
		}
	}

	return 'Invalid card';
}

function validateCard(cardnumber, cardname) {
	let cardNo = cardnumber;
	let cards = new Array();

	cards[0] = {
		name: 'Visa',
		length: '13,16',
		prefixes: '4',
		checkdigit: true
	};
	cards[1] = {
		name: 'MasterCard',
		length: '16',
		prefixes: '51,52,53,54,55',
		checkdigit: true
	};
	cards[2] = {
		name: 'DinersClub',
		length: '14,16',
		prefixes: '36,38,54,55',
		checkdigit: true
	};
	cards[3] = {
		name: 'VisaElectron',
		length: '16',
		prefixes: '4026,417500,4508,4844,4913,4917',
		checkdigit: true
	};
	cards[4] = {
		name: 'AmEx',
		length: '15',
		prefixes: '34,37',
		checkdigit: true
	};
	cards[5] = {
		name: 'Discover',
		length: '16',
		prefixes: '6011,622,64,65',
		checkdigit: true
	};
	cards[6] = {
		name: 'JCB',
		length: '16',
		prefixes: '35',
		checkdigit: true
	};
	cards[7] = {
		name: 'Maestro',
		length: '12,13,14,15,16,18,19',
		prefixes: '5018,5020,5038,6304,6759,6761,6762,6763',
		checkdigit: true
	};

	let cardType = -1;
	for (let i = 0; i < cards.length; i++) {
		if (cardname.toLowerCase() == cards[i].name.toLowerCase()) {
			cardType = i;
			break;
		}
	}

	if (cardType == -1) {
		ccErrorNo = 0;
		return false;
	}

	if (cardnumber.length == 0) {
		ccErrorNo = 1;
		return false;
	}

	if (cards[cardType].checkdigit) {
		let checksum = 0;
		let mychar = "";
		let j = 1;

		let calc;
		for (let i = cardNo.length - 1; i >= 0; i--) {
			calc = Number(cardNo.charAt(i)) * j;

			if (calc > 9) {
				checksum = checksum + 1;
				calc = calc - 10;
			}

			checksum = checksum + calc;

			if (j == 1) {
				j = 2
			} else {
				j = 1
			};
		}

		if (checksum % 10 != 0) {
			ccErrorNo = 3;
			return false;
		}
	}

	let LengthValid = false;
	let PrefixValid = false;
	let undefined;

	let prefix = new Array();
	let lengths = new Array();

	prefix = cards[cardType].prefixes.split(",");

	for (i = 0; i < prefix.length; i++) {
		let exp = new RegExp("^" + prefix[i]);
		if (exp.test(cardNo)) PrefixValid = true;
	}

	if (!PrefixValid) {
		ccErrorNo = 3;
		return false;
	}

	lengths = cards[cardType].length.split(",");
	for (j = 0; j < lengths.length; j++) {
		if (cardNo.length == lengths[j]) LengthValid = true;
	}

	if (!LengthValid) {
		ccErrorNo = 4;
		return false;
	};

	return true;
}

const restrictChars = () => {
	const regex = /[^0-9]/gi;

	const input = document.querySelector('#input');
	input.value = input.value.replace(regex, "");
}

const addSpaces = () => {
	const input = document.querySelector('#input');
	const inputVal = input.value.replace(/ /g,'');
	const spacedCardnoArr = [];

	for(let i = 0; i < inputVal.length; i += 4){
		spacedCardnoArr.push(inputVal.substr(i, 4));
	}

	console.log(spacedCardnoArr);

	return spacedCardnoArr.join(' ');
}

document.querySelector('#input').addEventListener('input', () => {
	restrictChars();
	checkCardInfo();
})
