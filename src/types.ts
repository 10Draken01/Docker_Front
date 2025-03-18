// src/types.ts
export interface User {
    id: string;
    username: string;
    class: string;
    level: number;
    avatarIndex: number;
    element: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type UserCreationData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
  
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }
  
  // Clases de personajes disponibles
  export const CHARACTER_CLASSES = [
    'Mago',
    'Guerrero',
    'Arquero',
    'Paladín',
    'Druida',
    'Alquimista',
    'Bardo',
    'Nigromante',
    'Clérigo',
    'Ladrón'
  ];
  
  // Elementos mágicos disponibles
  export const MAGICAL_ELEMENTS = [
    'Fuego',
    'Agua',
    'Tierra',
    'Aire',
    'Luz',
    'Oscuridad',
    'Naturaleza',
    'Arcano',
    'Tiempo',
    'Caos'
  ];
  
  // Imágenes de avatar predefinidas
  export const AVATAR_IMAGES = [
    // Se accederá por índice al enviar a la API
    '/avatars/1.jpg',
    '/avatars/2.jpg',
    '/avatars/3.jpg',
    '/avatars/4.jpg',
  ];