import { useEffect, useState, useMemo } from "react";
import "./styles.css";
import { NewTodoForm } from "./components/NewTodoForm";
import { TodoList } from "./components/ToDoList";
import Modal from "./components/CustomModal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { TodoItem } from "./components/TodoItem";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (!localValue) return [];
    return JSON.parse(localValue);
  });

  const [modalOpen, setModalOpen] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [showDeleteCompleteModal, setShowDeleteCompletedModal] =
    useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [lastDeleted, setLastDeleted] = useState(null);
  const [showUndo, setShowUndo] = useState(false);
  const [view, setView] = useState("list");
  const [selectDate, setSelectDate] = useState(null);

  let undoTimeoutRef = null;

  const addTodo = ({ title, date, time, note = "", priority }) => {
    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: crypto.randomUUID(),
        title,
        date,
        time,
        note,
        completed: false,
      },
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
    setTodos((currentTodos) => {
      const deletedTodo = currentTodos.find((todo) => todo.id === id);
      if (!deletedTodo) return currentTodos;

      setLastDeleted(deletedTodo);
      setShowUndo(true);

      clearTimeout(undoTimeoutRef);
      undoTimeoutRef = setTimeout(() => {
        setShowUndo(false);
        setLastDeleted(null);
      }, 8000);

      return currentTodos.filter((todo) => todo.id !== id);
    });
  };

  const handleUndo = () => {
    if (lastDeleted) {
      setTodos((prevTodos) => [...prevTodos, lastDeleted]);
      setLastDeleted(null);
      setShowUndo(false);
      clearTimeout(undoTimeoutRef);
    }
  };

  const updateTodo = (id, newTitle, newDate, newTime, newNote) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: newTitle ?? todo.title,
              date: newDate ?? todo.date,
              time: newTime ?? todo.time,
              note: newNote ?? todo.note,
            }
          : todo
      )
    );
  };

  const handleDeleteCompletedClick = () => setShowDeleteCompletedModal(true);
  const handleDeleteAllClick = () => setShowDeleteAllModal(true);

  const confirmDeleteCompleted = () => {
    setTodos((todos) => todos.filter((todo) => !todo.completed));
    setShowDeleteCompletedModal(false);
  };

  const confirmDeleteAll = () => {
    setTodos([]);
    setShowDeleteAllModal(false);
  };

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  const filteredAndSortedTodos = useMemo(() => {
    if (!Array.isArray(todos)) return [];
    let filtered = todos;
    if (filter === "active") filtered = todos.filter((t) => !t.completed);
    if (filter === "completed") filtered = todos.filter((t) => t.completed);
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
  }, [todos, filter, sort]);

  console.log("todos:", todos, "filter:", filter, "sort:", sort);

  return (
    <div className="App">
      {modalOpen && (
        <Modal
          title="Welcome in To Do List App!"
          message="You can manage your to do list here"
          onConfirm={() => setModalOpen(false)}
        />
      )}

      <h1 className="header">To Do List</h1>

      <div className="view-toggle">
        <button
          onClick={() => setView("list")}
          className={view === "list" ? "active" : ""}
        >
          List View
        </button>
        <button
          onClick={() => setView("calendar")}
          className={view === "calendar" ? "active" : ""}
        >
          Calendar view
        </button>

        <div className="(`view-toggle-indicator ${view}`"></div>
      </div>
      {view === "list" ? (
        <>
          <NewTodoForm
            defaultDate={selectDate}
            onSubmit={({ title, date, time, note }) => {
              addTodo({
                title,
                date: date ? date : formatDate(selectDate),
                time,
                note,
              });
            }}
          />
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
              <button onClick={handleDeleteCompletedClick}>
                Delete completed
              </button>
              <button onClick={handleDeleteAllClick}>Delete all</button>
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
        </>
      ) : (
        <div className="calendar-view">
          <Calendar
            onChange={setSelectDate}
            value={selectDate}
            tileClassName={({ date, view }) => {
              if (view === "month") {
                const dayHasTodo = todos.some(
                  (todo) => todo.date === formatDate(date)
                );
                return dayHasTodo ? "has-todo" : null;
              }
            }}
          />
          <h2>
            Tasks for:{" "}
            {selectDate ? selectDate.toLocaleDateString() : "Select a date"}
          </h2>

          <ul className="calendar-tasks">
            {todos
              .filter(
                (todo) => selectDate && todo.date === formatDate(selectDate)
              )
              .map((todo) => (
                <TodoItem
                  key={todo.id}
                  {...todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                />
              ))}
          </ul>
        </div>
      )}
      {showDeleteAllModal && (
        <Modal
          title="Delete all tasks?"
          message="This will remove all your tasks. Are you sure?"
          onConfirm={confirmDeleteAll}
          onCancel={() => setShowDeleteAllModal(false)}
        />
      )}
      {showUndo && (
        <div className="undo-popup">
          <span>Task "{lastDeleted?.title}" was deleted.</span>
          <button onClick={handleUndo}>Undo</button>
        </div>
      )}
    </div>
  );
}
