import React from 'react';

export function Form({ className, ...props }) {
  return (
    <form className={className} {...props} />
  );
}

export function FormItem({ className, children, ...props }) {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function FormLabel({ className, children, ...props }) {
  return (
    <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
      {children}
    </label>
  );
}

export function FormControl({ children }) {
  return children;
}

export function FormMessage({ className, children, ...props }) {
  return (
    <p className={`text-sm font-medium text-red-500 ${className}`} {...props}>
      {children}
    </p>
  );
}

export function FormField({ children }) {
  return children;
} 