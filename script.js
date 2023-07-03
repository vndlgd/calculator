let currentOperation = ""; // keep track of final operation
let currentDisplayOutput = ""; // keep track of what is shown on the display
const display = document.querySelector('#display');

// perhaps make another function to be able to keep adding digits 
// so instead 22 instead of 2
// also i could possibly add spaces after each operation to eventually seperate by spaces

function displayValue(button) {
    const value = document.createElement('div');
    value.classList.add("currentOperation");



    // check if button value is a number or =, if it is not, add a spaces for seperation 
    if (isNaN(button.value) && button.value !== '=') {
        currentOperation += ' ';
        currentOperation += button.value;
        currentOperation += ' ';
        currentDisplayOutput = '';
        return; // exit function
    }

    if (button.value === '=') {
        currentOperation = currentOperation.split(' ');
        operate(currentOperation[1], currentOperation[0], currentOperation[2]);
    }
    else {
        currentOperation += button.value; // save button value clicked in a variable
        currentDisplayOutput += button.value; // update what the display screen shows
        value.textContent = currentDisplayOutput;
        clearDisplay(); // clear display screen to update with new number after inputting operation
        display.appendChild(value);
    }
}

// clear display and all current operations
function reset(button) {
    if (!button) {
        currentOperation = '';
        currentDisplayOutput = '';
    }
    else {
        currentOperation = button.value;
        currentDisplayOutput = button.value;
    }
    clearDisplay();
}

// clear display only
function clearDisplay() {
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
    reset();
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
