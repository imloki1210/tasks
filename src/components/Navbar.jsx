import React from "react";

export default function Navbar({ currentUser, onLogout }) {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="font-bold text-lg">RC-Tasks</div>
          <div className="text-sm text-gray-500">Simple localStorage CRUD</div>
        </div>

        <div>
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="text-sm">
                Signed in as <strong>{currentUser.username}</strong>
              </div>
              <button
                onClick={onLogout}
                className="px-3 py-1 border rounded text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="text-sm text-gray-600">
              Please login or register
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
