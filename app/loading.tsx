import React from "react";

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-xl bg-green-400 px-6 py-4 text-lg font-semibold text-red-500 shadow-lg">
        Loading...
      </div>
    </div>
  );
}

export default Loading;