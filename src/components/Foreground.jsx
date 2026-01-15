import React, { useRef, useState } from "react";
import Card from "./Card";
import { FaPlus, FaTrash, FaTimes } from "react-icons/fa";

const Foreground = () => {
  const motionRef = useRef(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [documents, setDocuments] = useState([
    {
      id: 1,
      desc: "This is the description of the document. It provides an overview of the content.",
      fileSize: ".3mb",
      close: false,
      tag: {
        isOpen: true,
        tagTitle: "Download Now!",
        tagColor: "bg-blue-600",
      },
    },
    {
      id: 2,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      fileSize: ".7mb",
      close: true,
      tag: {
        isOpen: false,
        tagTitle: "Completed",
        tagColor: "bg-green-700",
      },
    },
    {
      id: 3,
      desc: "This is the description of the document. It provides an overview of the content.",
      fileSize: ".4mb",
      close: false,
      tag: {
        isOpen: true,
        tagTitle: "Completed",
        tagColor: "bg-green-600",
      },
    },
    {
      id: 4,
      desc: "This is the description of the document. It provides an overview of the content.",
      fileSize: ".5mb",
      close: false,
      tag: {
        isOpen: true,
        tagTitle: "In Progress",
        tagColor: "bg-red-400",
      },
    },
  ]);

  // Add new document
  const addDocument = (newDoc) => {
    setDocuments([...documents, { id: Date.now(), ...newDoc }]);
    setShowAddModal(false);
  };

  // Delete document
  const deleteDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  // Toggle delete mode
  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  return (
    <div
      ref={motionRef}
      className="fixed top-0 left-0 z-[3] w-full h-full flex flex-col"
    >
      {/* Header with Controls */}
      <div className="absolute top-2/3 right-2/3 translate-x-[115%] translate-y-[130%] flex justify-end gap-4 mb-2 py-6 px-4">
        {/* Add Document Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus /> Add Document
        </button>

        {/* Delete Mode Toggle */}
        <button
          onClick={toggleDeleteMode}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isDeleteMode
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-700 hover:bg-gray-600"
          } text-white`}
        >
          {isDeleteMode ? <FaTimes /> : <FaTrash />}
          {isDeleteMode ? "Cancel Delete" : "Delete Document"}
        </button>
      </div>

      {/* Documents Grid */}
      <div className="flex-1 overflow-auto flex gap-6 flex-wrap p-4">
        {documents.map((item) => (
          <Card
            key={item.id}
            data={item}
            reference={motionRef}
            isDeleteMode={isDeleteMode}
            onDelete={() => deleteDocument(item.id)}
          />
        ))}
      </div>

      {/* Add Document Modal */}
      {showAddModal && (
        <AddDocumentModal
          onClose={() => setShowAddModal(false)}
          onAdd={addDocument}
        />
      )}
    </div>
  );
};

// Add Document Modal Component
const AddDocumentModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    desc: "",
    fileSize: ".mb",
    close: false,
    tag: {
      isOpen: true,
      tagTitle: "Download Now!",
      tagColor: "bg-blue-600",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-zinc-800 rounded-2xl p-2 w-96 border border-white/10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Add New Document</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="w-full bg-zinc-700 border border-white/10 rounded-lg p-3 text-white"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              File Size
            </label>
            <input
              type="text"
              name="fileSize"
              value={formData.fileSize}
              onChange={handleChange}
              className="w-full bg-zinc-700 border border-white/10 rounded-lg p-3 text-white"
              placeholder=".mb"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-300 mb-2">
                Tag Title
              </label>
              <input
                type="text"
                name="tagTitle"
                value={formData.tag.tagTitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tag: { ...formData.tag, tagTitle: e.target.value },
                  })
                }
                className="w-full bg-zinc-700 border border-white/10 rounded-lg p-3 text-white"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm text-gray-300 mb-2">
                Tag Color
              </label>
              <select
                value={formData.tag.tagColor}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tag: { ...formData.tag, tagColor: e.target.value },
                  })
                }
                className="w-full bg-zinc-700 border border-white/10 rounded-lg p-3 text-white"
              >
                <option value="bg-blue-600">Blue</option>
                <option value="bg-green-600">Green</option>
                <option value="bg-red-400">Red</option>
                <option value="bg-yellow-500">Yellow</option>
                <option value="bg-purple-600">Purple</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Foreground;
