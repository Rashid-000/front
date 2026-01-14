import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    heading: '',
    paragraph: '',
    category: 'Latest Technology',
  });
  const [image, setImage] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const navigate = useNavigate();

  // Reusable fetchPosts for post operations
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await API.get('/api/posts');
      const data = Array.isArray(res.data) ? res.data : res.data.posts || [];
      setPosts(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load posts');
      setPosts([]);
    }
    setLoading(false);
  };

  // ESLint-safe useEffect for initial fetch
  useEffect(() => {
    const fetchPostsOnMount = async () => {
      setLoading(true);
      try {
        const res = await API.get('/api/posts');
        const data = Array.isArray(res.data) ? res.data : res.data.posts || [];
        setPosts(data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load posts');
        setPosts([]);
      }
      setLoading(false);
    };

    fetchPostsOnMount();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('heading', form.heading);
    formData.append('paragraph', form.paragraph);
    formData.append('category', form.category);
    if (image) formData.append('image', image);

    try {
      if (editingPost) {
        await API.put(`/api/posts/${editingPost._id}`, formData);
        toast.success('Post updated!');
      } else {
        await API.post('/api/posts', formData);
        toast.success('Post published!');
      }
      resetForm();
      fetchPosts();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await API.delete(`/api/posts/${id}`);
      toast.success('Post deleted');
      fetchPosts();
    } catch (err) {
      console.error(err);
      toast.error('Delete failed');
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      heading: post.heading,
      paragraph: post.paragraph,
      category: post.category,
    });
    setImage(null);
  };

  const resetForm = () => {
    setForm({
      title: '',
      heading: '',
      paragraph: '',
      category: 'Latest Technology',
    });
    setImage(null);
    setEditingPost(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    toast.success('Logged out');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Create/Edit Form */}
      <div className="bg-white p-8 rounded-2xl shadow-xl mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {editingPost ? 'Edit' : 'Create New'} Post
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-4 mb-4 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Heading"
            value={form.heading}
            onChange={(e) => setForm({ ...form, heading: e.target.value })}
            className="w-full p-4 mb-4 border rounded-lg"
            required
          />
          <textarea
            placeholder="Content..."
            value={form.paragraph}
            rows={10}
            onChange={(e) => setForm({ ...form, paragraph: e.target.value })}
            className="w-full p-4 mb-4 border rounded-lg"
            required
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full p-4 mb-4 border rounded-lg"
          >
            <option>Latest Technology</option>
            <option>Latest News</option>
            <option>Entertainment</option>
            <option>Earn Money</option>
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-4 mb-6 border rounded-lg"
            required={!editingPost || !!image}
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700"
            >
              {editingPost ? 'Update' : 'Publish'} Post
            </button>
            {editingPost && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 text-white px-8 py-4 rounded-lg"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Posts List */}
      {loading ? (
        <p className="text-center text-gray-600">Loading posts...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-xl shadow-lg p-6 relative"
              >
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="text-xl font-bold mt-4">{post.heading}</h3>
                <p className="text-gray-600 text-sm mt-2">{post.category}</p>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => handleEdit(post)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No posts found.</p>
          )}
        </div>
      )}
    </div>
  );
}
