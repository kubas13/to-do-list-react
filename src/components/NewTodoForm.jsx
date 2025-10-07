import { useState } from "react";
import Modal from "./CustomModal"

export function NewTodoForm(props) {
  const [newItem, setNewItem] = useState("");
  const [showModal, setShowModal] = useState(false);



  function handleSubmit(e) {
    e.preventDefault();

    if (newItem.trim() === "") {
      setShowModal(true);
      return;
    } 

    props.onSubmit(newItem);

    setNewItem("");

  }

  function closeModal() {
    setShowModal(false)
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="new-item-form">
      <label htmlFor="item">Add your thing to do</label>
      <div className="form-row">
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          id="item"
        />
      <button className="btn">Add</button>
      </div>
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