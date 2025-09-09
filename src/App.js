import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import TaskList from "./components/TaskList";

// localStorage keys
const LS_USERS = "rc_users_v1";
const LS_CURRENT = "rc_current_user_v1";
const LS_TASKS = "rc_tasks_v1";

export default function App() {
  const [users, setUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_USERS)) || [];
    } catch (e) {
      return [];
    }
  });
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_CURRENT)) || null;
    } catch (e) {
      return null;
    }
  });
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_TASKS)) || [];
    } catch (e) {
      return [];
    }
  });

  // persist to localStorage when they change
  useEffect(
    () => localStorage.setItem(LS_USERS, JSON.stringify(users)),
    [users]
  );
  useEffect(
    () => localStorage.setItem(LS_CURRENT, JSON.stringify(currentUser)),
    [currentUser]
  );
  useEffect(
    () => localStorage.setItem(LS_TASKS, JSON.stringify(tasks)),
    [tasks]
  );

  // Authentication handlers
  function register({ username, password }) {
    if (users.find((u) => u.username === username)) {
      return { ok: false, message: "Username already exists" };
    }
    const newUser = { username, password };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser({ username });
    return { ok: true };
  }

  function login({ username, password }) {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) return { ok: false, message: "Invalid credentials" };
    setCurrentUser({ username });
    return { ok: true };
  }

  function logout() {
    setCurrentUser(null);
  }

  // Task CRUD handlers
  function createTask(task) {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdBy: currentUser.username,
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }

  function updateTask(id, patch) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentUser={currentUser} onLogout={logout} />
      <main className="container mx-auto p-4 flex-1">
        {!currentUser ? (
          <div className="max-w-md mx-auto mt-8">
            <Auth onLogin={login} onRegister={register} />
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            currentUser={currentUser}
            onCreate={createTask}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        )}
      </main>
      <footer className="text-center p-4 text-sm text-gray-500">
        React CRUD — localStorage demo
      </footer>
    </div>
  );
}
