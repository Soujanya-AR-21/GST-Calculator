const display = document.getElementById('display');
let currentInput = '';

// Display
function updateDisplay() {
    display.textContent = currentInput || '0';
}

// Input

