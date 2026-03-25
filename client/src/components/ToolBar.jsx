import React, { useState, useEffect } from "react";
import { useToolBarContext } from "../context/ToolBarContext";
import "../styles/Todos.css";

function ToolBar({ onAdd, addFields = [], compact = false }) {
  const context = useToolBarContext();
  const {
    searchTerm,
    setSearchTerm,
    searchCriteria,
    setSearchCriteria,
    sortCriteria,
    setSortCriteria,
    finishTask,
    finishTaskToggle,
  } = context;

  const [buttonsVisible, setButtonsVisible] = useState(null);
  const [addValues, setAddValues] = useState({});

  useEffect(() => {
    if (buttonsVisible === "add") {
      const init = {};
      addFields.forEach((f) => {
        init[f.name] =
          f.type === "checkbox" ? f.default ?? false : f.default ?? "";
      });
      setAddValues(init);
    }
  }, [buttonsVisible, addFields]);

  const closeAllActions = () => {
    setButtonsVisible(null);
    finishTaskToggle();
  };

  const handleBack = (actionType) => {
    closeAllActions();
    if (actionType === "search") {
      setSearchTerm("");
      setSearchCriteria("")
      // setSearchCriteria("id");
    } else if (actionType === "sort") {
      setSortCriteria("")
      // setSortCriteria("id");
    } else if (actionType === "add") {
      setAddValues({});
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();    
    await onAdd?.({ ...addValues });
    handleBack("add");
  };

  const updateAddValue = (name, value) => {
    setAddValues((prev) => ({ ...prev, [name]: value }));
  };

  const renderMainActions = () => (
    <div className={`todos-toolbar${compact ? ' compact' : ''}`}>
      <button
        className="todos-btn"
        onClick={() => {
          setButtonsVisible("add");
          finishTaskToggle();
        }}
      >
        + New
      </button>
      <button
        className="todos-btn-outline todos-btn"
        onClick={() => {
          setButtonsVisible("search");
          finishTaskToggle();
        }}
      >
        🔍 Search
      </button>
      <button
        className="todos-btn-outline todos-btn"
        onClick={() => {
          setButtonsVisible("sort");
          finishTaskToggle();
        }}
      >
        ↕️ Sort
      </button>
    </div>
  );

  const renderSortUI = () => (
    <div className={`todos-toolbar${compact ? ' compact' : ''}`}>
      <button
        className="todos-btn-outline todos-btn"
        onClick={() => handleBack("sort")}
      >
        ← Back
      </button>
      <span style={{ fontSize: "14px", color: "#64748B", fontWeight: 500 }}>
        Sort by:
      </span>
      <select
        className="todos-select"
        value={sortCriteria}
        onChange={(e) => setSortCriteria(e.target.value)}
      >
        <option value="none">None</option>
        {addFields.some((f) => f.name === "id") && (
          <option value="id">ID</option>
        )}
        {addFields.some((f) => f.name === "title") && (
          <option value="title">Title</option>
        )}
        {addFields.some((f) => f.name === "completed") && (
          <option value="completed">Completed</option>
        )}
        {addFields.some((f) => f.name === "comment") && (
        <option value="comment">Comment</option>
        )}
      </select>
    </div>
  );

  const renderSearchUI = () => (
    <div className={`todos-toolbar${compact ? ' compact' : ''}`}>
      <button
        className="todos-btn-outline todos-btn"
        onClick={() => handleBack("search")}
      >
        ← Back
      </button>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 2 }}>
        <input
          type="text"
          placeholder={searchCriteria === "completed" ? "Enter: true/false" : "Search..."}
          className="todos-search-input"
          style={{ flex: 1, padding: "10px 14px 10px 56px", fontSize: "14px", height: "44px", boxSizing: "border-box" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <span style={{ fontSize: "14px", color: "#64748B", fontWeight: 500 }}>
        By:
      </span>
      <select
        className="todos-select"
        value={searchCriteria}
        onChange={(e) => setSearchCriteria(e.target.value)}
      >
        <option value="none">None</option>
        {addFields.some((f) => f.name === "completed") &&
          (<option value="id">ID</option>)}
        {addFields.some((f) => f.name === "title") && (
          <option value="title">Title</option>
        )}
        {addFields.some((f) => f.name === "comment") && (
          <option value="comment">Comment</option>
        )}
        {addFields.some((f) => f.name === "completed") && (
          <option value="completed">Completed</option>
        )}
      </select>
    </div>
  );

  const renderAddUI = () => (
    <div className={`todos-toolbar${compact ? ' compact' : ''}`}>
      <button
        className="todos-btn-outline todos-btn"
        onClick={() => handleBack("add")}
      >
        ← Back
      </button>
      <div style={{ display: "flex", gap: compact ? 4 : 12, alignItems: "center", flex: 1 }}>
        <form
          onSubmit={handleAddItem}
          style={{ display: "flex", gap: 12, alignItems: "center", flex: 1 }}
        >
          {addFields.map((field) => (
            <div
              key={field.name}
              style={{ display: "flex", alignItems: "center", gap: compact ? 4 : 8 }}
            >
              <label
                htmlFor={field.name}
                style={{ fontSize: compact ? "11px" : "14px", color: "#64748B", fontWeight: 500, minWidth: compact ? "35px" : "auto" }}
              >
                {field.label}:
              </label>
              {field.type === "checkbox" ? (
                <input
                  id={field.name}
                  type="checkbox"
                  className="todos-checkbox"
                  checked={!!addValues[field.name]}
                  onChange={(e) => updateAddValue(field.name, e.target.checked)}
                />
              ) : (
                <input
                  id={field.name}
                  type={field.type || "text"}
                  className="todos-search-input"
                  style={{ minWidth: compact ? "100px" : "200px" }}
                  value={addValues[field.name] ?? ""}
                  onChange={(e) => updateAddValue(field.name, e.target.value)}
                  required
                />
              )}
            </div>
          ))}
          <button className="todos-btn" type="submit">
            ✓ Create
          </button>
        </form>
      </div>
    </div>
  );

  if (!buttonsVisible && finishTask) return renderMainActions();
  if (buttonsVisible === "sort") return renderSortUI();
  if (buttonsVisible === "search") return renderSearchUI();
  if (buttonsVisible === "add") return renderAddUI();

  return null;
}

export default ToolBar;
