const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

let expenses = [];

// Update Total Amount
function updateTotal() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalAmount.textContent = total.toFixed(2);
}

// Render Expenses
function renderExpenses() {
  expenseList.innerHTML = '';

  expenses.forEach((expense, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'expense-item';
    listItem.innerHTML = `
      <span>${expense.name}: $${expense.amount.toFixed(2)}</span>
      <div class="actions">
        <button onclick="editExpense(${index})">✏️</button>
        <button onclick="deleteExpense(${index})">🗑️</button>
      </div>
    `;
    expenseList.appendChild(listItem);
  });

  updateTotal();
}

// Add Expense
expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);

  if (name && !isNaN(amount) && amount > 0) {
    expenses.push({ name, amount });
    renderExpenses();

    expenseForm.reset();
  }
});

// Edit Expense
function editExpense(index) {
  const expense = expenses[index];
  expenseNameInput.value = expense.name;
  expenseAmountInput.value = expense.amount;

  deleteExpense(index);
}

// Delete Expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

// Initial Render
renderExpenses();
