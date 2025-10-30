import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EditTaskModal = ({ task, isOpen, onClose, onSave }) => {
  // Modal ke andar title aur description ko manage karne ke liye internal state
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // Jab bhi 'task' prop badlega (yaani user naye task pe click karega),
  // modal ke state ko uss task ki details se update kar do
  useEffect(() => {
    if (task) {
      setEditTitle(task.title);
      setEditDesc(task.description);
    }
  }, [task]);

  // Agar modal open nahi hai, toh kuch bhi render mat karo (null)
  if (!isOpen) return null;

  const handleSave = () => {
    // Sirf title aur description waala object save ke liye bhejo
    onSave(task._id, {
      title: editTitle,
      description: editDesc,
    });
  };

  return (
    // Backdrop (poori screen ko cover karne waala background)
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose} // Backdrop pe click karne se modal band ho jayega
    >
      {/* Modal Content */}
      <div
        className="bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-lg relative border border-gray-700"
        onClick={(e) => e.stopPropagation()} // Modal ke andar click karne se modal band nahi hoga
      >
        {/* Close Button (Top-Right) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Edit Task</h2>

        {/* Edit Form */}
        <div className="space-y-4">
          <div>
            <label htmlFor="editTaskTitle" className="block text-sm font-medium text-gray-300 mb-1">
              Task Title
            </label>
            <input
              id="editTaskTitle"
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="editTaskDesc" className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="editTaskDesc"
              rows="4"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Action Buttons (Save/Cancel) */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-gray-300 bg-gray-600 hover:bg-gray-500 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;