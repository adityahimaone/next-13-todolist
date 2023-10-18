import { prisma } from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {};

async function createTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }

  await prisma.todo.create({ data: { title, complete: false } });
  redirect("/");
}

function Page({}: Props) {
  return (
    <>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl">New</h1>
      </header>
      <main>
        <form action={createTodo} className="flex gap-2 flex-col">
          <input type="text" name="title" className="btn-primary-outline" />
          <div className="flex gap-1 justify-end">
            <Link href=".." className="btn-primary-outline">
              Cancel
            </Link>
            <button type="submit" className="btn-primary-outline">
              Create
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Page;
