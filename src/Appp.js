import React from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}

            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;



/////
* {
  box-sizing: border-box;
}

/* 新增區域 */
.add-input,
.add-button {
  display: inline-block;
  border: 2px solid #55d040;
  border-radius: 3px;
  font-size: 16px;
  height: 40px;
}

.add-input {
  width: 215px;
  border: 2px solid #55d040;
  margin-right: 10px;
}

.add-button {
  width: 80px;
  background-color: #55d040;
  border: 2px solid transparent;
  color: white;
  font-weight: bolder;
}

/* check框框 */
/* input[id="completed"] + label {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid #55d040;
    border-radius: 2px;
    cursor: pointer;
  }
  input[id="completed"]:checked + label:after {
    position: relative;
    top: -4px;
    left: 2px;
    content: '\2714';
    font-size: 14px;
  }
  input[id="completed"] {
    display: none;
  } */

/* 原始的input box */
.todo-input-box{
    width: 200px;
    display: flex;
    align-items: center;
    color: #3b3f4e;
    font-size: 20px;
    font-weight: bolder;
 }

/* 編輯時input變成只有底線 */
.border-bottom-input {
  border: 0;
  outline: 0;
  border-bottom: 2px solid #55d040;
  opacity: 0.6;
  margin-right: 20px;
  width: 200px;
}

/* 編輯時的字體 */
.edit-text {
  font-size: 16px;
  color: #3b3f4e;
    width: 200px;
}

/* 編輯/刪除按鈕 */
.btn-style {
  background: transparent;
  color: #3b3f4e;
  border: 2px solid #3b3f4e;
  border-radius: 3px;
  margin-right: 10px;
  padding: 5px 15px;
  font-size: 16px;
}

/* 畫完成刪除線 */
.cross {
  text-decoration: line-through;
  width: 200px;
  display: flex;
  align-items: center;
}

.todolist-container {
  /* background: rgb(202, 37, 37); */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
}
.box {
  display: flex;
  justify-content: start;
}

.todo {
  display: flex;
  justify-content: flex-start;
  /* background: rgb(173, 140, 140); */
  padding: 10px;
}

.checkbox {
  display: flex;
  /* width: 215px; */
}

/////
form {
  display: grid;
  place-content: center;
  min-height: 100vh;
}

.form-control {
  font-family: system-ui, sans-serif;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.1;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
}

.form-control + .form-control {
  margin-top: 1em;
}



input[type="checkbox"] {
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* For iOS < 15 */
  background-color: var(--form-background);
  /* Not removed via appearance */
  margin: 0;

  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 0.15em;
  transform: translateY(-0.075em);

  display: grid;
  place-content: center;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  transform: scale(0);
  transform-origin: bottom left;
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em blue;
  /* Windows High Contrast Mode */
  background-color: CanvasText;
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}

input[type="checkbox"]:focus {
  outline: max(2px, 0.15em) solid currentColor;
  outline-offset: max(2px, 0.15em);
}

input[type="checkbox"]:disabled {
  --form-control-color: var(--form-control-disabled);

  color: var(--form-control-disabled);
  cursor: not-allowed;
}

