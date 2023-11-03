"use client";

import React, { useEffect } from "react";

type Props = {
  id: string;
  title: string;
  complete: boolean;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string, complete: boolean) => void;
};

const TodoItem = ({ id, title, complete, toggleTodo, deleteTodo }: Props) => {
  return (
    <li className="flex gap-2 items-center p-4 bg-slate-900 hover:bg-slate-950 rounded-md max-w-sm">
      <input
        type="checkbox"
        name=""
        id={id}
        className="cursor-pointer peer"
        defaultChecked={complete}
        onChange={(e) => toggleTodo(id, e.target.checked)}
      />
      <label
        htmlFor={id}
        className="peer-checked:line-through peer-checked:text-slate-500 cursor-pointer space-x-3 w-full flex justify-between"
      >
        <span>{title}</span>
        <button
          onClick={() => deleteTodo?.(id)}
          type="button"
          className="border rounded-md px-2.5 py-0.5 hover:bg-slate-400"
        >
          x
        </button>
      </label>
    </li>
  );
};

export default TodoItem;
