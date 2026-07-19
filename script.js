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
function removeGST(rate) {
    let amount = parseFloat(currentInput);
    if (!isNaN(amount)) {
        currentInput = (amount / (1 + rate / 100)).toFixed(2);
        updateDisplay();
    }
}

// STORAGE
const CalculatorStorage = {
    HISTORY_KEY: 'calculator_history',
    getHistory() {
        return JSON.parse(localStorage.getItem(this.HISTORY_KEY)) || [];
    },

    addToHistory(expression, result) {
        const history = this.getHistory();
        history.unshift({
            expression,
            result,
            timestamp: new Date().toLocaleString()
        });

        if (history.length > 50) history.length = 50;
        
        localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
            this.renderHistory();
    },

    clearHistory() {
        localStorage.removeItem(this.HISTORY_KEY);
        this.renderHistory();
    },

    renderHistory() {
        const history = this.getHistory();
        const list = document.getElementById('historyList');
        list.innerHTML = history.map(item => `
            <div class="history-card">
                <div>${item.expression} = ${item.result}</div>
                <small>${item.timestamp}</small>
            </div>
        `).join('');
    }
};
                
// Buttons            
