// App.js
import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const BASE_URL = 'http://127.0.0.1:8080/users';

  // Cargar usuarios
  const fetchUsers = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Crear usuario
  const createUser = async (user) => {
    try {
      const response = await fetch(`${BASE_URL}/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      
      if (response.ok) {
        fetchUsers();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error creating user:', error);
      return false;
    }
  };

  // Actualizar usuario
  const updateUser = async (id, user) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      
      if (response.ok) {
        fetchUsers();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  };

  // Eliminar usuario
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchUsers();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
  };

  const handleSubmit = async (user) => {
    let success;
    
    if (isEditing) {
      success = await updateUser(currentUser.id, user);
    } else {
      success = await createUser(user);
    }
    
    if (success) {
      setCurrentUser(null);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setCurrentUser(null);
    setIsEditing(false);
  };

  return (
    <div className="container">
      <h1>Gestión de Usuarios</h1>
      
      <UserForm 
        user={currentUser} 
        isEditing={isEditing} 
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      
      <UserList 
        users={users} 
        onEdit={handleEdit} 
        onDelete={deleteUser} 
      />
    </div>
  );
}

export default App;