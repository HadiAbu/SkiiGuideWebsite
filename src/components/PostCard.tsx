import { formatDistanceToNow } from 'date-fns';
import { Heart, Trash2, User as UserIcon } from 'lucide-react';
import { db, auth, handleFirestoreError } from '../firebase';
import { doc, updateDoc, deleteDoc, increment } from 'firebase/firestore';
import { Post, OperationType } from '../types';
import Markdown from 'react-markdown';
import { motion } from 'motion/react';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const isAuthor = auth.currentUser?.uid === post.authorUid;

  const handleLike = async () => {
    try {
      await updateDoc(doc(db, 'posts', post.id), {
        likesCount: increment(1)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `posts/${post.id}`);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await deleteDoc(doc(db, 'posts', post.id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `posts/${post.id}`);
    }
  };

  const formattedDate = post.createdAt?.toDate 
    ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true })
    : 'just now';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-2xl border border-slate-200 p-5 mb-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
            {post.authorPhoto ? (
              <img src={post.authorPhoto} alt={post.authorName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <UserIcon className="w-5 h-5 text-slate-400" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 leading-tight">{post.authorName}</h3>
            <p className="text-xs text-slate-500">{formattedDate}</p>
          </div>
        </div>

        {isAuthor && (
          <button
            onClick={handleDelete}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="prose prose-slate max-w-none mb-4 text-slate-800">
        <div className="markdown-body">
          <Markdown>{post.content}</Markdown>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
        <button
          onClick={handleLike}
          className="flex items-center gap-1.5 text-slate-500 hover:text-rose-600 transition-colors group"
        >
          <Heart className="w-5 h-5 group-hover:fill-rose-600 transition-all" />
          <span className="text-sm font-medium">{post.likesCount}</span>
        </button>
      </div>
    </motion.div>
  );
}
