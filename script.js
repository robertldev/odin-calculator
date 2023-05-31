/* Add event listeners, and on-click effects */

let buttonNodeList = document.querySelectorAll('.button');

buttonNodeList.forEach((button) => {
    button.addEventListener('mousedown', () => {
        button.style.boxShadow = 'inset 0px 3px #505050';
    })
    button.addEventListener('mouseup', () => {
        button.style.boxShadow = '0px 3px #505050';
    })
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