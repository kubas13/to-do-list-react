export function Modal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          {onCancel && (
            <button className="btn btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button className="btn btn-confirm" onClick={onConfirm}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
