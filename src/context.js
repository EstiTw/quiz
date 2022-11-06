import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

// const url = "";

const initializeState = {
  isLoading: true,
  questions: [],
  quiz: {
    amount: 10,
    category: "sports",
    difficulty: "easy",
  },
  currentQuestion: 0,
  correctAnswers: 0,
  isModalOpen: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initializeState);

  const handleChange = (e) => {
    dispatch({
      type: "HANDLE_CHANGE",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

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
      const { data } = await axios(url);
      // console.log(data, data.results);
      //TODO: checking response code
      dispatch({ type: "SET_QUESTIONS", payload: data.results });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //TODO: encoding questions
    //TODO: adding session token
    //TODO: fetching with axios
    const url = `${API_ENDPOINT}amount=${state.amount}&category=${state.category}&dificulty=${state.dificulty}`;
    fetchQuestions(url);
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        nextQuestion,
        checkAnswer,
        closeModal,
        table,
        handleChange,
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
