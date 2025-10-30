import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Rocket, LogOut, LogIn, UserPlus, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-white hover:text-indigo-400 transition duration-300">
          <Rocket className="text-indigo-400" />
          <span>TaskFlow</span>
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center text-gray-300 hover:text-white bg-gray-700 px-4 py-2 rounded-lg transition duration-300"
              >
                <LayoutDashboard className="w-5 h-5 mr-2" />
                Dashboard
              </Link>
              <span className="text-gray-400 hidden md:block">|</span>
              <span className="text-gray-300 font-medium hidden md:block">
                Hi, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300 shadow-md"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center text-gray-300 hover:text-white px-4 py-2 rounded-lg transition duration-300"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300 shadow-md"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;