import { Empty } from "antd";

export const EmptyState = ({
  icon = "fas fa-inbox",
  title = "Aucun élément",
  description = "Il n'y a rien à afficher pour le moment",
  action = null
}) => {
  return (
    <div className="has-text-centered py-6">
      <span className="icon is-large has-text-grey-light">
        <i className={`${icon} fa-3x`}></i>
      </span>
      <h3 className="title is-4 mt-4 has-text-grey">{title}</h3>
      <p className="subtitle is-6 has-text-grey">{description}</p>
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  )
};

export default EmptyState;