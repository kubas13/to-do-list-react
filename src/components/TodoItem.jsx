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
        <button onClick={() => setShowEditModal(true)} className="btn btn-edit">
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

      {showEditModal && (
        <Modal
          title="Edit Task"
          message={
            <div className="edit-form">
              <div className="form-row">
                <label>Title:</label>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="todo-edit-input"
                />
              </div>
              <div className="form-row">
                <label>Date:</label>
                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="todo-edit-input"
                />
              </div>
              <div className="form-row">
                <label>Time:</label>
                <input
                  type="time"
                  value={editTime}
                  onChange={(e) => setEditTime(e.target.value)}
                  className="todo-edit-input"
                />
              </div>
              <div className="form-row">
                <label>Note:</label>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  rows={4}
                  className="todo-edit-input"
                />
              </div>
            </div>
          }
          onConfirm={() => {
            updateTodo(id, editText, editDate, editTime, noteText);
            setShowEditModal(false);
          }}
          onCancel={() => setShowEditModal(false)}
        />
      )}
    </li>
  );
}
