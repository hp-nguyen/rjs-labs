import React, { useState } from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = ({ onAddExpense }) => {
  const saveExpenseDataHandler = enteredExpenseData => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    onAddExpense(expenseData);
    setIsShowForm(false);
  };
  // State Show form
  const [isShowForm, setIsShowForm] = useState(false);
  return (
    <div className="new-expense">
      {!isShowForm && (
        <button onClick={() => setIsShowForm(true)}>Add New Expense</button>
      )}
      {isShowForm && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={() => setIsShowForm(false)}
        />
      )}
    </div>
  );
};

export default NewExpense;
