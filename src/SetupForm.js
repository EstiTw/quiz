import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit, isError } = useGlobalContext();

  return (
    <section className="quiz quiz-small">
      <h2>setup quiz</h2>
      <form className="setup-form" onSubmit={(e) => handleSubmit(e)}>
        {/* amount */}
        <div className="form-control">
          <label htmlFor="amount">number of questions</label>
          <input
            className="form-input"
            type="number"
            name="amount"
            id="amount"
            min="1"
            max="50"
            defaultValue={quiz.amount}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {/* category */}
        <div className="form-control">
          <label htmlFor="category">category</label>
          <select
            className="form-input"
            defaultValue={quiz.category}
            name="category"
            onChange={(e) => handleChange(e)}
          >
            <option value="sports">sports</option>
            <option value="history">history</option>
            <option value="politics">politics</option>
          </select>
        </div>
        {/* difficulty */}
        <div className="form-control">
          <label htmlFor="dificulty">select difficulty</label>
          <select
            className="form-input"
            defaultValue={quiz.difficulty}
            name="difficulty"
            onChange={(e) => handleChange(e)}
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>
        {isError && (
          <p className="error">
            can't generate questions, please try different options
          </p>
        )}
        <button className="submit-btn" onClick={(e) => handleSubmit(e)}>
          start
        </button>
      </form>
    </section>
  );
};

export default SetupForm;
