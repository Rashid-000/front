import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import axios from 'axios';

const categoryTitles = {
  'Latest Technology': 'Latest Technology',
  'Latest News': 'Latest News',
  'Entertainment': 'Entertainment',
  'Earn Money': 'Earn Money'
};

export default function Category() {
  const { cat } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const title = categoryTitles[cat] || cat;

  useEffect(() => {
    axios.get(`/api/posts/category/${cat}`)
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      });
  }, [cat]);

  return (
    <div className="container mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline flex items-center gap-2"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">
        {title}
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3].map(i => <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-96"></div>)}
        </div>
      ) : posts.length === 0 ? (
        <p className="text-center text-2xl text-gray-500">No posts in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => <BlogCard key={post._id} post={post} />)}
        </div>
      )}
    </div>
  );
}