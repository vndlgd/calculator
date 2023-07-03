let currentOperation = "";

function displayValue(button) {
    const display = document.querySelector('#display');
    const value = document.createElement('div');
    value.classList.add("currentOperation");
    value.textContent = button.value;
    currentOperation = button.value; // save value clicked in variable
    display.appendChild(value);
}

function operate(operator, number1, number2) {
    if (operator === '+') {
        add(number1, number2);
    }
    else if (operator === '-') {
        subtract(number1, number2);
    }
    else if (operator === '*') {
        multiply(number1, number2);
    }
    else if (operator === '/') {
        divide(number1, number2);
    }
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
