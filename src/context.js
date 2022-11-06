import axios from "axios";
import React, { useState, useContext, useEffect, useReducer } from "react";
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
  category: 21,
  currentQuestion: 0,
  currectAnswers: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initializeState);

  const handleAnswer = (answer, question) => {
    // console.log("handleAnswer", answer);
    dispatch({ type: "HANDLE_ANSWER", payload: { answer, question } });
  };

  const handleNext = () => {
    dispatch({ type: "HANDLE_NEXT" });
  };

  const fetchQuestions = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data, data.results);
      dispatch({ type: "SET_QUESTIONS", payload: data.results });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //encoding
    const url = `${API_ENDPOINT}amount=${state.amount}&category=${state.category}`;
    fetchQuestions(url);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, handleNext, handleAnswer }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
