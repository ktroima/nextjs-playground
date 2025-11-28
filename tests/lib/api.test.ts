import { postApi, userApi, ApiError } from '@/lib/api';

// fetch のモック
global.fetch = jest.fn();

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('postApi', () => {
    it('全投稿を取得できる', async () => {
      const mockPosts = [
        { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
        { id: 2, title: 'Post 2', body: 'Body 2', userId: 2 },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPosts,
      });

      const posts = await postApi.getAll();
      expect(posts).toEqual(mockPosts);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/posts',
        expect.any(Object)
      );
    });

    it('特定の投稿を取得できる', async () => {
      const mockPost = { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPost,
      });

      const post = await postApi.getById(1);
      expect(post).toEqual(mockPost);
    });

    it('API エラー時に ApiError を投げる', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
        status: 404,
      });

      await expect(postApi.getById(999)).rejects.toThrow(ApiError);
    });
  });

  describe('userApi', () => {
    it('全ユーザーを取得できる', async () => {
      const mockUsers = [
        { id: 1, name: 'User 1', email: 'user1@example.com' },
        { id: 2, name: 'User 2', email: 'user2@example.com' },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      });

      const users = await userApi.getAll();
      expect(users).toEqual(mockUsers);
    });
  });
});
