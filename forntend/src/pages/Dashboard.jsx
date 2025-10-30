import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import TaskCard from '../components/TaskCard';
import EditTaskModal from '../components/EditTaskModal'; // Modal ko import karein
import { Plus } from 'lucide-react';

// Axios instance to send token automatically
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Bug fix for token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthStore();

  // === MODAL KE LIYE NAYA STATE ===
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTaskToEdit, setCurrentTaskToEdit] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null); 
      const { data } = await api.get('/tasks');
      setTasks(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tasks. Please ensure backend is running.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title || !description) return;
    setError(null); 

    try {
      const { data: newTask } = await api.post('/tasks', { title, description });
      setTasks([newTask, ...tasks]); 
      setTitle('');
      setDescription('');
    } catch (err) {
      setError('Failed to create task.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    setError(null); 
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };
  
  const handleUpdateStatus = async (taskId, newStatus) => {
    setError(null); 
    try {
      const { data: updatedTask } = await api.put(`/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
    } catch (err) {
      setError('Failed to update status.');
    }
  };

  // === TASK EDIT KARNE KE LIYE NAYA FUNCTION ===
  const handleEditTask = async (taskId, updatedData) => {
    setError(null);
    try {
      // Backend ko PUT request bhejo
      const { data: updatedTask } = await api.put(`/tasks/${taskId}`, updatedData);
      
      // Local state (tasks array) ko update karo
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
      
      // Modal band kar do
      closeEditModal();
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  // === MODAL KO KONTROL KARNE KE FUNCTIONS ===
  const openEditModal = (task) => {
    setCurrentTaskToEdit(task);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setCurrentTaskToEdit(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">
        Welcome, <span className="text-indigo-400">{user?.name}!</span>
      </h1>
      <p className="text-xl text-gray-300 mb-10">Here are your tasks for today.</p>

      {/* Create Task Form (Updated Layout) */}
      <form onSubmit={handleCreateTask} className="bg-gray-800 p-6 rounded-xl shadow-lg mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">Add a New Task</h2>
        
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 max-w-4xl">
          <div>
            <label htmlFor="taskTitle" className="block text-xs font-medium text-gray-400 mb-1 uppercase">Task Title</label>
            <input
              id="taskTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Finish report"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="taskDesc" className="block text-xs font-medium text-gray-400 mb-1 uppercase">Description</label>
            <input
              id="taskDesc"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Finalize Q3 data"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full md:w-auto flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Task
        </button>
      </form>

      {/* Task List */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">Your Tasks</h2>
        {loading ? (
          <p className="text-gray-400">Loading tasks...</p>
        ) : tasks.length === 0 && !error ? (
          <div className="bg-gray-800 p-10 rounded-xl text-center shadow-lg">
            <h3 className="text-2xl font-semibold text-white mb-2">No tasks found!</h3>
            <p className="text-gray-400">Looks like you're all caught up. Add a new task above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onDelete={handleDeleteTask}
                onUpdateStatus={handleUpdateStatus}
                onEdit={openEditModal} // onEdit prop ko yahan pass karein
              />
            ))}
          </div>
        )}
      </div>

      {/* === MODAL KO YAHAN RENDER KAREIN === */}
      <EditTaskModal
        isOpen={isModalOpen}
        onClose={closeEditModal}
        task={currentTaskToEdit}
        onSave={handleEditTask}
      />
    </div>
  );
};

export default Dashboard;