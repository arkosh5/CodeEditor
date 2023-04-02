// components/TabNavigation.js
/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { CodeContext } from "./hooks/useCodeEditor"; // Update the import path
import styles from "./CodeEditor.module.css";

function TabNavigation({ onTabClick, onAddTab }) {
  const { tabs, activeTabId } = useContext(CodeContext); // Use the context

  return (
    <div className={styles.tabNavigation}>
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.id}
          className={tab.id === activeTabId ? styles.activeTab : ""}
          onClick={() => onTabClick(tab.id)}
        >
          {tab.name}
        </button>
      ))}
      <button type="button" onClick={onAddTab}>
        + Add Tab
      </button>
    </div>
  );
}

export default TabNavigation;
