import React, { useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

export default function TaskList({
  tasks,
  currentUser,
  onCreate,
  onUpdate,
  onDelete,
}) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showCompleted, setShowCompleted] = useState(true);

  function openCreate() {
    setEditing(null);
    setShowModal(true);
  }
  function openEdit(task) {
    setEditing(task);
    setShowModal(true);
  }

  // Filters:
  // 'lastHour' => tasks within past 1 hour
  // 'pastOlder' => older than 1 hour in past
  // 'nextHour' => scheduled within next 1 hour
  // 'future' => after next hour

  const filtered = useMemo(() => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneHourAhead = new Date(now.getTime() + 60 * 60 * 1000);

    return tasks
      .filter((t) => {
        const dt = new Date(t.datetime);
        // completed toggle
        if (!showCompleted && t.completed) return false;

        switch (filter) {
          case "lastHour":
            return dt >= oneHourAgo && dt <= now;
          case "pastOlder":
            return dt < oneHourAgo;
          case "nextHour":
            return dt > now && dt <= oneHourAhead;
          case "future":
            return dt > oneHourAhead;
          default:
            return true;
        }
      })
      .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  }, [tasks, filter, showCompleted]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex gap-2 items-center">
          <button
            onClick={openCreate}
            className="px-3 py-2 bg-green-600 text-white rounded"
          >
            Create Task
          </button>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All</option>
            <option value="lastHour">Last hour</option>
            <option value="pastOlder">Older than last hour (past)</option>
            <option value="nextHour">Next hour</option>
            <option value="future">After next hour (future)</option>
          </select>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
            />{" "}
            Show completed
          </label>
        </div>

        <div className="text-sm text-gray-600">
          Logged in as <strong>{currentUser.username}</strong>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 col-span-full">
            No tasks found for this filter.
          </div>
        ) : (
          filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              canEdit={task.createdBy === currentUser.username}
              onEdit={() => openEdit(task)}
              onToggle={() => onUpdate(task.id, { completed: !task.completed })}
              onDelete={() => onDelete(task.id)}
            />
          ))
        )}
      </div>

      {showModal && (
        <TaskModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSave={(data) => {
            if (editing) {
              onUpdate(editing.id, data);
            } else {
              onCreate(data);
            }
            setShowModal(false);
          }}
          initial={editing}
        />
      )}
    </div>
  );
}
