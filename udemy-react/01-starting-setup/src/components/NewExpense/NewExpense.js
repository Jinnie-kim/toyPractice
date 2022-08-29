import React, { useState } from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
    setShowExpenseForm(!showExpenseForm);
  };

  const showExpenseFormHandler = () => {
    setShowExpenseForm(!showExpenseForm);
  };

  const getCancelReact = () => {
    setShowExpenseForm(!showExpenseForm);
  };

  return (
    <div className="new-expense">
      {showExpenseForm ? (
        <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onCancelForm={getCancelReact}/>
      ) : (
        <button onClick={showExpenseFormHandler}>Add New Expense</button>
      )}
    </div>
  );
};

export default NewExpense;
