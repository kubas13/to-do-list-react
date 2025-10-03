import { useState, useEffect } from "react";

export function TodoItem({ completed, id, title, toggleTodo, deleteTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(title);

  // Synchronizacja editText, gdy title zmienia się w props
  useEffect(() => {
    setEditText(title);
  }, [title]);

  const handleSave = () => {
    if (editText.trim() === "") return; // blokada pustego tytułu
    updateTodo(id, editText);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditText(title);
    }
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button onClick={handleSave} className="btn btn-save">
            Save
          </button>
        </>
      ) : (
        <>
          <label>
            <input
              type="checkbox"
              className="checkbox"
              checked={completed}
              onChange={(e) => toggleTodo(id, e.target.checked)}
            />
            {title}
          </label>
          <button onClick={() => setIsEditing(true)} className="btn btn-edit">
            Edit
          </button>
          <button onClick={() => deleteTodo(id)} className="btn btn-delete">
            Delete
          </button>
        </>
      )}
    </li>
  );
}
