import { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2 text-gray-900">
        {post.title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{post.body}</p>
      <div className="mt-4 text-sm text-gray-500">
        User ID: {post.userId}
      </div>
    </div>
  );
}
