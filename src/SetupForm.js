import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { table, quiz, handleChange, handleSubmit } = useGlobalContext();

  return (
    <section className="quiz quiz-small">
      <h2>setup quiz</h2>
      <form className="setup-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-control">
          <label htmlFor="amount">number of questions</label>
          <input
            className="form-input"
            type="number"
            name="amount"
            id="amount"
            min="1"
            max="50"
            value={quiz.amount}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="category">category</label>
          <select
            className="form-input"
            defaultValue={quiz.category}
            name="category"
            onChange={(e) => handleChange(e)}
          >
            {Object.keys(table).map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
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
        <button className="submit-btn" onClick={(e) => handleSubmit(e)}>
          start
        </button>
      </form>
    </section>
  );
};

export default SetupForm;
