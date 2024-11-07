import React from 'react';

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm 
        placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent
        disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
} 