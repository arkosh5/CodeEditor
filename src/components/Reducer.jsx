// Reducer.jsx
export const initialState = {
  tabs: [
    {
      id: 1,
      name: "Tab 1",
      html: "",
      css: "",
      js: "",
    },
  ],
  activeTab: 1,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };
    case "SET_HTML":
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === state.activeTab ? { ...tab, html: action.payload } : tab
        ),
      };
    case "SET_CSS":
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === state.activeTab ? { ...tab, css: action.payload } : tab
        ),
      };
    case "SET_JS":
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === state.activeTab ? { ...tab, js: action.payload } : tab
        ),
      };
    case "SET_ALL":
      return { ...state, ...{ ...state, ...action.payload } };
    case "CLEAR_ALL":
      return initialState;
    case "ADD_TAB":
      return {
        ...state,
        tabs: [...state.tabs, action.payload],
        activeTab: action.payload.id,
      };
    case "REMOVE_TAB": {
      const newTabs = state.tabs.filter((tab) => tab.id !== action.payload);
      return {
        ...state,
        tabs: newTabs,
        activeTab: newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null,
      };
    }
    default:
      return state;
  }
};
