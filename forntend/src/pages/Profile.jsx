import useAuthStore from '../store/authStore';
import { User, Mail, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <div className="text-center p-10">Loading profile...</div>;
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border-t-4 border-indigo-500">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">{user.name}</h1>
          <p className="text-lg text-gray-400">{user.email}</p>
        </div>
        
        <div className="mt-10 border-t border-gray-700 pt-6 space-y-4">
          <ProfileInfo icon={<User className="w-5 h-5 text-indigo-400" />} label="Username" value={user.name} />
          <ProfileInfo icon={<Mail className="w-5 h-5 text-indigo-400" />} label="Email Address" value={user.email} />
          <ProfileInfo icon={<Calendar className="w-5 h-5 text-indigo-400" />} label="User ID" value={user._id} />
        </div>
      </div>
    </div>
  );
};

const ProfileInfo = ({ icon, label, value }) => (
  <div className="flex items-center bg-gray-700 p-4 rounded-lg">
    <div className="mr-4">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-md font-semibold text-white">{value}</p>
    </div>
  </div>
);


export default Profile;