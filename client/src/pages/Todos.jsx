import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../API/APIService.js";
import ToolBar from "../components/ToolBar.jsx";
import AppError from "../components/Notification/AppError";
import TodosList from "../components/Todos/TodosList.jsx";
import { useItemActions } from '../hooks/useItemActions';
import { ConfirmModal, PromptModal } from "../components/Notification/GeneralModal";
import "../styles/Todos.css";
import { ToolBarProvider } from "../context/ToolBarContext";
import { showToast } from "../components/Notification/GeneralModal";

function Todos() {
  const { userId } = useParams();
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);

  const addFields = [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'completed', label: 'Completed', type: 'checkbox', default: false }
  ];

  const loadTodos = async () => {
    try {
      const response = await api.get('todos', { userId: userId });
      setTodos(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadTodos();
  }, [userId]);

  const { updateItem, deleteItem } = useItemActions('todos', {
    onLocalUpdate: item => setTodos(prev => prev.map(t => t.id === item.id ? item : t)),
    onLocalDelete: id => setTodos(prev => prev.filter(t => t.id !== id)),
    confirmOnDelete: false
  });

  const updateTodoStatus = async (todo) => {
    const updated = { ...todo, completed: !todo.completed };
    try {
      await updateItem(todo.id, updated);
      showToast(`Todo marked as ${updated.completed ? 'completed' : 'pending'}!`, 'success');
    } catch (error) { 
      setError(error.message);
      showToast('Failed to update todo status', 'error');
    }
  };


  const handleAdd = async (payload) => {
    let data = { ...payload };  
    data = { ...data, userId: userId };
    try {
      const response = await api.post('todos', data);
      setTodos(prev => [...prev, response.data]);
      showToast('Todo created successfully!', 'success');
    } catch (err) { 
      setError(err.message);
      showToast('Failed to create todo', 'error');
    }
  };

  const deleteTodo = async (id) => {
    setItemToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteItem(itemToDelete);
      setShowConfirm(false);
      setItemToDelete(null);
      showToast('Todo deleted successfully!', 'success');
    } catch (err) { 
      setError(err.message);
      showToast('Failed to delete todo', 'error');
    }
  };

  const updateTitle = async (todo) => {
    setItemToEdit(todo);
    setShowPrompt(true);
  };

  const handleSaveEdit = async (newTitle) => {
    try {
      await updateItem(itemToEdit.id, { ...itemToEdit, title: newTitle });
      setShowPrompt(false);
      setItemToEdit(null);
      showToast('Todo updated successfully!', 'success');
    } catch (err) { 
      setError(err.message);
      showToast('Failed to update todo', 'error');
    }
  };
  return (
    <div className="todos-container">
      <div className="todos-header">
        <h1 className="todos-title"><span class="nav-icon todos-icon"></span> My Todos</h1>
        <p className="todos-subtitle">Keep track of your tasks and goals</p>
      </div>
      {error && <AppError message={error} onRetry={loadTodos} />}
      <ToolBarProvider initialData={todos}>
        <ToolBar onAdd={handleAdd} addFields={addFields} />
        <TodosList deleteTodo={deleteTodo} updateTodoStatus={updateTodoStatus} updateTitle={updateTitle} />
      </ToolBarProvider>

      <ConfirmModal
        isOpen={showConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirm(false)}
        message="Are you sure you want to delete this todo?"
      />

      <PromptModal
        isOpen={showPrompt}
        onConfirm={handleSaveEdit}
        onCancel={() => setShowPrompt(false)}
        message="Edit Todo Title"
        label="Title"
        defaultValue={itemToEdit?.title}
      />
    </div>
  );
}
export default Todos;