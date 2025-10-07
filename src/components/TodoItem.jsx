import { useState } from "react";
import { Modal } from "./CustomModal";

export function TodoItem({
  completed,
  id,
  title,
  date,
  time,
  toggleTodo,
  deleteTodo,
  updateTodo,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(title);
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    updateTodo(id, editText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteTodo(id);
    setShowModal(false);
  };

  return (
    <li className={completed ? "completed" : ""}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{
              width: "200px",
              height: "30px",
              fontSize: "16px",
              padding: "4px",
              borderRadius: "4px",
            }}
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
            <div className="todo-content">
              <span className="todo-title">{title}</span>
              {(date || time) && (
                <span className="todo-datetime">
                  {date || "-"} {time || "-"}
                </span>
              )}
            </div>
          </label>

          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)} className="btn btn-edit">
              Edit
            </button>
            <button onClick={handleDelete} className="btn btn-delete">
              Delete
            </button>
          </div>
        </>
      )}
      {showModal && (
        <Modal
          title="Confirm Delete"
          message={`Are you sure you want to delete "${title}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </li>
  );
}
