const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true };
    case "SET_WAITING":
      return { ...state, waiting: false };
    case "SET_QUESTIONS":
      return { ...state, isLoading: false, questions: action.payload };
    case "NEXT_QUESTION": {
      let nextQuestion = state.index + 1;
      return {
        ...state,
        index: nextQuestion,
        isModalOpen: nextQuestion === state.quiz.amount ? true : false,
      };
    }
    case "CHECK_ANSWER": {
      const { correct_answer } = state.questions.find(
        (question) => question.question === action.payload.question
      );
      const correctAmount =
        action.payload.answer === correct_answer
          ? state.correct + 1
          : state.correct;

      let nextQuestion = state.index + 1;
      return {
        ...state,
        index: nextQuestion,
        correct: correctAmount,
        isModalOpen: nextQuestion === state.quiz.amount ? true : false,
      };
    }
    case "CLOSE_MODAL":
      return {
        ...state,
        isModalOpen: false,
        waiting: true,
        index: 0,
        correct: 0,
        quiz: {
          amount: 10,
          category: "sports",
          difficulty: "easy",
        },
        questions: [],
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
