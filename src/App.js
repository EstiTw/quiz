import React from "react";
import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
import { useGlobalContext } from "./context";

function App() {
  const {
    isLoading,
    isWaiting,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();

  if (isWaiting) return <SetupForm />;
  if (isLoading) return <Loading />;

  const { question, correct_answer, incorrect_answers } = questions[index];
  //randomize correct answer
  const answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) answers.push(correct_answer);
  else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }

  return (
    <main>
      <Modal />
      <section className="quiz">
        <div className="container">
          <p className="correct-answers">
            correct answers: {correct}/{index}
          </p>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div>
            {answers.map((answer, index) => (
              <button
                className="answer-btn"
                key={index}
                onClick={() => checkAnswer(answer === correct_answer)}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
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
