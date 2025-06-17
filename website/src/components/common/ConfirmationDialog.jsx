export const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmation",
  message = "Êtes-vous sûr de vouloir effectuer cette action ?",
  confirmText = "Confirmer",
  cancelText = "Annuler",
  type = "primary" // primary, danger, warning
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title}
      size="small"
    >
      <div className="content">
        <p>{message}</p>
      </div>
      <div className="buttons is-right">
        <button 
          className="button"
          onClick={onClose}
        >
          {cancelText}
        </button>
        <button 
          className={`button is-${type}`}
          onClick={() => {
            onConfirm()
            onClose()
          }}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  )
};

export default ConfirmationDialog;