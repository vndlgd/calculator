let currentOperation = '0'; // keep track of user input 
let currentDisplayOutput = '0'; // keep track of what is shown on the display
let operationArray = [0]; // keep track of final operation, once full, pop twice and result will replace item at index 0 
const display = document.querySelector('#display');
const value = document.createElement('div');
value.classList.add("currentOperation");
let lastButtonWasEquals = false;

function displayValue(button) {
    // isNaN is false if it's a number, otherwise it is not a number
    if (isNaN(button.value) && button.value !== '.') {
        addOperator(button);
    } else if (button.value === '.') {
        addDecimal(button);
    }
    else {
        addNumber(button);
    }
}

function addNumber(button) {
    // we must be able to use and display decimals but only once in arr[0] and arr[2]
    // initially, get rid of the 0, but we user enters operator, we use 0 as first operand
    if (checkLength(currentOperation)) {
        return;
    }
    wasLastButtonEquals(button);
    if (operationArray[0] === 0) {
        currentOperation = '';
        currentDisplayOutput = '';
    }

    currentOperation += button.value;
    currentDisplayOutput = currentOperation;
    if (typeof operationArray[1] === 'undefined') {
        operationArray[0] = currentOperation;
    } else {
        clearDisplay();
        operationArray[2] = currentOperation;
    }
    value.textContent = currentDisplayOutput;
    display.appendChild(value);
}

function addOperator(button) {
    // if equals sign, call operate
    // else operator is + - * /
    wasLastButtonEquals(button);
    currentOperation = '';
    if (button.value === '=') {
        if (operationArray.length === 3) {
            operate(operationArray[1], operationArray[0], operationArray[2], button.value);
        } else if (operationArray.length === 2) {
            operate(operationArray[1], operationArray[0], operationArray[0], button.value);
        }
        return;
    }
    // always update the array, add index 3 item, then do transformation
    if (typeof operationArray[2] === 'undefined') {
        operationArray[1] = button.value;
    } else {
        // if there's already a value in index 2 and you try another operator
        // call operate, store result in index 0
        // put new operator user pressed in index 1
        operate(operationArray[1], operationArray[0], operationArray[2], button.value);
        operationArray[1] = button.value;
    }
}

function addDecimal(button) {
    wasLastButtonEquals(button);

    // if index 2 item doesnt exist
    if (typeof operationArray[2] === 'undefined') {
        // append to 0 index item or 
        // 0 + '.'
        // if first num doesn't already contain . and operator is undefined
        if (!(operationArray[0].toString().includes('.')) && typeof operationArray[1] === 'undefined') {
            currentOperation += button.value;
            currentDisplayOutput += button.value;
            operationArray[0] = currentOperation;
            // if we haven't defined an operator, it means we're working with the first operand
        } else if (typeof operationArray[1] !== 'undefined') {
            currentOperation = '0' + button.value;
            currentDisplayOutput = currentOperation;
            operationArray[2] = currentOperation;
        }
        // if 2 is not undefined (meaning it has numbers already or we initialized it to 0.)
    } else {
        if (!(operationArray[2].toString().includes('.')) && typeof operationArray[1] !== 'undefined') {
            currentOperation += button.value;
            currentDisplayOutput += button.value;
            operationArray[2] = currentOperation;
        }
    }
    value.textContent = currentDisplayOutput;
    display.appendChild(value);
}

function wasLastButtonEquals(button) {
    if (lastButtonWasEquals) {
        if (isNaN(button.value) === false || button.value === '.') {
            reset();
            lastButtonWasEquals = false;
            // else we have an operator (+, -, *, /) and we should continue
        } else {
            lastButtonWasEquals = false;
        }
    }
}

function reset(button) {
    if (!button) {
        currentOperation = '0';
        currentDisplayOutput = '0';
    } else {
        currentOperation = '0';
        currentDisplayOutput = '0';
    }

    operationArray = [0];
    value.textContent = operationArray[0];
    clearDisplay();
    display.appendChild(value);
}

// clear display only
function clearDisplay() {
    while (display.firstChild) {
        display.removeChild(display.firstChild);
    }
}

