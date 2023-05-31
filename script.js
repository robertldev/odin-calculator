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