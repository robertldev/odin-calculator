let calcDisplay = document.querySelector('#display-content');

/* Add event listeners for on-click effects */
let buttonNodeList = document.querySelectorAll('.button');
buttonNodeList.forEach((button) => {
    button.addEventListener('mousedown', () => {
        button.style.boxShadow = 'inset 0px 3px #505050';
    })
    button.addEventListener('mouseup', () => {
        button.style.boxShadow = '0px 3px #505050';
    })
})

/* Add event listeners for number clicks and to update display on those */
let numberNodeList = document.querySelectorAll('.number');
numberNodeList.forEach((number) => {
    number.addEventListener('click', () => {
        updateDisplay(number.textContent);
    })
})

/* Add event listener for decimal point and update display on those */
document.querySelector('#button-decimal').addEventListener('click', () => {
    if (!calcDisplay.textContent.includes('.')) {
        updateDisplay('.'); /* Ensure only one decimal point is possible */
    }
})

/* Add functionality to the Clear button */
document.querySelector('#button-clear').addEventListener('click', () => {
    document.querySelector('#display-content').textContent = '0';
})

/* Basic maths functions */
addNumbers = (a, b) =>  a + b;
subtractNumbers = (a, b) => a - b;
multiplyNumbers = (a, b) => a * b;
divideNumbers = (a, b) => a / b;

/* Create main operate function to call the above */
function operate(num1, num2, operator) {
    switch (operator) {
        case 'add':
            return addNumbers(num1, num2);
            break;
        case 'subtract':
            return subtractNumbers(num1, num2);
            break;
        case 'multiply':
            return multiplyNumbers(num1, num2);
            break;
        case 'divide':
            return divideNumbers(num1, num2);
            break;
    }
}

function updateDisplay(number) {
    if (calcDisplay.textContent.length < 9 && calcDisplay.textContent != 0) {
        calcDisplay.textContent = calcDisplay.textContent.concat(number);
        /* This is to push new numbers on rather than add */
        /* Also limiting the number of chars due to space, and also avoiding the possibility of a trail of 0's */
    } else if (calcDisplay.textContent == 0) {
        calcDisplay.textContent = number;
    }
}