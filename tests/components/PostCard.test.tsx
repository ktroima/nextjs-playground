import { render, screen } from '@testing-library/react';
import PostCard from '@/components/PostCard';
import { Post } from '@/types';

describe('PostCard', () => {
  const mockPost: Post = {
    id: 1,
    title: 'テスト投稿',
    body: 'これはテスト用の投稿です',
    userId: 1,
  };

  it('投稿のタイトルが表示される', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('テスト投稿')).toBeInTheDocument();
  });

  it('投稿の本文が表示される', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('これはテスト用の投稿です')).toBeInTheDocument();
  });

  it('ユーザーIDが表示される', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText(/User ID: 1/)).toBeInTheDocument();
  });
});
