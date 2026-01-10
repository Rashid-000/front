import { Link } from 'react-router-dom';

export default function BlogCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
     <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
       
      
      <div className="p-6">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          {post.category}
        </span>
        <h2 className="text-2xl font-bold mt-2 text-gray-900 line-clamp-2">
          {post.heading}
        </h2>
        <p className="text-gray-600 mt-3 line-clamp-3">
          {post.paragraph.replace(/<[^>]*>/g, '').substring(0, 150)}...
        </p>
        <div className="mt-5 flex justify-between items-center">
          <Link 
            to={`/blog/${post.slug}`}
            className="text-blue-600 font-semibold hover:text-blue-800 transition"
          >
            Read More →
          </Link>
          <span className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}