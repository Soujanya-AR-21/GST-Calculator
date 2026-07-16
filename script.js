const display = document.getElementById('display');
let currentInput = '';

// Display
function updateDisplay() {
    display.textContent = currentInput || '0';
}

// Input
function appendNumber(num) {
    currentInput += num;
     updateDisplay();
}

function appendOperator(op) {
    if (currentInput && !isNaN(currentInput.slice(-1))) {
        currentInput += op;
        updateDisplay();
    }
}

// Clear / Delete
function clearDisplay() {
    currentInput = '';
    updateDisplay();
}

function deleteChar() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

// Calculate
function calculateResult() {
    try {
        let expression = currentInput;
        let result = eval(currentInput).toString();

        currentInput = result;
        CalculatorStorage.addToHistory(expression, result);

        } catch {
        currentInput = 'Error';
    }
    updateDisplay();
}

// GST
if (!isNaN(amount)) {
        let gst = (amount * rate) / 100;
        currentInput = (amount + gst).toFixed(2);
        updateDisplay();
    }
