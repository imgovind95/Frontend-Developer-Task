import { Link } from 'react-router-dom';
import { Rocket, CheckSquare, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="container mx-auto px-6 py-24 text-center">
      {/* Hero Section */}
      <div className="flex flex-col items-center">
        <Rocket className="w-24 h-24 text-indigo-400 animate-bounce" />
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mt-6 mb-4">
          Welcome to <span className="text-indigo-400">TaskFlow</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
          Your new all-in-one solution to organize tasks, streamline workflows, and boost productivity.
        </p>
        <Link
          to="/signup"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg"
        >
          Get Started for Free
        </Link>
      </div>

      {/* Features Section */}
      <div className="mt-32">
        <h2 className="text-4xl font-bold text-white mb-16">Why Choose TaskFlow?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<CheckSquare className="w-12 h-12 text-indigo-400" />}
            title="Simple Task Management"
            description="Easily create, update, and delete tasks. Keep track of what's important."
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-indigo-400" />}
            title="Collaborate (Coming Soon)"
            description="Share tasks and projects with your team to get work done faster together."
          />
          <FeatureCard
            icon={<Rocket className="w-12 h-12 text-indigo-400" />}
            title="Boost Productivity"
            description="A clean, dark-mode interface designed to keep you focused and efficient."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-800 p-8 rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
    <div className="flex justify-center mb-6">{icon}</div>
    <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default Home;