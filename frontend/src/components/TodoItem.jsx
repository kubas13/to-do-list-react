import { useState } from "react";
import { Modal } from "./CustomModal";
import { use } from "react";

export function TodoItem({
  completed,
  id,
  title,
  date,
  time,
  note,
  toggleTodo,
  deleteTodo,
  updateTodo,
  onEdit,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(title);
  const [editDate, setEditDate] = useState(date);
  const [editTime, setEditTime] = useState(time);

  const [noteText, setNoteText] = useState(note || "");
  const [tempNote, setTempNote] = useState(note || "");

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  const handleSave = () => {
    updateTodo(id, editText, editDate, editTime, noteText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteTodo(id);
    setShowDeleteModal(false);
  };

  const openNoteModal = () => {
    setTempNote(noteText);
    setShowNoteModal(true);
  };

  const confirmNote = () => {
    setNoteText(tempNote);
    updateTodo(id, editText, editDate, editTime, tempNote);
    setShowNoteModal(false);
  };

  return (
    <li className={completed ? "completed" : ""}>
      <label>
        <input
          type="checkbox"
          className="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        <div className="todo-main">
          <div className="todo-header">
            <span className="todo-title">{title}</span>
          </div>
          {(date || time) && (
            <div className="todo-meta">
              {date || "-"} {time || "-"}
            </div>
          )}
        </div>
      </label>

      <div className="todo-actions">
        <button onClick={() => onEdit({id, title, date, time, note})} className="btn btn-edit">
          Edit
        </button>
        <button onClick={openNoteModal} className="btn btn-note">
          Note
        </button>
        <button onClick={handleDelete} className="btn btn-delete">
          Delete
        </button>
      </div>

      {showNoteModal && (
        <Modal
          title="Add a note"
          message={
            <textarea
              value={tempNote}
              onChange={(e) => setTempNote(e.target.value)}
              rows={4}
              style={{ width: "100%", padding: "8px", borderRadius: "8px" }}
              placeholder="Write your note here..."
            />
          }
          onConfirm={confirmNote}
          onCancel={() => setShowNoteModal(false)}
        />
      )}

      {showDeleteModal && (
        <Modal
          title="Confirm Delete"
          message={`Are you sure you want to delete "${title}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

    </li>
  );
}
