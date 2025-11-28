import { Post, User } from '@/types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * API エラーハンドリング用のカスタムエラークラス
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * 汎用的な fetch ラッパー関数
 */
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `API request failed: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Network error occurred');
  }
}

/**
 * ユーザー関連の API
 */
export const userApi = {
  /**
   * 全ユーザーを取得
   */
  getAll: () => fetchApi<User[]>('/users'),

  /**
   * 特定のユーザーを取得
   */
  getById: (id: number) => fetchApi<User>(`/users/${id}`),

  /**
   * ユーザーを作成
   */
  create: (user: Omit<User, 'id'>) =>
    fetchApi<User>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    }),

  /**
   * ユーザー情報を更新
   */
  update: (id: number, user: Partial<User>) =>
    fetchApi<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(user),
    }),

  /**
   * ユーザーを削除
   */
  delete: (id: number) =>
    fetchApi<void>(`/users/${id}`, {
      method: 'DELETE',
    }),
};

/**
 * 投稿関連の API
 */
export const postApi = {
  /**
   * 全投稿を取得
   */
  getAll: () => fetchApi<Post[]>('/posts'),

  /**
   * 特定の投稿を取得
   */
  getById: (id: number) => fetchApi<Post>(`/posts/${id}`),

  /**
   * ユーザーの投稿を取得
   */
  getByUserId: (userId: number) =>
    fetchApi<Post[]>(`/posts?userId=${userId}`),

  /**
   * 投稿を作成
   */
  create: (post: Omit<Post, 'id'>) =>
    fetchApi<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    }),

  /**
   * 投稿を更新
   */
  update: (id: number, post: Partial<Post>) =>
    fetchApi<Post>(`/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(post),
    }),

  /**
   * 投稿を削除
   */
  delete: (id: number) =>
    fetchApi<void>(`/posts/${id}`, {
      method: 'DELETE',
    }),
};
