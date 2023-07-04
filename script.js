let currentOperation = ""; // keep track of final operation
let currentDisplayOutput = ""; // keep track of what is shown on the display
const display = document.querySelector('#display');

// perhaps make another function to be able to keep adding digits 
// so instead 22 instead of 2
// also i could possibly add spaces after each operation to eventually seperate by spaces

function displayValue(button) {
    const value = document.createElement('div');
    value.classList.add("currentOperation");


    // if that value has been added already right before, do not add it again
    if (isNaN(button.value) && button.value !== '.' && currentOperation.includes(button.value)) {
        return;
    }

    // if last operation was display result 
    // if an operator is clicked, then we know we're using the result in our new operation
    if (currentOperation.slice(-1) === '=') {
        if (isNaN(button.value) && button.value !== '.') {
            currentOperation = currentOperation.slice(0, -1);
            console.log(currentDisplayOutput)
            currentDisplayOutput = currentOperation.slice(0, -1);
        }
        // else, we're doing a new operation, clear screen and values to show new number
        else {
            reset()
        }
    }
    else if (currentDisplayOutput === "Error") {
        currentOperation = 'Error';
        currentDisplayOutput = 'Error';
        value.textContent = currentDisplayOutput;
        display.appendChild(value);
        return;
    }

    // check if button value is a number or = or decimal point, if it is not, add a spaces for seperation 
    if (isNaN(button.value) && button.value !== '=' && button.value !== '.') {
        currentOperation += ' ';
        currentOperation += button.value;
        currentOperation += ' ';
        currentDisplayOutput = '';
        return; // exit function
    }

    console.log("length: " + currentOperation.length);

    if (button.value === '=') {
        currentOperation += ' ';
        currentOperation += button.value;
        currentOperation = currentOperation.split(' ');
        console.log("length: " + currentOperation.length);
        console.log("HEY: " + currentOperation);
        operate(currentOperation[1], currentOperation[0], currentOperation[2]);
    }
    else {
        currentOperation += button.value; // save button value clicked in a variable
        currentDisplayOutput += button.value; // update what the display screen shows
        value.textContent = currentDisplayOutput;
        clearDisplay(); // clear display screen to update with new number after inputting operation
        display.appendChild(value);
    }
    console.log("true value " + currentOperation);
    console.log('screen value ' + currentDisplayOutput);
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
}

// pass currentOperation string as an array of chars to perform calculation
function operate(operator, number1, number2) {
    const output = document.createElement('div');
    output.classList.add('output');

    let result = '';

    // return error message if user tries to divide by 0 or if user tries to operate on Error
    if ((operator === '/' && number2 === '0') || (number1 === 'Error' || number2 === 'Error')) {
        result = 'Error';
        reset();
    }
    else if (operator === '+') {
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

    console.log("result " + result.toString().length);
    // if result has long decimals, round answer to avoid overflow
    if (result.toString().length >= 8 && result.toString().includes(".")) {
        result = result.toPrecision(8);
    }

    reset();
    console.log(currentOperation);
    currentOperation += result + '=';
    currentDisplayOutput = result;
    output.textContent = currentDisplayOutput;
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
