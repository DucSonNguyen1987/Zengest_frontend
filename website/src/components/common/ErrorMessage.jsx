export const ErrorMessage = ({ 
  message, 
  title = "Une erreur est survenue",
  onRetry = null,
  showRetry = false,
  type = "danger" // danger, warning, info
}) => {
  return (
    <div className="columns is-centered">
      <div className="column is-two-thirds">
        <div className={`notification is-${type}`}>
          <div className="content has-text-centered">
            <span className="icon is-large">
              <i className={`fas ${
                type === 'danger' ? 'fa-exclamation-triangle' : 
                type === 'warning' ? 'fa-exclamation-circle' :
                'fa-info-circle'
              } fa-2x`}></i>
            </span>
            <h3 className="title is-4 mt-3">{title}</h3>
            <p className="subtitle is-6">{message}</p>
            
            {showRetry && onRetry && (
              <div className="buttons is-centered mt-4">
                <button 
                  className="button is-primary"
                  onClick={onRetry}
                >
                  <span className="icon">
                    <i className="fas fa-redo"></i>
                  </span>
                  <span>Réessayer</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
};

export default ErrorMessage;