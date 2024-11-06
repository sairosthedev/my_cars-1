import React from 'react';

export function Select({ children, value, onValueChange }) {
  return (
    <div className="relative">
      <select 
        value={value} 
        onChange={(e) => onValueChange(e.target.value)}
        className="w-full h-10 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2"
      >
        {children}
      </select>
    </div>
  );
}

export function SelectTrigger({ children }) {
  return children;
}

export function SelectContent({ children }) {
  return children;
}

export function SelectItem({ value, children }) {
  return (
    <option value={value}>{children}</option>
  );
}

export function SelectValue() {
  return null;
} 