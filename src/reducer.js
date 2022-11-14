import {
  SET_LOADING,
  SET_WAITING,
  SET_QUESTIONS,
  NEXT_QUESTION,
  CHECK_ANSWER,
  CLOSE_MODAL,
  HANDLE_CHANGE,
  SET_ERROR,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };

    case SET_WAITING:
      return { ...state, isWaiting: action.payload };

    case SET_ERROR:
      return { ...state, isError: true };

    case SET_QUESTIONS:
      return {
        ...state,
        isLoading: false,
        isWaiting: false,
        error: false,
        questions: action.payload,
      };

    case NEXT_QUESTION: {
      let nextQuestion = state.index + 1;
      return {
        ...state,
        index: nextQuestion === state.quiz.amount ? 0 : nextQuestion,
        isModalOpen: nextQuestion === state.quiz.amount ? true : false,
      };
    }

    case CHECK_ANSWER: {
      return {
        ...state,
        correct: action.payload ? state.correct + 1 : state.correct,
      };
    }

    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
        isWaiting: true,
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
      let { name, value } = action.payload;
      if (name === "amount") value = +value; //convert string value to integer
      return { ...state, quiz: { ...state.quiz, [name]: value } };
    }

    default:
      throw new Error(`no matching ${action.type} action type`);
  }
};

export default reducer;
