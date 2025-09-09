import React from "react";

export default function TaskCard({
  task,
  canEdit,
  onEdit,
  onToggle,
  onDelete,
}) {
  const dt = new Date(task.datetime);
  const human = dt.toLocaleString();

  return (
    <div
      className={`p-4 rounded shadow bg-white flex flex-col justify-between ${
        task.completed ? "opacity-70" : ""
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg">{task.title}</h3>
          <div className="text-sm text-gray-500">{human}</div>
        </div>
        <p className="text-sm text-gray-700 mt-2">{task.description}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={task.completed} onChange={onToggle} />
          <span className="text-sm">Completed</span>
        </label>

        <div className="flex gap-2">
          {canEdit && (
            <>
              <button
                onClick={onEdit}
                className="px-2 py-1 border rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="px-2 py-1 border rounded text-sm"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
