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
    green: "hover:border-green-400 hover:bg-green-500/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] text-green-500 [&_svg]:text-green-500",
    blue: "hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] text-blue-500 [&_svg]:text-blue-500",
    teal: "hover:border-teal-400 hover:bg-teal-500/10 hover:shadow-[0_0_15px_rgba(20,184,166,0.4)] text-teal-500 [&_svg]:text-teal-500"
  };

  const borderStyles = "border border-white/10 bg-white/5 rounded-xl";
  const baseHover = "transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] group";

  return (
    <a 
      href={url || "#"} 
      target={url ? "_blank" : "_self"}
      rel={url ? "noopener noreferrer" : ""}
      className={`flex flex-col items-center justify-center p-3 gap-2 text-center ${borderStyles} ${baseHover} ${colorStyles[accentColor]} ${className}`}
    >
      <div className="h-[42px] w-[42px] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 drop-shadow-md group-hover:drop-shadow-[0_0_8px_currentColor]">
        {typeof icon === 'string' ? (
           <span className="text-2xl font-bold font-sans tracking-tighter">{icon}</span>
        ) : React.isValidElement(icon) ? (
           icon
        ) : (
           React.createElement(icon as React.ElementType, { className: "h-[31px] w-[31px]", strokeWidth: 1.5 })
        )}
      </div>
      {label && <span className="text-[10px] md:text-xs font-semibold text-zinc-300 uppercase tracking-wider">{label}</span>}
    </a>
  );
}
