import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { EyeIcon, EyeSlashIcon, ExclamationCitrcleIcon } from '@heroicons/react/24/outline';
import '@/styles/components/Input.scss'; 


//  Composant Input Réutilisable
const Input = forwardRef(({
    type = 'text',
    label,
    placeholder,
    value,
    onChange,
    onBlur,
    onFocus,
    error,
    success,
    disabled = false,
    required = false,
    className = '',
    size = 'md',
    variant = 'outlined',
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    helptext,
    maxLength,
    rows = 4,
    autoComplete,
    id,
    name,
    ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);


    // Gestionnaires d'évènemments

    const handleFocus = (e) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e) => {
        setIsFocused(true);
        onBlur?.(e);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Classes CSS dynamiques 

    const inputClasses = [
        'input-field',
        'input-field--${size}',
        'input-field--${variant}',
        {
            'input-field--focused': isFocused,
            'input-field--error': error,
            'input-field--success': success,
            'input-field--disabled': disabled,
            'input-field--with-left-icon': LeftIcon,
            'input-field--with-right-icon': RightIcon || type == 'password',
        },
        className].filter(Boolean);

    const containerClasses = [
        'input-container',
        {
            'input-container--focused': isFocused,
            'input-container--error': error,
            'input-container--success': success,
        }
    ].filter(Boolean);

    // Propriétés de l'input

    const inputProps = {
        ref,
        type : 'password' ? (showPassword ? 'text' : 'password') :
            value,
        onChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        disabled,
        required,
        placeholder,
        maxLength,
        autoComplete,
        id: id || name,
        name,
        className: inputClasses.join(' '),
        'aria-invalid': !!error,
        'aria-describedby': error ? `${id || name}-error` : helptext ? `${id || name}-help` : undefined,
        ...rest,
    };

    // Rendu du composant

    const InputElement = type === 'textarea' ? 'textarea' : 'input';

    if (type === 'textarea') {
        inputProps.rows = rows;
    }

    return (
        <div className={containerClasses.join(' ')}>

            {/* Label */}

            {label && (
                <label
                    htmlFor={id || name}
                    className={`input-label ${required ? 'input-label--required``' : ''}`}
                >
                    {label}
                    {required && <span className="input-required">*</span>}
                </label>
            )}
            {/* Wrapper de l'input*/}

            <div className='input-wrapper'>

                {/* Icone de gauche */}
                {LeftIcon && (
                    <div className='input-icon input-icon--left'>
                        <leftIcon className='h-5 w-5' />
                    </div>
                )}

                {/* Input Principal */}

                <InputElement {...inputProps} />

                {/* Icones de droite */}
                <div className='input-icon input-icon--right'>

                    {/* Icone de mot de passe */}

                    {type === 'password' && (
                        <button
                            type='button'
                            onClick={togglePasswordVisibility}
                            className='input-password-toggle'
                            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}>
                            {showPassword ? (
                                <EyeSlashIcon className='h-5 w-5' />
                            ) : (
                                <EyeIcon className='h-5 w-5' />
                            )}
                        </button>
                    )}

                    {/* Icone d'erreur */}

                    {error && (
                        <ExclamationCitrcleIcon className='h-5 w-5 text-danger' />
                    )}

                    {/* Icone personnalisée de droite */}
                    {RightIcon && !error && type !== 'password' && (
                        <RightIcon className='h-5 w-5' />
                    )}
                </div>
            </div>

            {/* Messages d'aide et d'erreur */}

            {error && (
                <p
                    id={`${id || name}-error`}
                    className='input-message input-message--error'
                    role='alert'
                >
                    {error}
                </p>
            )}

            {helptext && !error && (
                <p
                    id={`${id || name}-help`}
                    className='input-message input-message--help'
                >
                    {helptext}
                </p>
            )}

            {/* Compteur de caractères */}
            {maxLength && value && (
                <p className='input-mesagge input-message--counter'>
                    {value.length}/{maxLength} caractères
                </p>
            )}

        </div>
    );
});

Input.displayName = 'Input';

// PROPTYPES
Input.propTypes = {
    type: PropTypes.oneOf(['text', 'email', 'password', 'tel', 'url', 'search', 'number', 'textarea']),
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    error: PropTypes.string,
    success: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    className: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
    leftIcon: PropTypes.elementType,
    rightIcon: PropTypes.elementType,
    helptext: PropTypes.string,
    maxLength: PropTypes.number,
    rows: PropTypes.number,
    autoComplete: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
};

export default Input;


