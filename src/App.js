import React, { useState, useEffect } from "react";
import localStorage from "localStorage";
import "./style.css";


function App() {
  const [todos, setTodos] = useState([]); //所有item
  const [todo, setTodo] = useState(""); //單個item
  const [todoEditing, setTodoEditing] = useState(null); //id已開始為空
  const [editingText, setEditingText] = useState(""); //修改的文字


  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  },[]);

  React.useEffect(()=>{
    const json = JSON.stringify(todos);
    if(todos.length !==0){
      localStorage.setItem("todos", json)
    }
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault();

    //新增todo item
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };

    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  //刪除功能
  function deleteTodo(id) {
    //留下不同id的item
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  //已完成
  function toggleComplete(id) {
    //更改completed狀態
    const updatedTodos = [...todos].map((todo) => {
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
    <div className="App">
      <div className="todolist-container">
        <h1>To Do List</h1>
        <form className="add-input-area" onSubmit={handleSubmit}>
          <input
            className="add-input"
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <button 
          className="add-button"
          type="submit">新增</button>
        </form>
        {todos.map((todo) => (
          <div key={todo.id} className="box">
            <div className="todo">
              <div className="checkbox">
                <input
                  className="checkbox-style"
                  type="checkbox"
                  id="completed"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />

                {todo.id === todoEditing ? (
                  <input
                    className="border-bottom-input edit-text"
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  <div className= { todo.completed ? "cross" : "" + `todo-input-box`}>
                    {todo.text}
                  </div>
                )}
              </div>
              <div className="btn-container">
                {todo.id === todoEditing ? (
                  <button className="btn-style" onClick={() => submitEdits(todo.id)}>更新</button>
                ) : (
                  <button className="btn-style" onClick={() => setTodoEditing(todo.id)}>編輯</button>
                )}

                <button className="btn-style" onClick={() => deleteTodo(todo.id)}>刪除</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
