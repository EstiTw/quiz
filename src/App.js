import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    isLoading,
    isModalOpen,
    questions,
    currentQuestion,
    correctAnswers,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();

  return (
    <main>
      <SetupForm />
    </main>
  );

  if (isLoading) return <Loading />;
  if (isModalOpen) return <Modal />;

  const { question, correct_answer, incorrect_answers } =
    questions[currentQuestion];
  //TODO:  randomize correct answer
  const optionalAnswers = [correct_answer, ...incorrect_answers];
  return (
    <main>
      <section className="quiz">
        <div className="container">
          <p className="correct-answers">
            correct answers: {correctAnswers}/{currentQuestion}
          </p>
          <h2>{question}</h2>
          <div>
            {optionalAnswers.map((answer, index) => (
              <button
                className="answer-btn"
                key={index}
                onClick={() => checkAnswer(answer, question)}
              >
                {answer}
              </button>
            ))}
          </div>
          <button className="next-question" onClick={nextQuestion}>
            next question
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
