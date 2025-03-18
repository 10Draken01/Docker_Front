// src/App.tsx
import React, { useState, useEffect } from 'react';
import { UserList } from './components/UserList';
import { UserForm } from './components/UserForm';
import { User, UserCreationData } from './types';
import { 
  fetchUsers, 
  createUser, 
  updateUser, 
  deleteUser 
} from './api/userApi';
import './styles/theme.css';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);

  // Cargar usuarios al iniciar
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData: UserCreationData) => {
    setSubmitting(true);
    try {
      const newUser = await createUser(userData);
      if (newUser) {
        setUsers(prev => [...prev, newUser]);
        showMessage('¡Aventurero invocado correctamente!');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateUser = async (userData: UserCreationData) => {
    if (!editingUser) return;
    
    setSubmitting(true);
    try {
      const updatedUser = await updateUser(editingUser.id, userData);
      if (updatedUser) {
        setUsers(prev => prev.map(user => 
          user.id === updatedUser.id ? updatedUser : user
        ));
        setEditingUser(null);
        showMessage('¡Aventurero actualizado correctamente!');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar a este aventurero del reino?')) {
      try {
        const success = await deleteUser(userId);
        if (success) {
          setUsers(prev => prev.filter(user => user.id !== userId));
          showMessage('Aventurero eliminado del registro');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    // Desplazar a la parte superior del formulario
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const cancelEdit = () => {
    setEditingUser(null);
  };

  const showMessage = (message: string) => {
    setShowSuccessMessage(message);
    setTimeout(() => {
      setShowSuccessMessage(null);
    }, 3000);
  };

  return (
    <div className="page-container">
      {/* Efectos decorativos */}
      <div className="fixed top-20 left-20 w-80 h-80 bg-magic-primary opacity-10 rounded-full blur-3xl"></div>
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-magic-accent opacity-5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-5xl relative">
        <header className="page-header">
          <h1 className="main-title text-4xl mb-4">✨ Gremio de Aventureros ✨</h1>
          <p className="subtitle text-xl">Registro mágico de héroes y heroínas</p>
        </header>

        {/* Mensaje de éxito */}
        {showSuccessMessage && (
          <div className="success-message">
            {showSuccessMessage}
          </div>
        )}

        <div className="grid-layout">
          {/* Formulario - 2 columnas */}
          <div>
            <div className="magic-card">
              {editingUser ? (
                <>
                  <div className="card-header">
                    <div className="flex justify-between items-center">
                      <h2 className="main-title text-xl mb-0">Editar Aventurero</h2>
                      <button 
                        onClick={cancelEdit}
                        className="text-text-dim hover:text-white transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                  <div className="card-content">
                    <UserForm 
                      onSubmit={handleUpdateUser}
                      isLoading={submitting}
                      initialData={{
                        username: editingUser.username,
                        class: editingUser.class,
                        level: editingUser.level,
                        element: editingUser.element,
                        avatarIndex: editingUser.avatarIndex
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="card-header">
                    <h2 className="main-title text-xl mb-0">Crear Nuevo Aventurero</h2>
                  </div>
                  <div className="card-content">
                    <UserForm 
                      onSubmit={handleCreateUser}
                      isLoading={submitting}
                    />
                  </div>
                </>
              )}
            </div>
            
            {/* Información adicional */}
            <div className="magic-card mt-8">
              <div className="card-header">
                <h2 className="main-title text-xl mb-0">Guía del Gremio</h2>
              </div>
              <div className="card-content">
                <p className="text-text-dim mb-4">
                  Bienvenido al Gremio de Aventureros, ¡donde los héroes de todas las clases y elementos se registran para ser reconocidos!
                </p>
                <div className="magic-divider"></div>
                <h3 className="text-lg font-medium mb-3">Clases de Aventureros</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center">
                    <span className="text-magic-primary mr-2">⚔️</span>
                    <span>Guerrero</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-magic-primary mr-2">🧙</span>
                    <span>Mago</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-magic-primary mr-2">🏹</span>
                    <span>Arquero</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-magic-primary mr-2">🛡️</span>
                    <span>Paladín</span>
                  </div>
                </div>
                <div className="magic-divider"></div>
                <p className="text-text-dim">
                  Los aventureros con nivel superior a 70 reciben un marco dorado especial.
                </p>
              </div>
            </div>
          </div>

          {/* Lista de usuarios - 3 columnas */}
          <div>
            {loading ? (
              <div className="magic-card">
                <div className="card-content p-12 flex justify-center items-center">
                  <div className="text-center">
                    <div className="inline-block w-16 h-16 border-4 border-magic-primary border-t-transparent rounded-full animate-spin mb-6"></div>
                    <p className="text-text-dim text-lg">Invocando a los aventureros...</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="magic-card">
                <div className="card-header">
                  <h2 className="main-title text-xl mb-0">Aventureros del Reino</h2>
                  <p className="text-text-dim mt-2">
                    {users.length} {users.length === 1 ? 'aventurero' : 'aventureros'} preparados para la batalla
                  </p>
                </div>
                <div>
                  <UserList 
                    users={users} 
                    onDelete={handleDeleteUser}
                    onEdit={handleEditUser}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="page-footer">
          <div className="magic-divider"></div>
          <p className="text-text-dim text-lg">Creado con la magia del ⚛️ React y el 🧙‍♂️ TypeScript</p>
          <p className="mt-3 text-magic-primary">© Reino de Lofi {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default App;