const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true };
    case "SET_QUESTIONS":
      return { ...state, isLoading: false, questions: action.payload };
    case "HANDLE_NEXT": {
      return { ...state, currentQuestion: state.currentQuestion + 1 };
    }
    case "HANDLE_ANSWER": {
      const { correct_answer } = state.questions.find(
        (question) => question.question === action.payload.question
      );
      const currectAnswersAmount =
        action.payload.answer === correct_answer
          ? state.currectAnswers + 1
          : state.currectAnswers;

      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        currectAnswers: currectAnswersAmount,
      };
    }
  }
};

export default reducer;
