import { useState, useEffect } from 'react';
import API from '../utils/api';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Async function to safely fetch posts
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await API.get('/posts'); // Adjust API route if needed
        const data = res.data;

        // Safe mapping: ensure posts is an array
        const postsArray = Array.isArray(data) ? data : data.posts || [];
        setPosts(postsArray);

        console.log('Fetched posts:', postsArray);
      } catch (err) {
        console.error('Error fetching posts:', err);
        toast.error('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length > 0 ? (
        posts.map(post => (
          <div
            key={post._id || post.id}
            className="border p-4 mb-4 rounded shadow-sm"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <h3 className="text-md font-medium">{post.heading}</h3>
            <p className="mt-2">{post.paragraph}</p>
            <small className="text-gray-500">Category: {post.category}</small>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
