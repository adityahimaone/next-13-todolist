"use client";

import { useEffect, useState } from "react";
import TodoItem from "@/components/TodoItem";
import Link from "next/link";
import { getTodos, toogleTodo, deleteTodo } from "@/api/todos";
import { Todo } from "@prisma/client";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [parent] = useAutoAnimate();

  // Separate async function to fetch todos
  async function fetchTodos() {
    const todosData = await getTodos();
    setTodos(todosData);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    await fetchTodos(); // Fetch and update todos after deleting
  };

  console.log(todos, "todos2");

  return (
    <>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl">Todos App</h1>
        <Link href="/new" className="btn-primary-outline">
          New
        </Link>
      </header>
      <main>
        <ul ref={parent} className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              toggleTodo={toogleTodo}
              deleteTodo={handleDeleteTodo}
            />
          ))}
        </ul>
      </main>
    </>
  );
}
