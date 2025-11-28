// API レスポンスの型定義

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
