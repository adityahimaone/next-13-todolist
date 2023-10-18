import TodoItem from "@/components/TodoItem";
import { prisma } from "@/db";
import { Todo } from "@prisma/client";
import { get } from "http";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

/**
 * Retrieves all todos from the database.
 * @returns {Promise<Todo[]>} A promise that resolves to an array of Todo objects.
 */
function getTodos(): Promise<Todo[]> {
  return prisma.todo.findMany();
}

/**
 * Toggles the completion status of a todo item in the database.
 * @param id - The ID of the todo item to toggle.
 * @param complete - The new completion status of the todo item.
 */
async function toogleTodo(id: string, complete: boolean) {
  "use server";

  await prisma.todo.update({ where: { id }, data: { complete } });
}

/**
 * Deletes a todo item from the database and redirects to the home page.
 * @param id - The id of the todo item to be deleted.
 * @returns Promise<void>
 */
async function deleteTodo(id: string): Promise<void> {
  "use server";

  await prisma.todo.delete({ where: { id } });
  getTodos();
}

export default async function Home() {
  /**
   * Retrieves todos from the server.
   * @returns {Promise<Todo[]>} A promise that resolves with an array of Todo objects.
   */
  const todos = await getTodos();
  // adding data to the database
  // await prisma.todo.create({ data: { title: "testing", complete: false } });
  return (
    <>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl">Todos App</h1>
        <Link href="/new" className="btn-primary-outline">
          New
        </Link>
      </header>
      <main>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              toggleTodo={toogleTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      </main>
    </>
  );
}
