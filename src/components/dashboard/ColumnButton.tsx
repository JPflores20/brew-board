import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ColumnButtonProps {
  icon: LucideIcon | string | React.ReactNode;
  label: string;
  url?: string;
  accentColor: 'green' | 'blue' | 'teal';
  className?: string;
}

export function ColumnButton({ icon, label, url, accentColor, className = "" }: ColumnButtonProps) {
  const isStringIcon = typeof icon === 'string';

  const colorStyles = {
    green: "hover:border-green-500/50 hover:bg-green-500/10 hover:shadow-green-500/20 text-green-500 [&_svg]:text-green-500",
    blue: "hover:border-blue-500/50 hover:bg-blue-500/10 hover:shadow-blue-500/20 text-blue-500 [&_svg]:text-blue-500",
    teal: "hover:border-teal-500/50 hover:bg-teal-500/10 hover:shadow-teal-500/20 text-teal-500 [&_svg]:text-teal-500"
  };

  const borderStyles = "border border-white/10 bg-white/5 rounded-xl";
  const baseHover = "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg";

  return (
    <a 
      href={url || "#"} 
      target={url ? "_blank" : "_self"}
      rel={url ? "noopener noreferrer" : ""}
      className={`flex flex-col items-center justify-center p-3 gap-2 text-center ${borderStyles} ${baseHover} ${colorStyles[accentColor]} ${className}`}
    >
      <div className="h-10 w-10 flex items-center justify-center">
        {typeof icon === 'string' ? (
           <span className="text-2xl font-bold font-sans tracking-tighter">{icon}</span>
        ) : React.isValidElement(icon) ? (
           icon
        ) : (
           React.createElement(icon as React.ElementType, { className: "h-7 w-7", strokeWidth: 1.5 })
        )}
      </div>
      {label && <span className="text-[10px] md:text-xs font-semibold text-zinc-300 uppercase tracking-wider">{label}</span>}
    </a>
  );
}
