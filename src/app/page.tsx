"use client";

import { useEffect, useState } from "react";

interface Task {
  _id: string;
  title: string;
}

export default function TodoPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  async function fetchTasks() {
    const res = await fetch("/api/todos");
    const data: Task[] = await res.json();
    setTasks(data);
  }

  async function addTask() {
    if (!title.trim()) return;
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    fetchTasks();
  }

  async function deleteTask(id: string) {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  }

  async function updateTask(id: string, newTitle: string) {
    await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });
    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>To-Do App</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}{" "}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
            {/* optionally an “edit” UI to call updateTask */}
          </li>
        ))}
      </ul>
    </div>
  );
}
