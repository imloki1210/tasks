import React, { useEffect, useState } from "react";
import { Modal, Button, DatePicker, Input } from "rsuite";
import DateTimePicker from "rsuite/DateTimePicker";

export default function TaskModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    datetime: new Date(),
    completed: false,
  });

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        description: initial.description || "",
        datetime: initial.datetime ? new Date(initial.datetime) : new Date(),
        completed: !!initial.completed,
      });
    } else {
      setForm({
        title: "",
        description: "",
        datetime: new Date(),
        completed: false,
      });
    }
  }, [initial, open]);

  function change(field, val) {
    setForm((f) => ({ ...f, [field]: val }));
  }

  function save() {
    if (!form.title.trim()) return alert("Title required");
    onSave({
      title: form.title,
      description: form.description,
      datetime: form.datetime.toISOString(),
      completed: !!form.completed,
    });
  }

  return (
    <Modal backdrop show={open} onHide={onClose} size="sm">
      <Modal.Header>
        <Modal.Title>{initial ? "Edit Task" : "Create Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-3">
          <div>
            <label className="block text-sm">Title</label>
            <input
              value={form.title}
              onChange={(e) => change("title", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => change("description", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Date & Time</label>
            <DateTimePicker
              value={form.datetime}
              onChange={(val) => change("datetime", val || new Date())}
              format="yyyy-MM-dd HH:mm"
              style={{ width: "100%" }}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.completed}
              onChange={(e) => change("completed", e.target.checked)}
            />
            <span className="text-sm">Mark as completed</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} appearance="subtle">
          Cancel
        </Button>
        <Button onClick={save} appearance="primary">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
