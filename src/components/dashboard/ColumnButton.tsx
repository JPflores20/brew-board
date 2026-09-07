import React, { useState, useRef, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { GripVertical } from 'lucide-react';

/**
 * Propiedades requeridas y opcionales para configurar el componente ColumnButton.
 */
interface ColumnButtonProps {
  icon: LucideIcon | string | React.ReactNode;
  label: string;
  url?: string;
  accentColor: 'green' | 'blue' | 'teal' | 'red' | 'sky' | 'zinc' | 'orange' | 'purple' | 'yellow';
  className?: string;
  isWide?: boolean;
  editMode?: boolean;
  onEdit?: (newLabel: string, newUrl?: string) => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnter?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

/**
 * Componente de botón interactivo utilizado en las columnas del dashboard.
 * Permite configurarse como un enlace normal o interactuar con un modo de edición (cambiar nombre, URL y drag & drop).
 *
 * @param {ColumnButtonProps} props - Propiedades del componente.
 * @returns {JSX.Element} El botón de columna renderizado.
 */
export function ColumnButton({
  icon, label, url, accentColor, className = "", isWide = false,
  editMode, onEdit, draggable, onDragStart, onDragEnter, onDragOver, onDrop, onDragEnd
}: ColumnButtonProps) {

  // Estado local para controlar si el botón está en modo de edición interactivo
  const [editing, setEditing] = useState(false);
  // Estado temporal para el nombre y URL mientras se editan
  const [tempLabel, setTempLabel] = useState(label);
  const [tempUrl, setTempUrl] = useState(url || "");
  const inputRef = useRef<HTMLInputElement>(null);

  // Sincronizar el estado de edición con las propiedades externas
  useEffect(() => {
    if (!editMode) {
      setEditing(false);
      setTempLabel(label);
      setTempUrl(url || "");
    }
  }, [editMode, label, url]);

  // Escuchar eventos globales para cerrar otros menús o forzar el guardado
  useEffect(() => {
    const handleCloseOthers = () => {
      setEditing(false);
      setTempLabel(label);
      setTempUrl(url || "");
    };

    const handleCommitAll = () => {
      if (editing) {
        setEditing(false);
        const finalLabel = tempLabel.trim() || label;
        const finalUrl = tempUrl.trim();
        onEdit?.(finalLabel, finalUrl);
      }
    };

    window.addEventListener('close-other-edits', handleCloseOthers);
    window.addEventListener('commit-all-edits', handleCommitAll);
    
    return () => {
      window.removeEventListener('close-other-edits', handleCloseOthers);
      window.removeEventListener('commit-all-edits', handleCommitAll);
    };
  }, [label, url, editing, tempLabel, tempUrl, onEdit]);

  const colorStyles: Record<string, string> = {
    green: "hover:border-green-400 hover:bg-green-500/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] text-green-500 [&_svg]:text-green-500",
    blue: "hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] text-blue-500 [&_svg]:text-blue-500",
    teal: "hover:border-teal-400 hover:bg-teal-500/10 hover:shadow-[0_0_15px_rgba(20,184,166,0.4)] text-teal-500 [&_svg]:text-teal-500",
    red: "hover:border-red-400 hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] text-red-500 [&_svg]:text-red-500",
    sky: "hover:border-sky-400 hover:bg-sky-500/10 hover:shadow-[0_0_15px_rgba(14,165,233,0.4)] text-sky-500 [&_svg]:text-sky-500",
    zinc: "hover:border-zinc-400 hover:bg-zinc-500/10 hover:shadow-[0_0_15px_rgba(161,161,170,0.4)] text-zinc-400 [&_svg]:text-zinc-400",
    orange: "hover:border-orange-400 hover:bg-orange-500/10 hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] text-orange-500 [&_svg]:text-orange-500",
    purple: "hover:border-purple-400 hover:bg-purple-500/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] text-purple-500 [&_svg]:text-purple-500",
    yellow: "hover:border-yellow-400 hover:bg-yellow-500/10 hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] text-yellow-500 [&_svg]:text-yellow-500"
  };

  const popoverBorder: Record<string, string> = {
    green: "border-green-500/60",
    blue: "border-blue-500/60",
    teal: "border-teal-500/60",
    red: "border-red-500/60",
    sky: "border-sky-500/60",
    zinc: "border-zinc-500/60",
    orange: "border-orange-500/60",
    purple: "border-purple-500/60",
    yellow: "border-yellow-500/60",
  };

  const inputFocus: Record<string, string> = {
    green: "focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50",
    blue: "focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50",
    teal: "focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50",
    red: "focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50",
    sky: "focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50",
    zinc: "focus:border-zinc-500/50 focus:ring-1 focus:ring-zinc-500/50",
    orange: "focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50",
    purple: "focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50",
    yellow: "focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50",
  };

  const saveBtn: Record<string, string> = {
    green: "bg-green-600 hover:bg-green-500 shadow-green-900/50",
    blue: "bg-blue-600 hover:bg-blue-500 shadow-blue-900/50",
    teal: "bg-teal-600 hover:bg-teal-500 shadow-teal-900/50",
    red: "bg-red-600 hover:bg-red-500 shadow-red-900/50",
    sky: "bg-sky-600 hover:bg-sky-500 shadow-sky-900/50",
    zinc: "bg-zinc-600 hover:bg-zinc-500 shadow-zinc-900/50",
    orange: "bg-orange-600 hover:bg-orange-500 shadow-orange-900/50",
    purple: "bg-purple-600 hover:bg-purple-500 shadow-purple-900/50",
    yellow: "bg-yellow-600 hover:bg-yellow-500 shadow-yellow-900/50",
  };

  const editBorderStyles: Record<string, string> = {
    green: "border-green-500/50 border-dashed",
    blue: "border-blue-500/50 border-dashed",
    teal: "border-teal-500/50 border-dashed",
    red: "border-red-500/50 border-dashed",
    sky: "border-sky-500/50 border-dashed",
    zinc: "border-zinc-500/50 border-dashed",
    orange: "border-orange-500/50 border-dashed",
    purple: "border-purple-500/50 border-dashed",
    yellow: "border-yellow-500/50 border-dashed",
  };

  const borderStyles = editMode
    ? `border ${editBorderStyles[accentColor]} bg-white/5 rounded-xl cursor-grab active:cursor-grabbing`
    : "border border-white/10 bg-white/5 rounded-xl";

  const baseHover = editMode
    ? "transition-all duration-200 group"
    : "transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] group";

  // Manejador para iniciar la edición tras hacer doble clic
  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!editMode) return;
    e.preventDefault();
    // Emitir evento para cerrar otras ventanas de edición abiertas
    window.dispatchEvent(new CustomEvent('close-other-edits'));
    
    setEditing(true);
    setTempLabel(label);
    setTempUrl(url || "");
    setTimeout(() => inputRef.current?.select(), 50);
  };

  // Guarda los cambios realizados en el modo de edición
  const commitEdit = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setEditing(false);
    const finalLabel = tempLabel.trim() || label;
    const finalUrl = tempUrl.trim();
    onEdit?.(finalLabel, finalUrl);
  };

  // Cancela la edición y restaura los valores originales
  const cancelEdit = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setEditing(false);
    setTempLabel(label);
    setTempUrl(url || "");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") cancelEdit();
  };

  const content = (
    <>
      {/* Grip icon in edit mode */}
      {editMode && (
        <div className="absolute top-2 left-2 opacity-40 group-hover:opacity-80 transition-opacity">
          <GripVertical className="h-3 w-3 text-zinc-400" />
        </div>
      )}

      {/* Link status indicator */}
      <div className="absolute top-2 right-2" title={url ? "Link asignado" : "Sin link asignado"}>
        <div className={`w-2 h-2 rounded-full ${url ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]'}`} />
      </div>

      <div className={`${isWide ? 'px-2' : 'h-[32px] w-[32px] md:h-[36px] md:w-[36px]'} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 drop-shadow-md group-hover:drop-shadow-[0_0_8px_currentColor]`}>
        {typeof icon === 'string' ? (
          <span className="text-xl md:text-2xl font-bold font-sans tracking-tighter">{icon}</span>
        ) : React.isValidElement(icon) ? (
          icon
        ) : (
          React.createElement(icon as React.ElementType, { className: "h-[20px] w-[20px] md:h-[24px] md:w-[24px]", strokeWidth: 1.5 })
        )}
      </div>

      {/* Normal Label */}
      {!isWide && label && (
        <span
          className={`text-[8.5px] md:text-[9.5px] leading-tight font-semibold uppercase tracking-wider ${editMode ? "text-zinc-200 underline decoration-dashed decoration-zinc-600 underline-offset-2" : "text-zinc-300"}`}
          title={editMode ? "Doble clic para editar" : undefined}
        >
          {label}
        </span>
      )}

      {/* Expanded Edit Popover */}
      {editing && (
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] p-5 rounded-2xl z-50 flex flex-col gap-4 bg-[#0a192f] border-2 shadow-[0_0_50px_rgba(0,0,0,0.95)] ${popoverBorder[accentColor]}`}
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={(e) => e.stopPropagation()}
          draggable={false}
          onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onDragOver={(e) => e.stopPropagation()}
          cursor-default
        >
          <div className="flex flex-col gap-1.5 text-left cursor-default">
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Nombre de la Tarjeta</label>
            <input
              ref={inputRef}
              value={tempLabel}
              onChange={(e) => setTempLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nombre"
              className={`w-full text-sm font-semibold bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none ${inputFocus[accentColor]}`}
            />
          </div>
          <div className="flex flex-col gap-1.5 text-left cursor-default">
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Enlace (URL)</label>
            <input
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="https://..."
              className={`w-full text-sm bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none ${inputFocus[accentColor]}`}
            />
          </div>
          <div className="flex justify-end gap-3 mt-1 cursor-default">
            <button onClick={cancelEdit} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-1.5 px-4 rounded-lg text-xs font-semibold transition-colors">Cancelar</button>
            <button onClick={commitEdit} className={`text-white py-1.5 px-4 rounded-lg text-xs font-bold shadow-lg transition-colors ${saveBtn[accentColor]}`}>Guardar</button>
          </div>
        </div>
      )}
    </>
  );

  if (editMode) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center p-2 gap-1 md:gap-1.5 text-center ${borderStyles} ${baseHover} ${colorStyles[accentColor]} ${className}`}
        draggable={draggable}
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
        onDoubleClick={handleDoubleClick}
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={url || "#"}
      target={url ? "_blank" : "_self"}
      rel={url ? "noopener noreferrer" : ""}
      className={`relative flex flex-col items-center justify-center p-2 gap-1 md:gap-1.5 text-center ${borderStyles} ${baseHover} ${colorStyles[accentColor]} ${className}`}
    >
      {content}
    </a>
  );
}
