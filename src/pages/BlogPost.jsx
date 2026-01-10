import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/posts/${slug}`)
      .then(res => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="text-center py-20 text-2xl">Loading...</div>;
  if (!post) return <div className="text-center py-20 text-2xl text-red-600">Post not found!</div>;

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <img src={post.image} alt={post.title}
        
        className="w-full h-96 object-cover rounded-2xl shadow-xl"
      />
    
      <div className="mt-10">
        <span className="text-sm font-bold text-blue-600 uppercase">{post.category}</span>
        <h1 className="text-5xl font-bold mt-4 text-gray-900">{post.heading}</h1>
        <p className="text-2xl text-gray-700 mt-4 font-medium">{post.title}</p>
        
        <div className="mt-8 prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.paragraph }} />
        </div>

        <p className="mt-10 text-gray-500">
          Published on {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </article>
  );
}