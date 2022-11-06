import axios from "axios";
import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import {
  SET_LOADING,
  SET_WAITING,
  SET_QUESTIONS,
  NEXT_QUESTION,
  CHECK_ANSWER,
  CLOSE_MODAL,
  HANDLE_CHANGE,
} from "./actions";

//TODO: encoding questions
//TODO: adding session token
//TODO: checking response code

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const initializeState = {
  isLoading: true,
  waiting: true,
  isModalOpen: false,
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

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
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

  const checkAnswer = (answer, question) => {
    dispatch({ type: CHECK_ANSWER, payload: { answer, question } });
    dispatch({ type: NEXT_QUESTION });
  };

  const fetchQuestions = async (url) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_WAITING });
    try {
      const { data } = await axios(url);
      // console.log(data, data.results);
      dispatch({ type: SET_QUESTIONS, payload: data.results });
    } catch (error) {
      console.log(error);
    }
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
