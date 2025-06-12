export const Badge = ({ 
  children, 
  variant = "primary", // primary, success, warning, danger, info
  size = "normal", // small, normal, medium, large
  icon = null 
}) => {
  const sizeClass = size !== "normal" ? `is-${size}` : ""
  
  return (
    <span className={`tag is-${variant} ${sizeClass}`}>
      {icon && (
        <span className="icon">
          <i className={icon}></i>
        </span>
      )}
      <span>{children}</span>
    </span>
  )
};

export default Badge;