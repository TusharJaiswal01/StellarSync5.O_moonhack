"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CollaborativeWorkspace() {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [files, setFiles] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const savedFiles = JSON.parse(localStorage.getItem("files")) || [];
    setTasks(savedTasks);
    setNotes(savedNotes);
    setFiles(savedFiles);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("files", JSON.stringify(files));
  }, [tasks, notes, files]);

  const addTask = () => {
    if (!taskInput.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
    setTaskInput("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addNote = () => {
    if (!noteInput.trim()) return;
    setNotes([...notes, { id: Date.now(), text: noteInput, category: "General" }]);
    setNoteInput("");
  };

  const editNote = (id, newText) => {
    setNotes(notes.map(note => note.id === id ? { ...note, text: newText } : note));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles([...files, ...uploadedFiles.map((file) => file.name)]);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <div className={`${darkMode ? "bg-gray-900/40 text-white" : "bg-slate-900/40 text-blue-200"} min-h-screen p-6`}>
      <button
        onClick={toggleDarkMode}
        className="mb-4 p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
      >
        Toggle Dark Mode
      </button>
      <h1 className="text-3xl font-bold text-center">🚀 Collaborative Workspace</h1>

      {/* Task Management */}
      <motion.div
        className="bg-slate-900/5 p-4 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-xl font-semibold mb-2 text-blue-200">📌 Task Management</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add Task..."
            className="p-2 rounded bg-gray-700 w-full text-blue-200"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <ul className="mt-3">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center p-2 border-b text-blue-200">
              <span className={task.completed ? "line-through" : ""}>{task.text}</span>
              <div>
                <button
                  onClick={() => toggleTask(task.id)}
                  className="text-green-500 mr-2 hover:text-green-600"
                >
                  ✔
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Brainstorming Board */}
      <motion.div
        className="bg-slate-900/5 p-4 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-xl font-semibold mb-2 text-blue-200">💡 Brainstorming Board</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add Idea..."
            className="p-2 rounded bg-gray-700 w-full text-blue-200"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
          />
          <button
            onClick={addNote}
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-gray-700 p-3 rounded flex justify-between text-blue-200"
            >
              <input
                type="text"
                value={note.text}
                onChange={(e) => editNote(note.id, e.target.value)}
                className="bg-transparent outline-none w-full text-blue-200"
              />
              <button
                onClick={() => deleteNote(note.id)}
                className="text-red-400 hover:text-red-500"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Document Sharing */}
      <motion.div
        className="bg-slate-900/5 p-4 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-xl font-semibold mb-2 text-blue-200">📂 Document Sharing</h2>
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="bg-gray-700 p-2 rounded w-full text-blue-200"
        />
        <ul className="mt-3 text-blue-200">
          {files.map((file, index) => (
            <li key={index} className="flex justify-between">
              {file}
              <button
                onClick={() => setFiles(files.filter((_, i) => i !== index))}
                className="text-red-500 hover:text-red-600"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
    </div>
  );
}
