let calcDisplay = document.querySelector('#display-content');
let currentCalc = [];

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
    calcDisplay.textContent = '0';
    currentCalc = [];
})

/* Add functionality to the Backspace button */
document.querySelector('#button-backspace').addEventListener('click', () => {
    if (calcDisplay.textContent != '') {
        calcDisplay.textContent = calcDisplay.textContent.slice(0,-1);
    }
})

/* Add functionality to the positive/negative selector */
document.querySelector('#button-posnev').addEventListener('click', () => {
    if (!calcDisplay.textContent.includes('-')) {
        calcDisplay.textContent = '-' + calcDisplay.textContent;
    } else {
        calcDisplay.textContent = calcDisplay.textContent.slice(1);
    }
})

/* Function for updating the display when number or decimal is clicked */
function updateDisplay(number) {
    if (calcDisplay.textContent.length < 8 && calcDisplay.textContent != '0') {
        calcDisplay.textContent = calcDisplay.textContent.concat(number);
        /* This is to push new numbers on rather than add */
        /* Also limiting the number of chars due to space, and also avoiding the possibility of a trail of 0's */
    } else if (calcDisplay.textContent == 0) {
        if (number == '.') {
            calcDisplay.textContent = calcDisplay.textContent.concat(number);
        } else {
            calcDisplay.textContent = number;
        }
    }
}

function clearDisplay () {
    calcDisplay.textContent = '';
}

/* Add event listener and push to calc array when operation is requested */
let operators = ['add', 'subtract', 'multiply', 'divide'];
operators.forEach((operator) => {
    document.querySelector(`#button-${operator}`).addEventListener('click', () => {
        let currentNum = parseFloat(calcDisplay.textContent);
        if (!isNaN(currentNum)) {
            currentCalc.push(currentNum, `${operator}`);
            clearDisplay();
        }
    })
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

/* Add event listener for equals and invoke calculation */
document.querySelector('#button-equals').addEventListener('click', () => {
    let currentNum = parseFloat(calcDisplay.textContent);
    if (currentNum !== '' && !isNaN(currentNum)) {
        currentCalc.push(currentNum);
    }
    if (currentCalc.length > 2) {
        equalsCalc();
    }
})

/* Now create our function to calculate from our array */
function equalsCalc () {
    if (isNaN(currentCalc[currentCalc.length - 1])) {
        currentCalc.pop();
    }
    if (currentCalc.length == 3) {
        let calcAnswer = operate(currentCalc[0], currentCalc[2], currentCalc[1]);
        calcAnswer = calcAnswer.toFixed(2);
        if (calcAnswer.toString().length < 9) {
            calcDisplay.textContent = calcAnswer;
        }
        currentCalc = [];
    } else {
        let calcAnswer = operate(currentCalc[0], currentCalc[2], currentCalc[1]);
        calcAnswer = calcAnswer.toFixed(2);
        currentCalc.splice(0, 3);
        do {
            calcAnswer = operate(calcAnswer, currentCalc[1], currentCalc[0]);
            currentCalc.splice(0, 2);
        }
        while (currentCalc.length > 0);
        if (calcAnswer.toString().length < 9) {
            calcDisplay.textContent = calcAnswer;
        }
    }
}