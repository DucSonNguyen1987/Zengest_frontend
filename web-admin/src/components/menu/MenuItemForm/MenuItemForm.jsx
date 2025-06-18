// web-admin/src/components/menu/MenuItemForm/MenuItemForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  PhotoIcon,
  PlusIcon,
  MinusIcon,
  StarIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

// ========================================
// 🍽️ FORMULAIRE ARTICLE DE MENU
// ========================================

const MenuItemForm = ({ 
  item = null, 
  categories = [], 
  isOpen = false, 
  onClose, 
  onSubmit 
}) => {
  
  // États locaux
  const [previewImage, setPreviewImage] = useState(item?.image || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Configuration du formulaire
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: {
      name: item?.name || '',
      description: item?.description || '',
      category: item?.category?._id || '',
      basePrice: item?.basePrice || '',
      image: item?.image || '',
      featured: item?.featured || false,
      availability: {
        isAvailable: item?.availability?.isAvailable ?? true,
        availableFrom: item?.availability?.availableFrom || '',
        availableTo: item?.availability?.availableTo || ''
      },
      dietary: {
        isVegetarian: item?.dietary?.isVegetarian || false,
        isVegan: item?.dietary?.isVegan || false,
        isGlutenFree: item?.dietary?.isGlutenFree || false,
        isOrganic: item?.dietary?.isOrganic || false
      },
      priceVariants: item?.priceVariants || [],
      tags: item?.tags?.join(', ') || '',
      allergens: item?.allergens?.join(', ') || '',
      preparationTime: item?.preparationTime || '',
      calories: item?.calories || '',
      spiceLevel: item?.spiceLevel || 0
    }
  });
  
  // Gestion des variantes de prix
  const { fields: priceVariants, append: addVariant, remove: removeVariant } = useFieldArray({
    control,
    name: 'priceVariants'
  });
  
  // Observer les changements
  const watchedValues = watch();
  
  // ========================================
  // 🔄 EFFETS
  // ========================================
  
  // Reset du formulaire quand l'item change
  useEffect(() => {
    if (item) {
      reset({
        name: item.name || '',
        description: item.description || '',
        category: item.category?._id || '',
        basePrice: item.basePrice || '',
        image: item.image || '',
        featured: item.featured || false,
        availability: {
          isAvailable: item.availability?.isAvailable ?? true,
          availableFrom: item.availability?.availableFrom || '',
          availableTo: item.availability?.availableTo || ''
        },
        dietary: {
          isVegetarian: item.dietary?.isVegetarian || false,
          isVegan: item.dietary?.isVegan || false,
          isGlutenFree: item.dietary?.isGlutenFree || false,
          isOrganic: item.dietary?.isOrganic || false
        },
        priceVariants: item.priceVariants || [],
        tags: item.tags?.join(', ') || '',
        allergens: item.allergens?.join(', ') || '',
        preparationTime: item.preparationTime || '',
        calories: item.calories || '',
        spiceLevel: item.spiceLevel || 0
      });
      setPreviewImage(item.image || '');
    }
  }, [item, reset]);
  
  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Transformation des données
      const formattedData = {
        ...data,
        basePrice: parseFloat(data.basePrice),
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
        allergens: data.allergens ? data.allergens.split(',').map(allergen => allergen.trim()).filter(allergen => allergen) : [],
        preparationTime: data.preparationTime ? parseInt(data.preparationTime) : null,
        calories: data.calories ? parseInt(data.calories) : null,
        spiceLevel: parseInt(data.spiceLevel),
        priceVariants: data.priceVariants.map(variant => ({
          ...variant,
          price: parseFloat(variant.price)
        }))
      };
      
      await onSubmit(formattedData);
      
      // Reset du formulaire si création réussie
      if (!item) {
        reset();
        setPreviewImage('');
      }
    } catch (error) {
      console.error('Erreur soumission formulaire:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // TODO: Upload de l'image vers le serveur
      // Pour l'instant, créer une URL temporaire
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setValue('image', imageUrl, { shouldDirty: true });
    }
  };
  
  const addPriceVariant = () => {
    addVariant({
      name: '',
      price: '',
      description: ''
    });
  };
  
  const handleClose = () => {
    if (isDirty) {
      const confirmed = window.confirm('Des modifications non sauvegardées seront perdues. Continuer ?');
      if (!confirmed) return;
    }
    
    reset();
    setPreviewImage('');
    onClose();
  };
  
  // ========================================
  // 🎨 RENDU
  // ========================================
  
  if (!isOpen) return null;
  
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={handleClose}></div>
      <motion.div 
        className="modal-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        style={{ width: '90%', maxWidth: '800px' }}
      >
        {/* En-tête */}
        <header className="modal-card-head">
          <p className="modal-card-title">
            {item ? 'Modifier l\'article' : 'Nouvel article du menu'}
          </p>
          <button 
            className="delete" 
            aria-label="close"
            onClick={handleClose}
          ></button>
        </header>
        
        {/* Corps */}
        <section className="modal-card-body">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="columns">
              {/* Colonne gauche - Informations de base */}
              <div className="column">
                <h4 className="title is-5">Informations de base</h4>
                
                {/* Nom */}
                <div className="field">
                  <label className="label">
                    Nom de l'article <span className="has-text-danger">*</span>
                  </label>
                  <div className="control">
                    <input 
                      className={`input ${errors.name ? 'is-danger' : ''}`}
                      type="text"
                      placeholder="Ex: Saumon grillé aux légumes"
                      {...register('name', { 
                        required: 'Le nom est requis',
                        minLength: { value: 2, message: 'Minimum 2 caractères' }
                      })}
                    />
                  </div>
                  {errors.name && (
                    <p className="help is-danger">{errors.name.message}</p>
                  )}
                </div>
                
                {/* Description */}
                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <textarea 
                      className="textarea"
                      rows="3"
                      placeholder="Description détaillée de l'article..."
                      {...register('description')}
                    />
                  </div>
                </div>
                
                {/* Catégorie et Prix */}
                <div className="columns">
                  <div className="column">
                    <div className="field">
                      <label className="label">
                        Catégorie <span className="has-text-danger">*</span>
                      </label>
                      <div className="control">
                        <div className="select is-fullwidth">
                          <select 
                            {...register('category', { required: 'La catégorie est requise' })}
                            className={errors.category ? 'is-danger' : ''}
                          >
                            <option value="">Sélectionner une catégorie</option>
                            {categories.map(category => (
                              <option key={category._id} value={category._id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {errors.category && (
                        <p className="help is-danger">{errors.category.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="column">
                    <div className="field">
                      <label className="label">
                        Prix de base (€) <span className="has-text-danger">*</span>
                      </label>
                      <div className="control">
                        <input 
                          className={`input ${errors.basePrice ? 'is-danger' : ''}`}
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="15.50"
                          {...register('basePrice', { 
                            required: 'Le prix est requis',
                            min: { value: 0, message: 'Le prix doit être positif' }
                          })}
                        />
                      </div>
                      {errors.basePrice && (
                        <p className="help is-danger">{errors.basePrice.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Image */}
                <div className="field">
                  <label className="label">Image</label>
                  <div className="control">
                    <div className="file has-name is-fullwidth">
                      <label className="file-label">
                        <input 
                          className="file-input" 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <span className="file-cta">
                          <span className="file-icon">
                            <PhotoIcon className="h-5 w-5" />
                          </span>
                          <span className="file-label">
                            Choisir une image
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Prévisualisation */}
                  {previewImage && (
                    <div className="mt-3">
                      <figure className="image is-128x128">
                        <img 
                          src={previewImage} 
                          alt="Prévisualisation"
                          className="is-rounded"
                        />
                      </figure>
                    </div>
                  )}
                </div>
                
                {/* Options */}
                <div className="field">
                  <label className="label">Options</label>
                  <div className="control">
                    <label className="checkbox">
                      <input 
                        type="checkbox" 
                        {...register('featured')}
                      />
                      <span className="ml-2">
                        <StarIcon className="h-4 w-4 has-text-warning" style={{ display: 'inline' }} />
                        Article en vedette
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Colonne droite - Options avancées */}
              <div className="column">
                <h4 className="title is-5">Options avancées</h4>
                
                {/* Disponibilité */}
                <div className="box">
                  <h5 className="title is-6">Disponibilité</h5>
                  
                  <div className="field">
                    <div className="control">
                      <label className="checkbox">
                        <input 
                          type="checkbox" 
                          {...register('availability.isAvailable')}
                        />
                        <span className="ml-2">
                          {watchedValues.availability?.isAvailable ? (
                            <>
                              <EyeIcon className="h-4 w-4 has-text-success" style={{ display: 'inline' }} />
                              Disponible
                            </>
                          ) : (
                            <>
                              <EyeSlashIcon className="h-4 w-4 has-text-danger" style={{ display: 'inline' }} />
                              Indisponible
                            </>
                          )}
                        </span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label className="label">Disponible de</label>
                        <div className="control">
                          <input 
                            className="input"
                            type="time"
                            {...register('availability.availableFrom')}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="field">
                        <label className="label">Disponible jusqu'à</label>
                        <div className="control">
                          <input 
                            className="input"
                            type="time"
                            {...register('availability.availableTo')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Régimes alimentaires */}
                <div className="box">
                  <h5 className="title is-6">Régimes alimentaires</h5>
                  
                  <div className="field is-grouped is-grouped-multiline">
                    <div className="control">
                      <label className="checkbox">
                        <input type="checkbox" {...register('dietary.isVegetarian')} />
                        <span className="ml-2">🥬 Végétarien</span>
                      </label>
                    </div>
                    <div className="control">
                      <label className="checkbox">
                        <input type="checkbox" {...register('dietary.isVegan')} />
                        <span className="ml-2">🌱 Végan</span>
                      </label>
                    </div>
                    <div className="control">
                      <label className="checkbox">
                        <input type="checkbox" {...register('dietary.isGlutenFree')} />
                        <span className="ml-2">🌾 Sans gluten</span>
                      </label>
                    </div>
                    <div className="control">
                      <label className="checkbox">
                        <input type="checkbox" {...register('dietary.isOrganic')} />
                        <span className="ml-2">🌿 Bio</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Variantes de prix */}
                <div className="box">
                  <div className="level">
                    <div className="level-left">
                      <h5 className="title is-6">Variantes de prix</h5>
                    </div>
                    <div className="level-right">
                      <button 
                        type="button"
                        className="button is-small is-primary is-outlined"
                        onClick={addPriceVariant}
                      >
                        <span className="icon">
                          <PlusIcon className="h-4 w-4" />
                        </span>
                        <span>Ajouter</span>
                      </button>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {priceVariants.map((variant, index) => (
                      <motion.div
                        key={variant.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="box is-small"
                      >
                        <div className="field is-grouped">
                          <div className="control is-expanded">
                            <input 
                              className="input is-small"
                              type="text"
                              placeholder="Nom (ex: Portion enfant)"
                              {...register(`priceVariants.${index}.name`)}
                            />
                          </div>
                          <div className="control">
                            <input 
                              className="input is-small"
                              type="number"
                              step="0.01"
                              placeholder="Prix"
                              style={{ width: '100px' }}
                              {...register(`priceVariants.${index}.price`)}
                            />
                          </div>
                          <div className="control">
                            <button 
                              type="button"
                              className="button is-small is-danger is-outlined"
                              onClick={() => removeVariant(index)}
                            >
                              <span className="icon">
                                <MinusIcon className="h-4 w-4" />
                              </span>
                            </button>
                          </div>
                        </div>
                        <div className="field">
                          <input 
                            className="input is-small"
                            type="text"
                            placeholder="Description (optionnel)"
                            {...register(`priceVariants.${index}.description`)}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                {/* Informations complémentaires */}
                <div className="box">
                  <h5 className="title is-6">Informations complémentaires</h5>
                  
                  <div className="field">
                    <label className="label">Tags</label>
                    <div className="control">
                      <input 
                        className="input"
                        type="text"
                        placeholder="Populaire, Nouveau, Spécialité (séparés par des virgules)"
                        {...register('tags')}
                      />
                    </div>
                    <p className="help">Séparez les tags par des virgules</p>
                  </div>
                  
                  <div className="field">
                    <label className="label">Allergènes</label>
                    <div className="control">
                      <input 
                        className="input"
                        type="text"
                        placeholder="Noix, Lait, Œufs (séparés par des virgules)"
                        {...register('allergens')}
                      />
                    </div>
                  </div>
                  
                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label className="label">Temps de préparation (min)</label>
                        <div className="control">
                          <input 
                            className="input"
                            type="number"
                            min="0"
                            placeholder="15"
                            {...register('preparationTime')}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="field">
                        <label className="label">Calories</label>
                        <div className="control">
                          <input 
                            className="input"
                            type="number"
                            min="0"
                            placeholder="350"
                            {...register('calories')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="field">
                    <label className="label">Niveau d'épices</label>
                    <div className="control">
                      <div className="select">
                        <select {...register('spiceLevel')}>
                          <option value={0}>🌶️ Aucun</option>
                          <option value={1}>🌶️ Doux</option>
                          <option value={2}>🌶️🌶️ Moyen</option>
                          <option value={3}>🌶️🌶️🌶️ Fort</option>
                          <option value={4}>🌶️🌶️🌶️🌶️ Très fort</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
        
        {/* Pied */}
        <footer className="modal-card-foot">
          <div className="buttons">
            <button 
              type="submit"
              className={`button is-success ${isSubmitting ? 'is-loading' : ''}`}
              onClick={handleSubmit(handleFormSubmit)}
              disabled={isSubmitting}
            >
              {item ? 'Modifier' : 'Créer'}
            </button>
            <button 
              className="button" 
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Annuler
            </button>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};

export default MenuItemForm;