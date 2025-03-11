// components/UserList.js
import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div className="user-list">
      <h2>Lista de Usuarios</h2>
      
      {users.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td className="actions">
                  <button 
                    className="btn-edit" 
                    onClick={() => onEdit(user)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn-delete" 
                    onClick={() => {
                      if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
                        onDelete(user.id);
                      }
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;