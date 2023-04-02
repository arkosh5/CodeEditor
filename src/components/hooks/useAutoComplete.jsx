import { useCallback, useState } from "react";

const useAutoComplete = (suggestions = []) => {
  const [searchText, setSearchText] = useState("");

  const handleAutoComplete = useCallback(
    (cm) => {
      const { line, ch } = cm.getCursor();
      const token = cm.getTokenAt({ line, ch });
      if (token.type !== "string" && !searchText) return;

      const start = token.string.slice(0, ch - token.start);
      if (start.length < 2) return;

      const matches = suggestions.filter((suggestion) =>
        suggestion.startsWith(start)
      );

      // if there's only one match, complete the word
      if (matches.length === 1) {
        const end = token.string.slice(ch - token.start);
        cm.replaceRange(
          matches[0] + end,
          { line, ch: token.start },
          { line, ch: token.end }
        );
      } else {
        setSearchText(start);
      }
    },
    [searchText, suggestions, setSearchText]
  );

  return {
    searchText,
    setSearchText,
    handleAutoComplete,
  };
};

export default useAutoComplete;
