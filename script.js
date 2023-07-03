let currentOperation = "";
const display = document.querySelector('#display');

function displayValue(button) {
    const value = document.createElement('div');
    value.classList.add("currentOperation");

    if (button.value === '=') {
        currentOperation = currentOperation.split('');
        console.log(currentOperation);
        operate(currentOperation[1], currentOperation[0], currentOperation[2]);
    }
    // add operator to currentOperation string for later calculation
    // but do not display to user
    // for now just display symbol
    // else if (button.value === '+' || button.value === '-' || button.value === '*' || button.value === '/') {
    else if (button.value === '*') {
        currentOperation += button.value;
        value.textContent = '×';
        display.appendChild(value);
        console.log(currentOperation);
    }
    else if (button.value === '/') {
        currentOperation += button.value;
        value.textContent = '÷';
        display.appendChild(value);
        console.log(currentOperation);
    }
    else {
        value.textContent = button.value;
        currentOperation += button.value; // save value clicked in variable
        display.appendChild(value);
        console.log(currentOperation);
    }
}

function clearDisplay(button) {
    if (!button) {
        currentOperation = '';
    }
    else {
        currentOperation = button.value;
    }
    while (display.firstChild) {
        display.removeChild(display.firstChild);
    }
    console.log(currentOperation);
}

// pass currentOperation string as an array of chars to perform calculation
function operate(operator, number1, number2) {
    const output = document.createElement('div');
    output.classList.add('output');

    let result = '';
    if (operator === '+') {
        result = add(+number1, +number2); // unary operator to pass as numbers, not strings
    }
    else if (operator === '-') {
        result = subtract(+number1, +number2);
    }
    else if (operator === '*') {
        result = multiply(+number1, +number2);
    }
    else if (operator === '/') {
        result = divide(+number1, +number2);
    }
    clearDisplay();
    currentOperation = result;
    output.textContent = result;
    display.appendChild(output);
}

function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    return number1 / number2;
}
