import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    isLoading,
    questions,
    currentQuestion,
    currectAnswers,
    handleNext,
    handleAnswer,
    amount,
  } = useGlobalContext();

  if (isLoading) return <Loading />;
  if (currentQuestion === amount) return <Modal />;

  const { question, correct_answer, incorrect_answers } =
    questions[currentQuestion];
  const optionalAnswers = [correct_answer, ...incorrect_answers];
  return (
    <main>
      <section className="quiz">
        <div className="container">
          <p className="correct-answers">
            correct answers: {currectAnswers}/{currentQuestion}
          </p>
          <h2>{question}</h2>
          <div>
            {optionalAnswers.map((answer, index) => (
              <button
                className="answer-btn"
                key={index}
                onClick={() => handleAnswer(answer, question)}
              >
                {answer}
              </button>
            ))}
          </div>
          <button className="next-question" onClick={handleNext}>
            next question
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
