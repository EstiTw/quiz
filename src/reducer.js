const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true };
    case "SET_QUESTIONS":
      return { ...state, isLoading: false, questions: action.payload };
    case "NEXT_QUESTION": {
      let nextQuestion = state.currentQuestion + 1;
      if (nextQuestion === state.amount)
        return { ...state, currentQuestion: nextQuestion, isModalOpen: true };
      return { ...state, currentQuestion: nextQuestion };
    }
    case "CHECK_ANSWER": {
      const { correct_answer } = state.questions.find(
        (question) => question.question === action.payload.question
      );
      const correctAnswersAmount =
        action.payload.answer === correct_answer
          ? state.correctAnswers + 1
          : state.correctAnswers;

      let nextQuestion = state.currentQuestion + 1;
      if (nextQuestion === state.amount)
        return {
          ...state,
          currentQuestion: nextQuestion,
          correctAnswers: correctAnswersAmount,
          isModalOpen: true,
        };

      return {
        ...state,
        currentQuestion: nextQuestion,
        correctAnswers: correctAnswersAmount,
      };
    }
    case "CLOSE_MODAL":
      return {
        ...state,
        isModalOpen: false,
        currentQuestion: 0,
        correctAnswers: 0,
      };
    case "HANDLE_CHANGE": {
      const { name, value } = action.payload;
      return { ...state, quiz: { ...state.quiz, [name]: value } };
    }
    default:
      throw new Error(`no matching ${action.type} action type`);
  }
};

export default reducer;
