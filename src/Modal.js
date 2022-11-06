import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { quiz, correct, isModalOpen, closeModal } = useGlobalContext();

  return (
    <section className={`modal-container ${isModalOpen ? "isOpen" : ""}`}>
      <div className="modal-content">
        <h2>Congrats! </h2>
        <p>
          You answered {Math.floor((correct / quiz.amount) * 100)}% of questions
          correctly
        </p>
        <button className="close-btn" onClick={closeModal}>
          play again
        </button>
      </div>
    </section>
  );
};

export default Modal;
