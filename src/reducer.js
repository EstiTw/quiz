import {
  SET_LOADING,
  SET_WAITING,
  SET_QUESTIONS,
  NEXT_QUESTION,
  CHECK_ANSWER,
  CLOSE_MODAL,
  HANDLE_CHANGE,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };
    case SET_WAITING:
      return { ...state, waiting: false };
    case SET_QUESTIONS:
      return { ...state, isLoading: false, questions: action.payload };
    case NEXT_QUESTION: {
      let nextQuestion = state.index + 1;
      return {
        ...state,
        index: nextQuestion === state.quiz.amount ? 0 : nextQuestion,
        isModalOpen: nextQuestion === state.quiz.amount ? true : false,
      };
    }
    case CHECK_ANSWER: {
      const { correct_answer } = state.questions.find(
        (question) => question.question === action.payload.question
      );

      return {
        ...state,
        correct:
          action.payload.answer === correct_answer
            ? state.correct + 1
            : state.correct,
      };
    }
    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
        waiting: true,
        index: 0,
        correct: 0,
        quiz: {
          amount: 5,
          category: "sports",
          difficulty: "easy",
        },
        questions: [],
      };
    case HANDLE_CHANGE: {
      const { name, value } = action.payload;
      return { ...state, quiz: { ...state.quiz, [name]: value } };
    }

    default:
      throw new Error(`no matching ${action.type} action type`);
  }
};

export default reducer;
