// src/components/UserList.tsx
import React from 'react';
import { User, AVATAR_IMAGES } from '../types';

interface UserListProps {
  users: User[];
  onDelete: (userId: string) => void;
  onEdit: (user: User) => void;
}

export const UserList: React.FC<UserListProps> = ({ 
  users, 
  onDelete,
  onEdit
}) => {
  // Función para obtener la clase de elemento basada en el elemento del usuario
  const getElementClass = (element: string): string => {
    const elementClasses: Record<string, string> = {
      'Fuego': 'text-red-400',
      'Agua': 'text-blue-400',
      'Tierra': 'text-yellow-700',
      'Aire': 'text-gray-300',
      'Luz': 'text-yellow-200',
      'Oscuridad': 'text-purple-500',
      'Naturaleza': 'text-green-400',
      'Arcano': 'text-indigo-400',
      'Tiempo': 'text-cyan-300',
      'Caos': 'text-pink-500'
    };
    
    return elementClasses[element] || 'text-white';
  };

  // Función para formatear la fecha
  const formatDate = (date: Date): string => {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Obtener el emoji para la clase
  const getClassEmoji = (className: string): string => {
    const classEmojis: Record<string, string> = {
      'Mago': '🧙',
      'Guerrero': '⚔️',
      'Arquero': '🏹',
      'Paladín': '🛡️',
      'Druida': '🌿',
      'Alquimista': '⚗️',
      'Bardo': '🎵',
      'Nigromante': '💀',
      'Clérigo': '✨',
      'Ladrón': '🗡️'
    };
    
    return classEmojis[className] || '👤';
  };

  if (users.length === 0) {
    return (
      <div style={{ paddingInline: '2rem'}} className="text-center p-12">
        <p className="text-text-dim text-xl">🍺</p>
        <p className="text-text-dim text-xl">No hay aventureros en la taberna...</p>
        <p className="mt-4 text-magic-primary">¡Crea tu primer aventurero ahora!</p>
      </div>
    );
  }

  return (
    <div className="max-h-[650px] overflow-y-auto px-3">
      {users.map((user) => (
        <div 
          key={user.id} 
          className="user-card relative group"
          style={{
            borderRadius: '12px',
            margin: '1.5rem 0'
          }}
        >
          <div className="user-avatar">
            <img 
              src={AVATAR_IMAGES[user.avatarIndex] || AVATAR_IMAGES[0]} 
              alt={user.username} 
              className="avatar-img"
            />
          </div>
          
          <div className="user-info">
            <h3 className="user-name flex items-center">
              {user.username}
              <span className="text-sm font-normal ml-3 bg-space-card px-3 py-1 rounded-full">
                Nvl. {user.level}
              </span>
            </h3>
            
            <div className="user-details">
              <span className="flex items-center">
                <span className="mr-2">{getClassEmoji(user.class)}</span>
                {user.class}
              </span>
              <span className={`flex items-center ${getElementClass(user.element)}`}>
                <span className="mr-2">✧</span>
                {user.element}
              </span>
              <span className="ml-auto text-xs text-text-dim">
                Unido {formatDate(user.createdAt)}
              </span>
            </div>
          </div>
          
          <div className="user-actions opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onEdit(user)}
              className="p-3 text-magic-primary hover:text-magic-accent transition-colors magic-tooltip"
              data-tooltip="Editar aventurero"
            >
              ✏️
            </button>
            <button 
              onClick={() => onDelete(user.id)}
              className="p-3 text-red-500 hover:text-red-400 transition-colors magic-tooltip"
              data-tooltip="Eliminar aventurero"
            >
              🗑️
            </button>
          </div>
          
          {/* Fondo brillante para usuarios de alto nivel */}
          {user.level >= 70 && (
            <div 
              className="absolute inset-0 rounded-xl pointer-events-none" 
              style={{
                border: user.level >= 90 
                  ? '3px solid var(--medieval-gold)' 
                  : '2px solid var(--magic-primary)',
                opacity: 0.3,
                zIndex: -1
              }}
            />
          )}
          
          {/* Insignia especial para usuarios de nivel máximo */}
          {user.level === 100 && (
            <div className="absolute -top-2 -right-2 bg-medieval-gold text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
              👑
            </div>
          )}
        </div>
      ))}
    </div>
  );
};