// src/components/UserForm.tsx
import React, { useState, useEffect } from 'react';
import { 
  UserCreationData, 
  CHARACTER_CLASSES, 
  MAGICAL_ELEMENTS, 
  AVATAR_IMAGES 
} from '../types';

interface UserFormProps {
  onSubmit: (userData: UserCreationData) => void;
  isLoading?: boolean;
  initialData?: UserCreationData;
}

export const UserForm: React.FC<UserFormProps> = ({ 
  onSubmit,
  isLoading = false,
  initialData
}) => {
  const defaultFormState: UserCreationData = {
    username: '',
    class: CHARACTER_CLASSES[0],
    level: 1,
    element: MAGICAL_ELEMENTS[0],
    avatarIndex: 0
  };

  const [formData, setFormData] = useState<UserCreationData>(
    initialData || defaultFormState
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Actualizar el formulario cuando cambian los datos iniciales
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    let parsedValue: any = value;
    if (name === 'level') {
      parsedValue = parseInt(value, 10);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));

    // Limpiar error al cambiar el campo
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const selectAvatar = (index: number) => {
    setFormData(prev => ({
      ...prev,
      avatarIndex: index
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es obligatorio';
    } else if (formData.username.length < 3) {
      newErrors.username = 'El nombre debe tener al menos 3 caracteres';
    }
    
    if (formData.level < 1 || formData.level > 100) {
      newErrors.level = 'El nivel debe estar entre 1 y 100';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      // Solo resetear si no estamos en modo edición
      if (!initialData) {
        setFormData(defaultFormState);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="block text-text-dim font-medium mb-3">Nombre de Usuario</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          style={{ width: 'calc(100% - 2.4rem - 2px)' }}
          className={`magic-input ${errors.username ? 'border-red-500' : ''}`}
          placeholder="Ingresa un nombre heroico..."
          disabled={isLoading}
        />
        {errors.username && (
          <p className="text-red-400 text-sm mt-2 mb-3">{errors.username}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="form-group">
          <label className="block text-text-dim font-medium mb-3">Clase</label>
          <select
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="magic-input mb-0"
            disabled={isLoading}
          >
            {CHARACTER_CLASSES.map((charClass) => (
              <option key={charClass} value={charClass}>
                {charClass}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="block text-text-dim font-medium mb-3">Nivel</label>
          <input
            type="number"
            name="level"
            value={formData.level}
            onChange={handleChange}
            min="1"
            max="100"
            style={{ width: 'calc(100% - 2.4rem - 2px)' }}
            className={`magic-input mb-0 ${errors.level ? 'border-red-500' : ''}`}
            disabled={isLoading}
          />
          {errors.level && (
            <p className="text-red-400 text-sm mt-2">{errors.level}</p>
          )}
        </div>
      </div>

      <div className="form-group mb-6">
        <label className="block text-text-dim font-medium mb-3">Elemento</label>
        <select
          name="element"
          value={formData.element}
          onChange={handleChange}
          className="magic-input"
          disabled={isLoading}
        >
          {MAGICAL_ELEMENTS.map((element) => (
            <option key={element} value={element}>
              {element}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mb-8">
        <label className="block text-text-dim font-medium mb-3">Avatar</label>
        <div className="avatar-select">
          {AVATAR_IMAGES.map((avatar, index) => (
            <div
              key={index}
              className={`avatar-option ${formData.avatarIndex === index ? 'selected' : ''}`}
              onClick={() => selectAvatar(index)}
            >
              <img 
                src={avatar} 
                alt={`Avatar ${index + 1}`} 
                className="avatar-img"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="magic-button text-lg px-8 py-3"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Invocando...
            </span>
          ) : (
            initialData ? 'Actualizar Aventurero' : 'Invocar Aventurero'
          )}
        </button>
      </div>
    </form>
  );
};