export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = "medium", // small, medium, large
  closable = true 
}) => {
  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closable) {
      onClose()
    }
  }

  const sizeClass = size === "large" ? "is-large" : size === "small" ? "is-small" : ""

  return (
    <div className="modal is-active" onClick={handleBackdropClick}>
      <div className="modal-background"></div>
      <div className={`modal-card ${sizeClass}`}>
        {title && (
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            {closable && (
              <button 
                className="delete" 
                aria-label="close"
                onClick={onClose}
              ></button>
            )}
          </header>
        )}
        <section className="modal-card-body">
          {children}
        </section>
      </div>
      {closable && (
        <button 
          className="modal-close is-large" 
          aria-label="close"
          onClick={onClose}
        ></button>
      )}
    </div>
  )
};

export default Modal;