const calculate = () => {
    const result = document.querySelector('#result');
    const num = document.querySelector('#input').value;
    const from = assigner(document.querySelector('#from').value);
    const to = assigner(document.querySelector('#to').value);

    result.style.visibility = 'visible';
    result.innerHTML = `Result:<br> ${convertBase(num, from, to)}`;
}

const assigner = (option) => {
    switch (option) {
        case 'binary':
            return 2;
            break;
        case 'octal':
            return 8;
            break;
        case 'decimal':
            return 10;
            break;
        case 'hexadecimal':
            return 16;
            break;
    }
}

const convertBase = (num, baseFrom, baseTo) => {
    const result = parseInt(num, baseFrom).toString(baseTo);

    if (result === 'NaN') {
        document.querySelector('#result').style.visibility = 'hidden';
    }

    return result;
}

const restrictChars = () => {
    let regex;

    const input = document.querySelector('#input');
    const fromValue = document.querySelector('#from').value;

    if (fromValue === 'binary') {
        regex = /[^0-1]/gi;
    } else if (fromValue === 'octal') {
        regex = /[^0-7]/gi;
    } else if (fromValue === 'decimal') {
        regex = /[^0-9]/gi;
    } else if (fromValue === 'hexadecimal') {
        regex = /[^a-fA-F0-9]/gi;
    } else {
        input.placeholder = '';
    }

    input.value = input.value.replace(regex, '');
}

const clearContents = () => {
    document.querySelector('#input').value = '';
    document.querySelector('#result').innerHTML = '';
}

document.querySelector('#input').addEventListener('input', () => {
    restrictChars();
    calculate();
});

document.querySelectorAll('.select').forEach((select) => {
    select.addEventListener('change', () => {
        clearContents();
    });
});