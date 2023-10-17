import ExpenseItem from './ExpenseItem';
import './Expenses.css';

function Expenses({ items }) {
  return (
    <div className="expenses">
      {items.map(item => (
        <ExpenseItem
          key={item.title}
          item={item}
        />
      ))}
    </div>
  );
}

export default Expenses;
