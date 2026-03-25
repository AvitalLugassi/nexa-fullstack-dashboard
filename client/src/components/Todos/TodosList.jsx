import { useToolBarContext } from "../../context/ToolBarContext";
import "../../styles/Todos.css";

function TodosList({ deleteTodo, updateTodoStatus, updateTitle }) {
  const { displayData } = useToolBarContext();

  if (displayData.length === 0) {
    return (
      <div className="todos-empty">
        <div className="todos-empty-icon">📝</div>
        <div className="todos-empty-text">No todos found</div>
        <div className="todos-empty-subtext">You don't have any todos yet</div>
      </div>
    );
  }

  return (
    <div className="todos-table">
      <div className="todos-table-header">
        <div>Done</div>
        <div>ID</div>
        <div>Title</div>
        <div>Status</div>
        <div>Actions</div>
      </div>
      {displayData.map(todo => (
        <div key={todo.id} className="todos-table-row">
          <div>
            <input type="checkbox" checked={todo.completed} onChange={() => updateTodoStatus(todo)} className="todos-checkbox" />
          </div>
          <div className="todos-id">#{todo.id}</div>
          <div className={`todos-title-text ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </div>
          <div>
            <span className={`todos-status ${todo.completed ? 'completed' : 'pending'}`}>
              {todo.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
          <div className="todos-actions">
            <button onClick={() => updateTitle(todo)} className="todos-action-btn">✏️</button>
            <button onClick={() => deleteTodo(todo.id)} className="todos-action-btn">🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
}
export default TodosList;