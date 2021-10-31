// let balance, income, expense, itemName, itemAmt;
let balance = document.querySelector('.balanceInput');
let income = document.querySelector('.incomeInput');
let expense = document.querySelector('.expInput');
let itemName = document.querySelector('.itemNameInput');
let itemAmt = document.querySelector('.amtInput');
const itemContainer = document.querySelector('.itemList');

// Allow valued to be enter for balance but not income/exp
balance.value = (0).toFixed(2);
income.value = (0).toFixed(2);
expense.value = (0).toFixed(2);

class Item {
  constructor(name, amt) {
    this.name = name;
    this.amt = amt;
  }
}

class UI {
  static addItemToList() {
    const row = document.createElement('tr');
    row.classList.add('itemRow');

    row.innerHTML = `
       <td class='tdName'>${itemName.value}</td>
       <td class='tdNum'>${Number(itemAmt.value).toFixed(2)}</td>
       <td><button class='delete'>x</button></td>
    `;
    itemContainer.appendChild(row);
  }

  static removeItem(el) {
    if (el.classList.contains('delete')) {
      //   Update UI once item is removed

      const item = el.parentElement.parentElement;
      const childEl = item.children[1];
      const num = childEl.innerHTML;

      //   Update Balance & Income input
      if (num > 0) {
        let a = (balance.value -= parseFloat(num));
        let b = (income.value -= parseFloat(num));
        balance.value = a.toFixed(2);
        income.value = b.toFixed(2);
      }

      //   Update Balance & Expense input
      if (num < 0) {
        let a = Number(balance.value) - parseInt(num);
        let b = Number(expense.value) - parseInt(num);

        balance.value = a.toFixed(2);
        expense.value = b.toFixed(2);
      }

      item.remove();
    }
  }

  static updateTracker() {
    const total = function (num1, num2) {
      return parseFloat(num1) + parseFloat(num2);
    };
    //   --update income
    if (itemAmt.value > 0) {
      const incomeTotal = total(income.value, itemAmt.value);
      income.value = incomeTotal.toFixed(2);
    }
    //   --update expense
    if (itemAmt.value < 0) {
      const expenseTotal = total(expense.value, itemAmt.value);
      expense.value = expenseTotal.toFixed(2);
    }
    //   --update balance
    balance.value = total(income.value, expense.value).toFixed(2);
  }

  static clearfield() {
    itemName.value = '';
    itemAmt.value = '';
  }
}

// Event Add Book
document.querySelector('button').addEventListener('click', (e) => {
  e.preventDefault();

  if (!itemName.value || !itemAmt.value) {
    alert('Please fill in all fields');
  } else {
    const item = new Item(itemName.value, itemAmt.value);
    UI.addItemToList(item);
    UI.updateTracker();
    UI.clearfield();
  }
});

// Event Delete Book
itemContainer.addEventListener('click', (e) => {
  UI.removeItem(e.target);
});
