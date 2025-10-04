import { useState } from "react";
import { Modal } from "./CustomModal"; 

export function TodoItem({ completed, id, title, toggleTodo, deleteTodo, updateTodo }) {
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
    <li>
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
            {title}
          </label>
          <button onClick={() => setIsEditing(true)} className="btn btn-edit">
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-delete">
            Delete
          </button>
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
