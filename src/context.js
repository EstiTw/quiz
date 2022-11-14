import React, { useContext, useReducer } from "react";
import axios from "axios";
import reducer from "./reducer";
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

//TODO: adding session token

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const initializeState = {
  isLoading: true,
  isWaiting: true,
  isModalOpen: false,
  isError: false,
  quiz: {
    amount: 5,
    category: "sports",
    difficulty: "easy",
  },
  questions: [],
  index: 0,
  correct: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initializeState);

  const fetchQuestions = async (url) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_WAITING, payload: false });

    const response = await axios(url).catch((error) => console.log(error));

    if (response) {
      const data = response.data.results;
      if (data.length > 0) dispatch({ type: SET_QUESTIONS, payload: data });
      else {
        dispatch({ type: SET_WAITING, payload: true });
        dispatch({ type: SET_ERROR });
      }
    } else {
      //set waiting false -> show setup form
      dispatch({ type: SET_WAITING, payload: true });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = state.quiz;
    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    fetchQuestions(url);
  };

  const handleChange = (e) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const nextQuestion = () => {
    dispatch({ type: NEXT_QUESTION });
  };

  const checkAnswer = (value) => {
    dispatch({ type: CHECK_ANSWER, payload: value });
    dispatch({ type: NEXT_QUESTION });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        table,
        nextQuestion,
        checkAnswer,
        closeModal,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
