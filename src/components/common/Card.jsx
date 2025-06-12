export const Card = ({ 
  children, 
  title = null, 
  subtitle = null,
  image = null,
  footer = null,
  hoverable = false,
  className = ""
}) => {
  return (
    <div className={`card ${hoverable ? 'is-hoverable' : ''} ${className}`}>
      {image && (
        <div className="card-image">
          <figure className="image">
            {typeof image === 'string' ? (
              <img src={image} alt={title || 'Card image'} />
            ) : (
              image
            )}
          </figure>
        </div>
      )}
      
      {(title || subtitle) && (
        <header className="card-header">
          {title && (
            <p className="card-header-title">
              {title}
            </p>
          )}
          {subtitle && (
            <p className="card-header-subtitle">
              {subtitle}
            </p>
          )}
        </header>
      )}
      
      <div className="card-content">
        {children}
      </div>
      
      {footer && (
        <footer className="card-footer">
          {footer}
        </footer>
      )}
    </div>
  )
};

export default Card;
