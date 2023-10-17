import React, { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = props => {
  // const [enteredTitle, setEnteredTitle] = useState('');
  // const [enteredAmount, setEnteredAmount] = useState('');
  // const [enteredDate, setEnteredDate] = useState('');
  const [userInput, setUserInput] = useState({
    title: '',
    amount: '',
    date: '',
  });
  const inputChangeHandler = e => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const submitHandler = event => {
    event.preventDefault();

    const expenseData = {
      title: userInput.title,
      amount: userInput.amount,
      date: new Date(userInput.date),
    };
    console.log(expenseData);

    setUserInput({ title: '', amount: '', date: '' });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        {/* Input Title */}
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={userInput.title}
            onChange={inputChangeHandler}
          />
        </div>
        {/* Input Amount */}
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            min="0.01"
            step="0.01"
            value={userInput.amount}
            onChange={inputChangeHandler}
          />
        </div>
        {/* Input Date */}
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            name="date"
            min="2023-01-01"
            max="2025-12-31"
            value={userInput.date}
            onChange={inputChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
