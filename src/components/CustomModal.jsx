export function Modal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="btn btn-confirm" onClick={onConfirm}>OK</button>
          <button className="btn btn-cancel" onClick={onCancel}>Anuluj</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;