import React, { useState } from "react";

export default function Auth({ onLogin, onRegister }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setErr("");
    if (isRegister) {
      const res = onRegister(form);
      if (!res.ok) setErr(res.message || "Error registering");
    } else {
      const res = onLogin(form);
      if (!res.ok) setErr(res.message || "Login failed");
    }
  }

  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold mb-3">
        {isRegister ? "Register" : "Login"}
      </h2>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={change}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={change}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {isRegister ? "Register" : "Login"}
          </button>
          <button
            type="button"
            onClick={() => setIsRegister((s) => !s)}
            className="px-4 py-2 border rounded"
          >
            {isRegister
              ? "Have an account? Login"
              : "Don't have account? Register"}
          </button>
        </div>
      </form>
    </div>
  );
}
