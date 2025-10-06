import { useEffect, useState, useMemo } from "react";
import "./styles.css";
import { NewTodoForm } from "./components/NewTodoForm";
import { TodoList } from "./components/ToDoList";
import Modal from "./components/CustomModal"; 

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (!localValue) return [];
    return JSON.parse(localValue);
  });

  const [modalOpen, setModalOpen] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [showDeleteCompleteModal, setShowDeleteCompletedModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  

  const addTodo = (title) => {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title, completed: false },
    ]);
  };

  const toggleTodo = (id, completed) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

 
  const updateTodo = (id, newTitle) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const handleDeleteCompletedClick = () => setShowDeleteCompletedModal(true);
  const handleDeleteAllClick = () => setShowDeleteAllModal(true);

  const confirmDeleteCompleted = () => {
    setTodos((todos) => todos.filter(todo => !todo.completed)); 
    setShowDeleteCompletedModal(false);
  }

  const confirmDeleteAll = () => {
    setTodos([]);
    setShowDeleteAllModal(false);
  }
  
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  const filteredAndSortedTodos = useMemo(() =>  {
    if (!Array.isArray(todos)) return [];
    let filtered = todos; 
    if (filter === "active") filtered = todos.filter(t => !t.completed);
    if (filter === "completed") filtered = todos.filter(t => t.completed);
    let sorted = [...filtered];
    switch (sort) {
      case "newest":
        sorted.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case "oldest":
        sorted.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case "a-z":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    return sorted;
    
  },[todos, filter, sort]);

  console.log("todos:", todos, "filter:", filter, "sort:", sort);


  return (
    <>
      {modalOpen && (
        <Modal
          title="Welcome in To-Do App!"
          message="You can manage your to-do list here"
          onCancel={() => setModalOpen(false)}
          onConfirm={() => setModalOpen(false)}
          
        />
      )}


      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">To do List</h1>
      <div className="controls">
        <div className="filter-buttons">
          <button onClick={() => setFilter("all")}>All tasks</button>
          <button onClick={() => setFilter("active")}>Not finished</button>
          <button onClick={() => setFilter("completed")}>Finished</button>
        </div>

        <div className="sort-buttons">
          <button onClick={() => setSort("newest")}>Newest</button>
          <button onClick={() => setSort("oldest")}>Oldest</button>
          <button onClick={() => setSort("a-z")}>A-Z</button>
          <button onClick={() => setSort("z-a")}>Z-A</button>
        </div>
        <div className="clear-buttons">
          <button onClick={handleDeleteCompletedClick}>delete completed</button>
          <button onClick={handleDeleteAllClick}>delete all</button>
        </div>
        
          
      </div>
      <TodoList
        todos={filteredAndSortedTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
      {showDeleteCompleteModal && (
        <Modal
        title="Delete all completed tasks?"
        message="This will remove all completed tasks. Are you sure?"
        onConfirm={confirmDeleteCompleted}
        onCancel={() => setShowDeleteCompletedModal(false)}
        />
      )}

      {showDeleteAllModal && (
        <Modal 
        title="Delete all tasks?"
        message="This will remove all your tasks. Are you sure?"
        onConfirm={confirmDeleteAll}
        onCancel={() => setShowDeleteAllModal(false)}
        />
      )}
    </>
  );
}

