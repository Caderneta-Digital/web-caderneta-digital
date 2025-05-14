import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );
}