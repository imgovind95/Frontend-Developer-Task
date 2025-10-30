import { Trash2, Edit, CheckCircle, Clock } from 'lucide-react';

// 'onEdit' prop ko yahan add karein
const TaskCard = ({ task, onDelete, onUpdateStatus, onEdit }) => {
  const getStatusClasses = () => {
    switch (task.status) {
      case 'Completed':
        return {
          border: 'border-green-500',
          icon: <CheckCircle className="text-green-500" />,
          text: 'text-green-500',
        };
      case 'In Progress':
        return {
          border: 'border-yellow-500',
          icon: <Clock className="text-yellow-500" />,
          text: 'text-yellow-500',
        };
      default:
        return {
          border: 'border-gray-500',
          icon: <Clock className="text-gray-500" />,
          text: 'text-gray-500',
        };
    }
  };

  const { border, icon, text } = getStatusClasses();

  return (
    <div
      className={`bg-gray-800 rounded-xl shadow-lg p-6 border-t-4 ${border} transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white">{task.title}</h3>
        <span className={`flex items-center text-sm font-medium ${text}`}>
          {icon}
          <span className="ml-2">{task.status}</span>
        </span>
      </div>
      <p className="text-gray-400 mb-6 min-h-[40px]">{task.description}</p>
      <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
        <p className="text-xs text-gray-500">
          Updated: {new Date(task.updatedAt).toLocaleDateString()}
        </p>
        <div className="flex space-x-3">
          <button 
            onClick={() => onUpdateStatus(task._id, task.status === 'Completed' ? 'Pending' : 'Completed')}
            className="text-gray-400 hover:text-green-500 transition duration-300" 
            title={task.status === 'Completed' ? 'Mark as Pending' : 'Mark as Completed'}
          >
            <CheckCircle className="w-5 h-5" />
          </button>
          
          {/* === YAHAN onClick EVENT ADD KAREIN === */}
          <button 
            onClick={() => onEdit(task)} // task object ko pass karein
            className="text-gray-400 hover:text-indigo-400 transition duration-300" 
            title="Edit Task"
          >
            <Edit className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => onDelete(task._id)}
            className="text-gray-400 hover:text-red-500 transition duration-300" 
            title="Delete Task"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;