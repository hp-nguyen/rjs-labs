import { useState } from 'react';

const Form = props => {
  const [enteredName, setEnteredName] = useState(''); // State của input name
  const [enteredNameTouched, setEnteredNameTouched] = useState(false); // State lưu thông tin input name đã bị user chạm vào hay chưa

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailTouched, setenteredEmailTouched] = useState(false);

  // Derived states
  const enteredNameIsValid = enteredName.trim() !== '';
  const enteredNameIsShowError = enteredNameTouched && !enteredNameIsValid;

  const enteredEmailIsValid = enteredEmail.includes('@');
  const enteredEmailIsShowError = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  // Form event handlers
  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  };

  const emailInputChangeHandler = event => {
    setEnteredEmail(event.target.value);
  };

  const nameInputBlurHandler = event => {
    setEnteredNameTouched(true);
  };

  const emailInputBlurHandler = event => {
    setenteredEmailTouched(true);
  };

  const formSubmissionHandler = event => {
    event.preventDefault();
    // if (!formIsValid) return;  // Không cần do đã disable submit khi form chưa valid
    console.log({ enteredName, enteredEmail });

    // Reset states
    // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM
    setEnteredName('');
    setEnteredNameTouched(false);

    setEnteredEmail('');
    setenteredEmailTouched(false);
  };

// className của các ô input
  const nameInputClasses = enteredNameIsShowError
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClasses = enteredEmailIsShowError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {enteredNameIsShowError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your E-Mail</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {enteredEmailIsShowError && (
          <p className="error-text">Please enter a valid email.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default Form;
