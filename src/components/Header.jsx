import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-5 flex flex-wrap justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">TechBlog</Link>
        
        <nav className="flex flex-wrap gap-4 md:gap-8 text-sm md:text-base mt-4 md:mt-0">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/category/Latest Technology" className="hover:underline">Latest Technology</Link>
          <Link to="/category/Latest News" className="hover:underline">Latest News</Link>
          <Link to="/category/Entertainment" className="hover:underline">Entertainment</Link>
          <Link to="/category/Earn Money" className="hover:underline">Earn Money</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
          
          <button
            onClick={() => navigate('/admin')}
            className="bg-white text-blue-600 px-5 py-2 rounded-full font-medium hover:bg-gray-100 transition"
          >
            {isLoggedIn ? 'Dashboard' : 'Admin'}
          </button>
        </nav>
      </div>
    </header>
  );
}