// pass currentOperation string as an array of chars to perform calculation
function operate(operator, number1, number2, value) {
    const output = document.createElement('div');
    output.classList.add('output');

    let result = '';

    // handles error state
    // return error message if user tries to divide by 0 or if user tries to operate on Error
    if ((operator === '/' && number2 === '0') || (number1 === 'Error' || number2 === 'Error')) {
        result = 'Error';
    }
    else if (operator === '+') {
        result = add(+number1, +number2);
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
    // if result has long decimals, round answer to avoid overflow
    if (result.toString().length >= 8 && result.toString().includes(".")) {
        result = result.toPrecision(8);
    }
    // don't let output exceed screen size, return in scientific notation
    if (result.toString().length >= 18) {
        result = result.toFixed(18);
    }
    // check if last operation was = or not
    if (value === '=') {
        lastButtonWasEquals = true;
    } else {
        lastButtonWasEquals = false;
    }

    clearDisplay();
    currentOperation = '';
    operationArray[0] = result;
    currentDisplayOutput = result;
    output.textContent = currentDisplayOutput;
    display.appendChild(output);
    operationArray.pop();
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

function checkLength(number) {
    if (number.length >= 18) {
        return true;
    } else {
        return false;
    }
}

function backspace() {
    let index = 0;
    if (typeof operationArray[1] === 'undefined') {
        index = 0;
    } else {
        index = 2;
    }

    // if last button was equals, don't allow backspace
    if (lastButtonWasEquals === true) {
        return;
    }

    // if not empty, backspace
    if (currentDisplayOutput !== '') {
        // get value minus the last char
        currentOperation = currentOperation.toString().substring(0, currentOperation.length - 1);
        currentDisplayOutput = currentDisplayOutput.toString().substring(0, currentDisplayOutput.length - 1);;
        operationArray[index] = operationArray[index].toString().substring(0, operationArray[index].length - 1);
    }

    value.textContent = currentDisplayOutput;
    // remove previous values
    display.removeChild(display.firstChild);
    // update screen with new value 
    display.appendChild(value);
}

// buttons is a node list. It acts like an array
const buttons = document.querySelectorAll('button');
let focusedOperatorButton = null; // keep track of currently focused

// we use the .forEach method to iterate through each button
buttons.forEach((button) => {
    // gets rid of unwanted focus on items when using mouse and keyboard
    button.setAttribute('onmousedown', 'event.preventDefault()');
    // and for each one we add a 'click' listener
    button.addEventListener('click', function (e) {
        if (e.currentTarget.classList.contains('operator-button')) {
            if (focusedOperatorButton !== null) {
                focusedOperatorButton.classList.remove('focused')
            }
            focusedOperatorButton = button;
            focusedOperatorButton.classList.add('focused');
        } else {
            if (focusedOperatorButton !== null) {
                focusedOperatorButton.classList.remove('focused');
                focusedOperatorButton = null;
            }
        }
        e.currentTarget.classList.add('pressed');
        setTimeout(function () {
            button.classList.remove("pressed");
        }, 200); // for 1s = 1000ms


        if (e.target.value === 'CLEAR') {
            reset(e.target);
            return; // this stops displayValue from executing
        }
        if (e.target.value === 'DELETE') {
            backspace();
            return;
        }
        displayValue(e.target);
    });
});

reset();

// Handle keyboard input 
document.addEventListener('keydown', function (e) {
    handleKeyboardPress(e.key);
});

function handleKeyboardPress(key) {
    switch (key) {
        case '0':
            document.getElementById('button-0').click();
            break;
        case '1':
            document.getElementById('button-1').click();
            break;
        case '2':
            document.getElementById('button-2').click();
            break;
        case '3':
            document.getElementById('button-3').click();
            break;
        case '4':
            document.getElementById('button-4').click();
            break;
        case '5':
            document.getElementById('button-5').click();
            break;
        case '6':
            document.getElementById('button-6').click();
            break;
        case '7':
            document.getElementById('button-7').click();
            break;
        case '8':
            document.getElementById('button-8').click();
            break;
        case '9':
            document.getElementById('button-9').click();
            break;
        case '+':
            document.getElementById('addition').click();
            break;
        case '-':
            document.getElementById('subtraction').click();
            break;
        case '/':
            document.getElementById('division').click();
            break;
        case '*':
            document.getElementById('multiplication').click();
            break;
        case '.':
            document.getElementById('decimal-button').click();
            break;
        case 'Enter':
            document.getElementById('equals-button').click();
            break;
        case '=':
            document.getElementById('equals-button').click();
            break;
        case 'Backspace':
            document.getElementById('delete').click();
            break;
    }
}