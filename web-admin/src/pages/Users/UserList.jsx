// src/components/users/UserList.jsx
import { useState } from 'react'
import { USER_ROLES, PERMISSIONS } from '../../../shared/constants/roles'
import { hasPermission } from '../../../shared/utils/permissions'
import { formatDate } from '../../../shared/utils/formatters'
import Pagination from '../common/Pagination'

const UserList = ({ 
  users, 
  currentUser, 
  onEdit, 
  onDelete, 
  onToggleStatus, 
  loading,
  pagination,
  onPageChange 
}) => {
  const [sortField, setSortField] = useState('lastName')
  const [sortDirection, setSortDirection] = useState('asc')

  // Fonction de tri
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Tri des utilisateurs
  const sortedUsers = [...users].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]

    // Gestion des valeurs null/undefined
    if (aValue == null) aValue = ''
    if (bValue == null) bValue = ''

    // Tri selon le type
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Icône de statut
  const getStatusIcon = (isActive) => {
    return isActive ? (
      <span className="tag is-success is-small">
        <span className="icon is-small">
          <i className="fas fa-check"></i>
        </span>
        <span>Actif</span>
      </span>
    ) : (
      <span className="tag is-danger is-small">
        <span className="icon is-small">
          <i className="fas fa-times"></i>
        </span>
        <span>Inactif</span>
      </span>
    )
  }

  // Badge de rôle
  const getRoleBadge = (role) => {
    const roleConfig = {
      [USER_ROLES.ADMIN]: { class: 'is-dark', icon: 'fa-crown', label: 'Admin' },
      [USER_ROLES.MANAGER]: { class: 'is-primary', icon: 'fa-user-tie', label: 'Manager' },
      [USER_ROLES.STAFF_FLOOR]: { class: 'is-info', icon: 'fa-concierge-bell', label: 'Salle' },
      [USER_ROLES.STAFF_KITCHEN]: { class: 'is-warning', icon: 'fa-utensils', label: 'Cuisine' }
    }

    const config = roleConfig[role] || { class: 'is-light', icon: 'fa-user', label: 'Inconnu' }

    return (
      <span className={`tag ${config.class} is-small`}>
        <span className="icon is-small">
          <i className={`fas ${config.icon}`}></i>
        </span>
        <span>{config.label}</span>
      </span>
    )
  }

  // Bouton de tri
  const SortButton = ({ field, children }) => (
    <button 
      className="button is-text is-small"
      onClick={() => handleSort(field)}
    >
      {children}
      {sortField === field && (
        <span className="icon is-small ml-1">
          <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
        </span>
      )}
    </button>
  )

  if (loading && !users.length) {
    return (
      <div className="box">
        <div className="has-text-centered">
          <div className="loader"></div>
          <p className="mt-3">Chargement des utilisateurs...</p>
        </div>
      </div>
    )
  }

  if (!users.length) {
    return (
      <div className="box">
        <div className="has-text-centered">
          <div className="icon is-large has-text-grey-light">
            <i className="fas fa-users fa-3x"></i>
          </div>
          <p className="title is-5 has-text-grey">Aucun utilisateur trouvé</p>
          <p className="subtitle is-6 has-text-grey">
            Commencez par ajouter des membres à votre équipe
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="user-list">
      <div className="box">
        {/* Table responsive */}
        <div className="table-container">
          <table className="table is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>
                  <SortButton field="lastName">Nom</SortButton>
                </th>
                <th>
                  <SortButton field="email">Email</SortButton>
                </th>
                <th>
                  <SortButton field="role">Rôle</SortButton>
                </th>
                <th>Téléphone</th>
                <th>
                  <SortButton field="isActive">Statut</SortButton>
                </th>
                <th>
                  <SortButton field="lastLogin">Dernière connexion</SortButton>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user._id} className={!user.isActive ? 'has-text-grey' : ''}>
                  <td>
                    <div className="is-flex is-align-items-center">
                      <div className="media-left mr-3">
                        <figure className="image is-32x32">
                          {user.avatar ? (
                            <img 
                              className="is-rounded" 
                              src={user.avatar} 
                              alt={`${user.firstName} ${user.lastName}`}
                            />
                          ) : (
                            <div className="has-background-grey-lighter is-rounded is-flex is-align-items-center is-justify-content-center" style={{width: '32px', height: '32px'}}>
                              <span className="has-text-grey has-text-weight-bold">
                                {user.firstName?.[0]?.toUpperCase()}{user.lastName?.[0]?.toUpperCase()}
                              </span>
                            </div>
                          )}
                        </figure>
                      </div>
                      <div>
                        <p className="has-text-weight-semibold">
                          {user.firstName} {user.lastName}
                        </p>
                        {user._id === currentUser._id && (
                          <span className="tag is-small is-light">Vous</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {getRoleBadge(user.role)}
                  </td>
                  <td>
                    {user.phone ? (
                      <a href={`tel:${user.phone}`}>{user.phone}</a>
                    ) : (
                      <span className="has-text-grey">-</span>
                    )}
                  </td>
                  <td>
                    {getStatusIcon(user.isActive)}
                  </td>
                  <td>
                    {user.lastLogin ? (
                      <div>
                        <p className="is-size-7">
                          {formatDate(user.lastLogin, 'short')}
                        </p>
                        <p className="has-text-grey is-size-7">
                          {formatDate(user.lastLogin, 'time')}
                        </p>
                      </div>
                    ) : (
                      <span className="has-text-grey">Jamais</span>
                    )}
                  </td>
                  <td>
                    <div className="buttons are-small">
                      {/* Bouton d'édition */}
                      {hasPermission(currentUser, PERMISSIONS.USERS.UPDATE) && (
                        <button
                          className="button is-small is-outlined"
                          onClick={() => onEdit(user)}
                          title="Modifier"
                        >
                          <span className="icon">
                            <i className="fas fa-edit"></i>
                          </span>
                        </button>
                      )}

                      {/* Bouton activation/désactivation */}
                      {hasPermission(currentUser, PERMISSIONS.USERS.UPDATE) && 
                       user._id !== currentUser._id && (
                        <button
                          className={`button is-small is-outlined ${user.isActive ? 'is-warning' : 'is-success'}`}
                          onClick={() => onToggleStatus(user)}
                          title={user.isActive ? 'Désactiver' : 'Activer'}
                        >
                          <span className="icon">
                            <i className={`fas ${user.isActive ? 'fa-pause' : 'fa-play'}`}></i>
                          </span>
                        </button>
                      )}

                      {/* Bouton de suppression */}
                      {hasPermission(currentUser, PERMISSIONS.USERS.DELETE) && 
                       user._id !== currentUser._id && (
                        <button
                          className="button is-small is-outlined is-danger"
                          onClick={() => onDelete(user)}
                          title="Supprimer"
                        >
                          <span className="icon">
                            <i className="fas fa-trash"></i>
                          </span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.pages}
            onPageChange={onPageChange}
          />
        )}

        {/* Chargement */}
        {loading && (
          <div className="has-text-centered mt-4">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserList;