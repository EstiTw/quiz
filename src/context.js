import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";

const initializeState = {
  isLoading: true,
  questions: [],
  amount: 3,
  category: table.sports,
  currentQuestion: 0,
  correctAnswers: 0,
  isModalOpen: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initializeState);

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const checkAnswer = (answer, question) => {
    dispatch({ type: "CHECK_ANSWER", payload: { answer, question } });
  };

  const nextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  const fetchQuestions = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data, data.results);
      //TODO: checking response Code
      dispatch({ type: "SET_QUESTIONS", payload: data.results });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //TODO: encoding questions
    //TODO: fetching with axios
    const url = `${API_ENDPOINT}amount=${state.amount}&category=${state.category}`;
    fetchQuestions(url);
  }, []);

  return (
    <AppContext.Provider
      value={{ ...state, nextQuestion, checkAnswer, closeModal }}
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
