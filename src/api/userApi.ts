// src/api/userApi.ts
import axios from 'axios';
import { User, UserCreationData, ApiResponse } from '../types';

const API_URL = 'https://blocksolution.eduartrob.com/api';

// Crear una instancia de Axios que omita la validación de certificados en el navegador
// Esta configuración debería ser suficiente para la mayoría de navegadores modernos
const axiosInstance = axios.create({
  // La validación de certificados se maneja a nivel del navegador
  // No hay un equivalente directo a rejectUnauthorized para el navegador
});

// Obtener todos los usuarios
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<User[]>>(`${API_URL}/users`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Obtener un usuario por ID
export const fetchUserById = async (id: string): Promise<User | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<User>>(`${API_URL}/users/${id}`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    return null;
  }
};

// Crear un nuevo usuario
export const createUser = async (userData: UserCreationData): Promise<User | null> => {
  try {
    const response = await axiosInstance.post<ApiResponse<User>>(`${API_URL}/users`, userData);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

// Actualizar un usuario existente
export const updateUser = async (id: string, userData: Partial<UserCreationData>): Promise<User | null> => {
  try {
    const response = await axiosInstance.put<ApiResponse<User>>(`${API_URL}/users/${id}`, userData);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    return null;
  }
};

// Eliminar un usuario
export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.delete<ApiResponse<void>>(`${API_URL}/users/${id}`);
    return response.data.success;
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    return false;
  }
};