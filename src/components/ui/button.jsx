import React from 'react';

export function Button({ className, variant = "default", size = "default", children, ...props }) {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-red-800 text-white hover:bg-red-900 focus-visible:ring-red-900",
    outline: "border border-red-800 text-red-800 hover:bg-red-50 focus-visible:ring-red-900",
    ghost: "hover:bg-red-100 hover:text-red-900 focus-visible:ring-red-900",
    link: "text-red-800 underline-offset-4 hover:underline focus-visible:ring-red-900"
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6 text-lg",
    icon: "h-10 w-10"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 