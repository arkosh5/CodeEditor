// codeStorage.jsx
import { useCallback } from "react";

export const useSaveCode = (state) => {
  return useCallback(() => {
    const code = JSON.stringify(state);
    localStorage.setItem("code", code);
  }, [state]);
};

export const useLoadCode = (dispatch) => {
  return useCallback(() => {
    const code = localStorage.getItem("code");
    if (code) {
      try {
        const parsedCode = JSON.parse(code);
        dispatch({ type: "SET_ALL", payload: parsedCode });
      } catch (error) {
        // fix the error
      }
    }
  }, [dispatch]);
};

export const useClearCode = (dispatch) => {
  return useCallback(() => {
    dispatch({ type: "CLEAR_ALL" });
  }, [dispatch]);
};
