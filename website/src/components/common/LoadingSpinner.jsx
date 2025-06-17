export const LoadingSpinner = ({ 
  message = "Chargement...", 
  size = "medium",
  centered = true 
}) => {
  const sizeClass = size === "large" ? "is-large" : size === "small" ? "is-small" : "is-medium"
  
  return (
    <div className={`loader-container ${centered ? 'has-text-centered' : ''}`}>
      <div className="columns is-centered">
        <div className="column is-narrow">
          <div className="card">
            <div className="card-content">
              <div className="content has-text-centered">
                <button className={`button is-primary is-loading ${sizeClass}`} style={{ minWidth: '120px' }}>
                  Loading
                </button>
                <p className="mt-4 mb-0">{message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default LoadingSpinner;