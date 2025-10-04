import { TodoItem } from "./TodoItem";

export function TodoList({ todos, toggleTodo, deleteTodo, updateTodo }) {
  return (
    <ul className="list">
      {todos.length === 0 && "No things to do yet"}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  );
}
