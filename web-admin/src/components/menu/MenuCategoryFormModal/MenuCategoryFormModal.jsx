// web-admin/src/components/menu/MenuCategoryFormModal/MenuCategoryFormModal.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  XMarkIcon,
  Bars3BottomLeftIcon,
  SwatchIcon,
  EyeIcon,
  EyeSlashIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

// Composants
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';

// Utilitaires
import { generateSlug } from '@/utils/helpers/helpers';

// Styles
import '../../../styles/components/MenuCategoryFormModal.scss';

// ========================================
// 🗂️ MODAL FORMULAIRE CATÉGORIE MENU
// ========================================

const MenuCategoryFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  category = null,
  loading = false
}) => {
  // ========================================
  // 🔄 ÉTAT LOCAL
  // ========================================

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    slug: '',
    color: '#00d2d3',
    position: 1,
    isActive: true,
    image: null,
    imagePreview: null
  });

  const [errors, setErrors] = useState({});
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(true);

  // Couleurs prédéfinies
  const predefinedColors = [
    '#00d2d3', '#eb2f06', '#ff6348', '#ffc048', 
    '#8c7ae6', '#00d1b2', '#3298dc', '#ff3860',
    '#48c774', '#ffdd57', '#363636', '#f5f5f5'
  ];

  // ========================================
  // 🔄 EFFETS
  // ========================================

  // Initialiser le formulaire quand la modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      if (category) {
        // Mode édition
        setFormData({
          name: category.name || '',
          description: category.description || '',
          slug: category.slug || '',
          color: category.color || '#00d2d3',
          position: category.position || 1,
          isActive: category.isActive !== undefined ? category.isActive : true,
          image: null,
          imagePreview: category.image || null
        });
        setAutoGenerateSlug(false);
      } else {
        // Mode création
        setFormData({
          name: '',
          description: '',
          slug: '',
          color: '#00d2d3',
          position: 1,
          isActive: true,
          image: null,
          imagePreview: null
        });
        setAutoGenerateSlug(true);
      }
      setErrors({});
    }
  }, [isOpen, category]);

  // Auto-génération du slug
  useEffect(() => {
    if (autoGenerateSlug && formData.name) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(formData.name)
      }));
    }
  }, [formData.name, autoGenerateSlug]);

  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Nettoyer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSlugChange = (e) => {
    setAutoGenerateSlug(false);
    setFormData(prev => ({
      ...prev,
      slug: generateSlug(e.target.value)
    }));
  };

  const handleColorSelect = (color) => {
    setFormData(prev => ({
      ...prev,
      color
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validation du fichier
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          image: 'Veuillez sélectionner un fichier image valide'
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB
        setErrors(prev => ({
          ...prev,
          image: 'L\'image ne doit pas dépasser 5MB'
        }));
        return;
      }

      // Créer l'aperçu
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);

      // Nettoyer l'erreur
      if (errors.image) {
        setErrors(prev => ({
          ...prev,
          image: null
        }));
      }
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }));
  };

  // ========================================
  // ✅ VALIDATION
  // ========================================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Le slug est requis';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Le slug ne peut contenir que des lettres minuscules, chiffres et tirets';
    }

    if (formData.position < 1) {
      newErrors.position = 'La position doit être supérieure à 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ========================================
  // 📤 SOUMISSION
  // ========================================

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Créer les données à envoyer
    const submitData = {
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim(),
      slug: formData.slug.trim()
    };

    onSubmit(submitData);
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  // ========================================
  // 🎨 RENDU
  // ========================================

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        className="menu-category-form-modal" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="modal-header">
          <h2 className="modal-title">
            {category ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
          </h2>
          
          <button
            type="button"
            className="modal-close"
            onClick={handleClose}
            disabled={loading}
            aria-label="Fermer"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="form-grid">
            {/* Nom de la catégorie */}
            <div className="form-group full-width">
              <Input
                label="Nom de la catégorie"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                placeholder="Ex: Entrées, Plats principaux..."
                leftIcon={Bars3BottomLeftIcon}
                maxLength={50}
                required
                disabled={loading}
              />
            </div>

            {/* Slug */}
            <div className="form-group full-width">
              <Input
                label="Slug (URL)"
                name="slug"
                value={formData.slug}
                onChange={handleSlugChange}
                error={errors.slug}
                placeholder="entrees, plats-principaux..."
                helpText="Utilisé dans l'URL. Sera généré automatiquement si laissé vide."
                maxLength={50}
                required
                disabled={loading}
              />
            </div>

            {/* Description */}
            <div className="form-group full-width">
              <Input
                type="textarea"
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                error={errors.description}
                placeholder="Description de la catégorie..."
                rows={3}
                maxLength={200}
                disabled={loading}
              />
            </div>

            {/* Position */}
            <div className="form-group">
              <Input
                type="number"
                label="Position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                error={errors.position}
                placeholder="1"
                min="1"
                helpText="Ordre d'affichage dans le menu"
                required
                disabled={loading}
              />
            </div>

            {/* Statut actif */}
            <div className="form-group">
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                  <span className="checkbox-icon">
                    {formData.isActive ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </span>
                  <span className="checkbox-text">
                    Catégorie visible
                  </span>
                </label>
              </div>
            </div>

            {/* Sélecteur de couleur */}
            <div className="form-group full-width">
              <label className="form-label">
                <SwatchIcon className="h-5 w-5" />
                Couleur de la catégorie
              </label>
              
              <div className="color-selector">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`color-option ${formData.color === color ? 'color-option--selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                    disabled={loading}
                    aria-label={`Sélectionner la couleur ${color}`}
                  />
                ))}
                
                {/* Sélecteur de couleur personnalisée */}
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => handleColorSelect(e.target.value)}
                  className="color-picker"
                  disabled={loading}
                  title="Couleur personnalisée"
                />
              </div>
            </div>

            {/* Upload d'image */}
            <div className="form-group full-width">
              <label className="form-label">
                <PhotoIcon className="h-5 w-5" />
                Image de la catégorie (optionnel)
              </label>
              
              <div className="image-upload">
                {formData.imagePreview ? (
                  <div className="image-preview">
                    <img 
                      src={formData.imagePreview} 
                      alt="Aperçu de la catégorie" 
                      className="preview-image"
                    />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={removeImage}
                      disabled={loading}
                      aria-label="Supprimer l'image"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="upload-area">
                    <PhotoIcon className="h-12 w-12" />
                    <p>Cliquez pour ajouter une image</p>
                    <p className="upload-hint">PNG, JPG jusqu'à 5MB</p>
                  </div>
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                  disabled={loading}
                />
              </div>
              
              {errors.image && (
                <p className="error-message">{errors.image}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="modal-footer">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Annuler
            </Button>
            
            <Button
              type="submit"
              variant="primary"
              loading={loading}
            >
              {category ? 'Mettre à jour' : 'Créer la catégorie'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ========================================
// 📋 PROPTYPES
// ========================================

MenuCategoryFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  category: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    slug: PropTypes.string,
    color: PropTypes.string,
    position: PropTypes.number,
    isActive: PropTypes.bool,
    image: PropTypes.string
  }),
  loading: PropTypes.bool
};

export default MenuCategoryFormModal;