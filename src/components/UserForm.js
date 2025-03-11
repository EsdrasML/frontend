// components/UserForm.js
import React, { useState, useEffect } from 'react';

const UserForm = ({ user, isEditing, onSubmit, onCancel }) => {
  const initialFormState = {
    username: '',
    email: '',
    password: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (user) {
      // Al editar, no traemos la contraseña desde el backend por seguridad
      // Creamos una copia del usuario sin modificar el original
      const userCopy = { ...user, password: '' };
      setFormData(userCopy);
    } else {
      setFormData(initialFormState);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Si estamos editando y la contraseña está vacía, no la enviamos
    // para evitar sobrescribir la contraseña existente
    if (isEditing && formData.password === '') {
      const { password, ...dataWithoutPassword } = formData;
      onSubmit(dataWithoutPassword);
    } else {
      onSubmit(formData);
    }
    
    setFormData(initialFormState);
  };

  return (
    <div className="form-container">
      <h2>{isEditing ? 'Editar Usuario' : 'Crear Usuario'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">
            {isEditing ? 'Password (dejar vacío para mantener el actual):' : 'Password:'}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!isEditing}
          />
        </div>
        
        <div className="form-buttons">
          <button type="submit" className="btn-submit">
            {isEditing ? 'Actualizar' : 'Crear'}
          </button>
          {isEditing && (
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;