"use server";

import { prisma } from "@/db";
import { Todo } from "@prisma/client";

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
  await prisma.todo.update({ where: { id }, data: { complete } });
}

/**
 * Deletes a todo item from the database and redirects to the home page.
 * @param id - The id of the todo item to be deleted.
 * @returns Promise<void>
 */
async function deleteTodo(id: string): Promise<void> {
  await prisma.todo.delete({ where: { id } });
  await getTodos(); // Call getTodos() after deleting the todo
}

export { getTodos, toogleTodo, deleteTodo };
