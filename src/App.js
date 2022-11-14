import React from "react";
import { useGlobalContext } from "./context";
import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";

function App() {
  const {
    isLoading,
    isWaiting,
    isModalOpen,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();

  if (isWaiting) return <SetupForm />;
  if (isLoading) return <Loading />;

  const { question, correct_answer, incorrect_answers } = questions[index];
  //TODO:  randomize correct answer
  const optionalAnswers = [correct_answer, ...incorrect_answers];
  return (
    <main>
      {isModalOpen && <Modal />}
      <section className="quiz">
        <div className="container">
          <p className="correct-answers">
            correct answers: {correct}/{index}
          </p>
          <h2>{question}</h2>
          <div>
            {optionalAnswers.map((answer, index) => (
              <button
                className="answer-btn"
                key={index}
                onClick={() => checkAnswer(answer === correct_answer)}
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
