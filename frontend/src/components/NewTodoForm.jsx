import { useState } from "react";
import Modal from "./CustomModal";
export function NewTodoForm(props) {
  const [newItem, setNewItem] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showModal, setShowModal] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem.trim() === "") {
      setShowModal(true);
      return;
    }
    props.onSubmit({
      title: newItem,
      date: date || "No date",
      time: time || "No time",
    });
    setNewItem("");
    setDate("");
    setTime("");
  }
  function closeModal() {
    setShowModal(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <label htmlFor="item">Add your thing to do</label>
        <div className="form-row">
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            id="item"
            placeholder="Task title..."
          />
        </div>
        <div className="form-row">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button className="btn">Add</button>
      </form>
      {showModal && (
        <Modal
          title="Warning"
          message="Please enter a task title!"
          onConfirm={closeModal}
        />
      )}
    </>
  );
}
export default NewTodoForm;
