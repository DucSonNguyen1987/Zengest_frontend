// src/pages/users/UserManagement.jsx
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers, createUser, updateUser, deleteUser } from '../../store/slices/usersSlice'
import UserList from '../../components/users/UserList'
import UserForm from '../../components/users/UserForm'
import UserFilters from '../../components/users/UserFilters'
import ConfirmModal from '../../components/common/ConfirmModal'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { USER_ROLES, PERMISSIONS } from '../../../shared/constants/roles'
import { hasPermission } from '../../../shared/utils/permissions'
import { showNotification } from '../../store/slices/notificationsSlice'

const UserManagement = () => {
  const dispatch = useDispatch()
  const { users, loading, pagination, filters } = useSelector(state => state.users)
  const { user: currentUser } = useSelector(state => state.auth)
  
  // États locaux
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [userToDelete, setUserToDelete] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Chargement initial des utilisateurs
  useEffect(() => {
    dispatch(fetchUsers({
      page: 1,
      limit: 20,
      search: searchTerm,
      role: roleFilter,
      status: statusFilter
    }))
  }, [dispatch, searchTerm, roleFilter, statusFilter])

  // Gestion de l'ajout d'un utilisateur
  const handleAddUser = () => {
    setSelectedUser(null)
    setIsFormOpen(true)
  }

  // Gestion de l'édition d'un utilisateur
  const handleEditUser = (user) => {
    if (!hasPermission(currentUser, PERMISSIONS.USERS.UPDATE)) {
      dispatch(showNotification({
        type: 'error',
        message: 'Vous n\'avez pas les permissions pour modifier les utilisateurs'
      }))
      return
    }
    setSelectedUser(user)
    setIsFormOpen(true)
  }

  // Soumission du formulaire utilisateur
  const handleUserSubmit = async (userData) => {
    try {
      if (selectedUser) {
        // Modification
        await dispatch(updateUser({
          id: selectedUser._id,
          data: userData
        })).unwrap()
        
        dispatch(showNotification({
          type: 'success',
          message: 'Utilisateur modifié avec succès'
        }))
      } else {
        // Création
        await dispatch(createUser(userData)).unwrap()
        
        dispatch(showNotification({
          type: 'success',
          message: 'Utilisateur créé avec succès'
        }))
      }
      
      setIsFormOpen(false)
      setSelectedUser(null)
    } catch (error) {
      dispatch(showNotification({
        type: 'error',
        message: error.message || 'Erreur lors de la sauvegarde'
      }))
    }
  }

  // Gestion de la suppression
  const handleDeleteUser = (user) => {
    if (!hasPermission(currentUser, PERMISSIONS.USERS.DELETE)) {
      dispatch(showNotification({
        type: 'error',
        message: 'Vous n\'avez pas les permissions pour supprimer les utilisateurs'
      }))
      return
    }
    setUserToDelete(user)
  }

  // Confirmation de la suppression
  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteUser(userToDelete._id)).unwrap()
      
      dispatch(showNotification({
        type: 'success',
        message: 'Utilisateur supprimé avec succès'
      }))
      
      setUserToDelete(null)
    } catch (error) {
      dispatch(showNotification({
        type: 'error',
        message: error.message || 'Erreur lors de la suppression'
      }))
    }
  }

  // Gestion du changement de page
  const handlePageChange = (page) => {
    dispatch(fetchUsers({
      page,
      limit: pagination.limit,
      search: searchTerm,
      role: roleFilter,
      status: statusFilter
    }))
  }

  // Gestion de l'activation/désactivation
  const handleToggleStatus = async (user) => {
    try {
      await dispatch(updateUser({
        id: user._id,
        data: { isActive: !user.isActive }
      })).unwrap()
      
      dispatch(showNotification({
        type: 'success',
        message: `Utilisateur ${user.isActive ? 'désactivé' : 'activé'} avec succès`
      }))
    } catch (error) {
      dispatch(showNotification({
        type: 'error',
        message: 'Erreur lors du changement de statut'
      }))
    }
  }

  if (loading && !users.length) {
    return <LoadingSpinner />
  }

  return (
    <div className="user-management">
      <div className="container is-fluid">
        {/* En-tête */}
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <div>
                <h1 className="title is-4">Gestion des Utilisateurs</h1>
                <p className="subtitle is-6">
                  Gérez les comptes et permissions de votre équipe
                </p>
              </div>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              {hasPermission(currentUser, PERMISSIONS.USERS.CREATE) && (
                <button 
                  className="button is-primary"
                  onClick={handleAddUser}
                >
                  <span className="icon">
                    <i className="fas fa-plus"></i>
                  </span>
                  <span>Nouvel Utilisateur</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filtres */}
        <UserFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          roleFilter={roleFilter}
          onRoleChange={setRoleFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        {/* Statistiques rapides */}
        <div className="columns is-mobile">
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Total Utilisateurs</p>
              <p className="title is-5">{pagination?.total || 0}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Actifs</p>
              <p className="title is-5 has-text-success">
                {users.filter(u => u.isActive).length}
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Inactifs</p>
              <p className="title is-5 has-text-danger">
                {users.filter(u => !u.isActive).length}
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Managers</p>
              <p className="title is-5 has-text-info">
                {users.filter(u => u.role === USER_ROLES.MANAGER).length}
              </p>
            </div>
          </div>
        </div>

        {/* Liste des utilisateurs */}
        <UserList
          users={users}
          currentUser={currentUser}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          onToggleStatus={handleToggleStatus}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
        />

        {/* Modal de formulaire */}
        {isFormOpen && (
          <UserForm
            user={selectedUser}
            isOpen={isFormOpen}
            onClose={() => {
              setIsFormOpen(false)
              setSelectedUser(null)
            }}
            onSubmit={handleUserSubmit}
          />
        )}

        {/* Modal de confirmation de suppression */}
        {userToDelete && (
          <ConfirmModal
            isOpen={!!userToDelete}
            title="Supprimer l'utilisateur"
            message={`Êtes-vous sûr de vouloir supprimer l'utilisateur "${userToDelete.firstName} ${userToDelete.lastName}" ? Cette action est irréversible.`}
            confirmText="Supprimer"
            confirmClass="is-danger"
            onConfirm={handleConfirmDelete}
            onCancel={() => setUserToDelete(null)}
          />
        )}
      </div>
    </div>
  )
}

export default UserManagement;