import React, { useRef, useState, useEffect } from "react";
import { ColumnButton } from "./ColumnButton";
import {
  Droplet, Leaf, Database, Filter, Target,
  Calendar, BarChart2, ClipboardList, Gauge, Settings, PenTool,
  Shield, MessageSquare, Hexagon, Circle, Cog, CalendarClock,
  Users, FlaskConical, Layers, ListChecks, DollarSign, Monitor, Wrench, Wheat, Map, Flame, Landmark, BookOpen, Eye, Zap, Truck, CloudRain, Anchor
} from "lucide-react";
import { GrafanaIcon } from "./GrafanaIcon";
import { SorbaIcon } from "./SorbaIcon";
import { TankIcon } from "./TankIcon";
import { FilterBBTIcon } from "./FilterBBTIcon";
import { GrainIcon } from "./GrainIcon";
import { motion } from "framer-motion";
import { useDashboardConfig, type CardConfig, type ButtonConfig, type PanelName } from "@/hooks/useDashboardConfig";

function EditableBottomButton({ 
  button, accentColor, btnStyles, flexClass, editMode, onEdit 
}: { 
  button: ButtonConfig, accentColor: string, btnStyles: string, flexClass: string, editMode: boolean, onEdit: (id: string, lbl: string, url: string) => void 
}) {
  const [editing, setEditing] = useState(false);
  const [tempLabel, setTempLabel] = useState(button.label);
  const [tempUrl, setTempUrl] = useState(button.url || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editMode) {
      setEditing(false);
      setTempLabel(button.label);
      setTempUrl(button.url || "");
    }
  }, [editMode, button]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!editMode) return;
    e.preventDefault();
    setEditing(true);
    setTempLabel(button.label);
    setTempUrl(button.url || "");
    setTimeout(() => inputRef.current?.select(), 50);
  };

  const commitEdit = () => {
    setEditing(false);
    onEdit(button.id, tempLabel.trim() || button.label, tempUrl.trim());
  };

  const cancelEdit = () => {
    setEditing(false);
    setTempLabel(button.label);
    setTempUrl(button.url || "");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") cancelEdit();
  };

  const popoverBorder: Record<string, string> = { green: "border-green-500/60", blue: "border-blue-500/60", teal: "border-teal-500/60" };
  const inputFocus: Record<string, string> = { green: "focus:border-green-500/50", blue: "focus:border-blue-500/50", teal: "focus:border-teal-500/50" };
  const saveBtn: Record<string, string> = { green: "bg-green-600 hover:bg-green-500", blue: "bg-blue-600 hover:bg-blue-500", teal: "bg-teal-600 hover:bg-teal-500" };

  const content = (
    <>
      <div className="absolute top-2 right-2" title={button.url ? "Link asignado" : "Sin link asignado"}>
        <div className={`w-2 h-2 rounded-full ${button.url ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]'}`} />
      </div>
      <BarChart2 className="h-5 w-5" /> {button.label}
      {editing && (
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] p-5 rounded-2xl z-50 flex flex-col gap-4 bg-[#0a192f] border-2 shadow-[0_0_50px_rgba(0,0,0,0.95)] ${popoverBorder[accentColor]}`}
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={(e) => e.stopPropagation()}
          style={{ cursor: 'default' }}
        >
          <div className="flex flex-col gap-1.5 text-left" style={{ cursor: 'default' }}>
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Nombre</label>
            <input
              ref={inputRef}
              value={tempLabel}
              onChange={(e) => setTempLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`w-full text-sm bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:ring-1 ${inputFocus[accentColor]}`}
            />
          </div>
          <div className="flex flex-col gap-1.5 text-left" style={{ cursor: 'default' }}>
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Enlace (URL)</label>
            <input
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`w-full text-sm bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:ring-1 ${inputFocus[accentColor]}`}
            />
          </div>
          <div className="flex justify-end gap-3 mt-1" style={{ cursor: 'default' }}>
            <button onClick={cancelEdit} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-1.5 px-4 rounded-lg text-xs font-semibold">Cancelar</button>
            <button onClick={commitEdit} className={`text-white py-1.5 px-4 rounded-lg text-xs font-bold ${saveBtn[accentColor]}`}>Guardar</button>
          </div>
        </div>
      )}
    </>
  );

  if (editMode) {
    return (
      <div onDoubleClick={handleDoubleClick} className={`relative ${flexClass} py-4 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${btnStyles}`}>
        {content}
      </div>
    );
  }

  return (
    <a href={button.url || "#"} target={button.url ? "_blank" : "_self"} className={`relative ${flexClass} py-4 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${btnStyles}`}>
      {content}
    </a>
  );
}

// Mapa fijo de id a icono.
const ICON_MAP: Record<string, React.ElementType | React.ReactNode> = {
  // Seguridad
  "fms": Layers,
  "guardian": (props: any) => <div className="border-2 border-current rounded-full w-7 h-7 flex items-center justify-center"><Shield className="w-4 h-4" /></div>,
  "seguridad-territorial": Shield,
  "monitoreos-seguridad": Monitor,
  "dashboards-seguridad": BarChart2,
  "supply-training": BookOpen,
  // Gente y Gestion
  "autonomia": (props: any) => <div className="border-2 border-current rounded-full w-7 h-7 flex items-center justify-center font-bold text-xs">AU</div>,
  "personal-ctrl": Users,
  "menu-reportes-people": ClipboardList,
  "interaction-log": MessageSquare,
  "splan": (props: any) => <div className="border-2 border-current rounded-full w-7 h-7 flex items-center justify-center font-bold text-xs">SP</div>,
  "acadia": (props: any) => <div className="border-2 border-current rounded-full w-7 h-7 flex items-center justify-center font-bold">A</div>,
  "pilares": Landmark,
  "usabilidad-vpo": Cog,
  "gops": ListChecks,
  "estrategia": Target,
  "farol-kpis": BarChart2,
  "evolucion-vpo": BarChart2,
  "pdca": (props: any) => <div className="border-2 border-current rounded-full w-7 h-7 flex items-center justify-center font-bold text-[8px] tracking-tighter">PDCA</div>,
  // Calidad
  "pro-one-view": Map,
  "cmp": Settings,
  "pml-cleanpro": Droplet,
  "precision-brewing": Target,
  "core": Hexagon,
  "suite360": (props: any) => <div className="border-2 border-current rounded-full w-7 h-7 flex items-center justify-center"></div>,
  "pts": Target,
  "sensory-one": Eye,
  "prospectos-pruebas": FlaskConical,
  // Elaboracion
  "brewinsights": BarChart2,
  "quas": ClipboardList,
  "analisis-kpis-calidad": BarChart2,
  "ctrl-coctos": Flame,
  "ctrl-tccs": Database,
  "smart-yeast": FlaskConical,
  "cmf": Settings,
  "ctrl-filtros-cerveza": Filter,
  "ctrl-bbts": FilterBBTIcon,
  // Mantenimiento
  "capacity": BarChart2,
  "kpis-mantenimiento": BarChart2,
  "talleres": Wrench,
  "planeacion": Calendar,
  "ctrl-costos": DollarSign,
  "ato": ClipboardList,
  "grafana": GrafanaIcon,
  "sorba": SorbaIcon,
  "ctrol-fugas": Wrench,
  // Logistica
  "sap": "SAP",
  "control-materias-primas": Wheat,
  "materias-aux-quimicos": FlaskConical,
  "inve": Database,
  "materias-aux-cfrios": Settings,
  "blender": TankIcon,
  // Ambiental
  "ryncs": Settings,
  "ctrol-descargas": Droplet,
  "analisis-kpis-ambientales": BarChart2,
  "sorba-ollas": SorbaIcon,
};

interface PanelProps {
  title: string;
  accentColor: "green" | "blue" | "teal" | "red" | "sky" | "zinc" | "orange" | "purple" | "yellow";
  headerIcon: React.ReactNode;
  cards: CardConfig[];
  buttons: ButtonConfig[];
  editMode: boolean;
  onReorder: (newCards: CardConfig[]) => void;
  onEditCard: (id: string, newLabel: string, newUrl?: string) => void;
  onEditButton: (id: string, newLabel: string, newUrl: string) => void;
  gridCols?: string;
  footer?: React.ReactNode;
  delay: number;
}

function PanelColumn({
  title, accentColor, headerIcon, cards, buttons, editMode,
  onReorder, onEditCard, onEditButton, gridCols = "grid-cols-2 lg:grid-cols-3",
  footer, delay
}: PanelProps) {
  const dragItem = useRef<number | null>(null);
  const lastSwapTime = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const borderColor: Record<string, string> = {
    green: "border-green-500/20 hover:border-green-500/40",
    blue: "border-blue-500/20 hover:border-blue-500/40",
    teal: "border-teal-500/20 hover:border-teal-500/40",
    red: "border-red-500/20 hover:border-red-500/40",
    sky: "border-sky-500/20 hover:border-sky-500/40",
    zinc: "border-zinc-500/20 hover:border-zinc-500/40",
    orange: "border-orange-500/20 hover:border-orange-500/40",
    purple: "border-purple-500/20 hover:border-purple-500/40",
    yellow: "border-yellow-500/20 hover:border-yellow-500/40",
  };

  const accentBar: Record<string, string> = {
    green: "bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)]",
    blue: "bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]",
    teal: "bg-teal-500 shadow-[0_0_20px_rgba(20,184,166,0.8)]",
    red: "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]",
    sky: "bg-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.8)]",
    zinc: "bg-zinc-400 shadow-[0_0_20px_rgba(161,161,170,0.8)]",
    orange: "bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)]",
    purple: "bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)]",
    yellow: "bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.8)]",
  };

  const btnStyles: Record<string, string> = {
    green: "border-green-500/30 text-green-500 hover:bg-green-500/10 hover:border-green-500/60 shadow-[0_0_10px_rgba(34,197,94,0.1)] hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]",
    blue: "border-blue-500/30 text-blue-500 hover:bg-blue-500/10 hover:border-blue-500/60 shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]",
    teal: "border-teal-500/30 text-teal-500 hover:bg-teal-500/10 hover:border-teal-500/60 shadow-[0_0_10px_rgba(20,184,166,0.1)] hover:shadow-[0_0_15px_rgba(20,184,166,0.2)]",
    red: "border-red-500/30 text-red-500 hover:bg-red-500/10 hover:border-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.1)] hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]",
    sky: "border-sky-500/30 text-sky-500 hover:bg-sky-500/10 hover:border-sky-500/60 shadow-[0_0_10px_rgba(14,165,233,0.1)] hover:shadow-[0_0_15px_rgba(14,165,233,0.2)]",
    zinc: "border-zinc-500/30 text-zinc-400 hover:bg-zinc-500/10 hover:border-zinc-500/60 shadow-[0_0_10px_rgba(161,161,170,0.1)] hover:shadow-[0_0_15px_rgba(161,161,170,0.2)]",
    orange: "border-orange-500/30 text-orange-500 hover:bg-orange-500/10 hover:border-orange-500/60 shadow-[0_0_10px_rgba(249,115,22,0.1)] hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]",
    purple: "border-purple-500/30 text-purple-500 hover:bg-purple-500/10 hover:border-purple-500/60 shadow-[0_0_10px_rgba(168,85,247,0.1)] hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]",
    yellow: "border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 hover:border-yellow-500/60 shadow-[0_0_10px_rgba(234,179,8,0.1)] hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]",
  };

  const handleDragStart = (idx: number) => (e: React.DragEvent) => {
    dragItem.current = idx;
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => setIsDragging(true), 0);
  };

  const handleDragEnter = (idx: number) => (e: React.DragEvent) => {
    e.preventDefault();
    if (dragItem.current === null) return;
    if (dragItem.current === idx) return;

    const now = Date.now();
    if (now - lastSwapTime.current < 250) return;
    lastSwapTime.current = now;

    const newCards = [...cards];
    const [moved] = newCards.splice(dragItem.current, 1);
    newCards.splice(idx, 0, moved);
    dragItem.current = idx;
    onReorder(newCards);
  };

  const handleDragOver = (idx: number) => (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragItem.current = null;
    setIsDragging(false);
  };

  const handleDragEnd = () => {
    dragItem.current = null;
    setIsDragging(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={`flex flex-col rounded-3xl border ${borderColor[accentColor]} bg-[#061017]/90 backdrop-blur-md p-4 sm:p-5 relative group transition-colors duration-500 shadow-2xl h-full`}
    >
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 ${accentBar[accentColor]} rounded-b-md`}></div>

      <div className="flex flex-row items-center justify-center gap-3 mb-4 mt-1">
        {headerIcon}
        <h2 className={`text-${accentColor}-500 font-bold tracking-[0.15em] text-[11px] md:text-xs uppercase`}>{title}</h2>
      </div>

      <div className={`grid ${gridCols} gap-2 mb-2 flex-1`}>
        {cards.map((card, idx) => {
          const iconDef = ICON_MAP[card.id];
          const isReactEl = React.isValidElement(iconDef);
          const icon = isReactEl ? iconDef : (iconDef ?? Database);

          return (
            <motion.div
              layout
              key={card.id}
              className={cards.length === 1 ? "col-start-2" : ""}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <ColumnButton
                key={card.id}
                accentColor={accentColor}
                icon={icon as any}
                label={card.label}
                url={card.url}
                editMode={editMode}
                onEdit={(newLabel, newUrl) => onEditCard(card.id, newLabel, newUrl)}
                draggable={editMode}
                onDragStart={handleDragStart(idx)}
                onDragEnter={handleDragEnter(idx)}
                onDragOver={handleDragOver(idx)}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
                className={editMode && isDragging && dragItem.current === idx ? "opacity-50 ring-2 ring-yellow-400 scale-95 shadow-xl" : ""}
              />
            </motion.div>
          );
        })}
      </div>

      {footer}

      {buttons && buttons.length > 0 && (
        <div className={`flex gap-4 mt-auto ${buttons.length === 1 ? 'flex-col' : ''}`}>
          {buttons.map(btn => (
            <EditableBottomButton
              key={btn.id}
              button={btn}
              accentColor={accentColor}
              btnStyles={btnStyles[accentColor]}
              flexClass={buttons.length > 1 ? "flex-1" : "w-full"}
              editMode={editMode}
              onEdit={onEditButton}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

interface DashboardColumnsProps {
  editMode: boolean;
  searchQuery?: string;
}

export function DashboardColumns({ editMode, searchQuery }: DashboardColumnsProps) {
  // Hooks para cada panel
  const cSeguridad = useDashboardConfig("seguridad");
  const cGente = useDashboardConfig("gente");
  const cCalidad = useDashboardConfig("calidad");
  const cElaboracion = useDashboardConfig("elaboracion");
  const cMantenimiento = useDashboardConfig("mantenimiento");
  const cLogistica = useDashboardConfig("logistica");
  const cAmbiental = useDashboardConfig("ambiental");

  // Estado local para cada panel (borradores en edición)
  const [sSeguridad, setSSeguridad] = useState<{cards: CardConfig[]|null, buttons: ButtonConfig[]|null}>({cards: null, buttons: null});
  const [sGente, setSGente] = useState<{cards: CardConfig[]|null, buttons: ButtonConfig[]|null}>({cards: null, buttons: null});
  const [sCalidad, setSCalidad] = useState<{cards: CardConfig[]|null, buttons: ButtonConfig[]|null}>({cards: null, buttons: null});
  const [sElaboracion, setSElaboracion] = useState<{cards: CardConfig[]|null, buttons: ButtonConfig[]|null}>({cards: null, buttons: null});
  const [sMantenimiento, setSMantenimiento] = useState<{cards: CardConfig[]|null, buttons: ButtonConfig[]|null}>({cards: null, buttons: null});
  const [sLogistica, setSLogistica] = useState<{cards: CardConfig[]|null, buttons: ButtonConfig[]|null}>({cards: null, buttons: null});
  const [sAmbiental, setSAmbiental] = useState<{cards: CardConfig[]|null, buttons: ButtonConfig[]|null}>({cards: null, buttons: null});

  const filterItems = <T extends { label: string }>(items: T[] | null | undefined): T[] | null => {
    if (!items) return null;
    if (!searchQuery) return items;
    const lowerQuery = searchQuery.toLowerCase();
    return items.filter(item => item.label.toLowerCase().includes(lowerQuery));
  };

  // Datos finales a renderizar (borrador o persistido), filtrados por la búsqueda
  const dSeguridad = { cards: filterItems(sSeguridad.cards ?? cSeguridad.cards), buttons: filterItems(sSeguridad.buttons ?? cSeguridad.buttons) };
  const dGente = { cards: filterItems(sGente.cards ?? cGente.cards), buttons: filterItems(sGente.buttons ?? cGente.buttons) };
  const dCalidad = { cards: filterItems(sCalidad.cards ?? cCalidad.cards), buttons: filterItems(sCalidad.buttons ?? cCalidad.buttons) };
  const dElaboracion = { cards: filterItems(sElaboracion.cards ?? cElaboracion.cards), buttons: filterItems(sElaboracion.buttons ?? cElaboracion.buttons) };
  const dMantenimiento = { cards: filterItems(sMantenimiento.cards ?? cMantenimiento.cards), buttons: filterItems(sMantenimiento.buttons ?? cMantenimiento.buttons) };
  const dLogistica = { cards: filterItems(sLogistica.cards ?? cLogistica.cards), buttons: filterItems(sLogistica.buttons ?? cLogistica.buttons) };
  const dAmbiental = { cards: filterItems(sAmbiental.cards ?? cAmbiental.cards), buttons: filterItems(sAmbiental.buttons ?? cAmbiental.buttons) };

  const hasItems = (d: { cards: CardConfig[] | null, buttons: ButtonConfig[] | null }) => {
    return (d.cards && d.cards.length > 0) || (d.buttons && d.buttons.length > 0);
  };

  const getSetters = (panel: PanelName) => {
    switch (panel) {
      case "seguridad": return { state: sSeguridad, set: setSSeguridad, conf: cSeguridad };
      case "gente": return { state: sGente, set: setSGente, conf: cGente };
      case "calidad": return { state: sCalidad, set: setSCalidad, conf: cCalidad };
      case "elaboracion": return { state: sElaboracion, set: setSElaboracion, conf: cElaboracion };
      case "mantenimiento": return { state: sMantenimiento, set: setSMantenimiento, conf: cMantenimiento };
      case "logistica": return { state: sLogistica, set: setSLogistica, conf: cLogistica };
      case "ambiental": return { state: sAmbiental, set: setSAmbiental, conf: cAmbiental };
    }
  };

  const handleReorder = (panel: PanelName, newCards: CardConfig[]) => {
    const { set } = getSetters(panel);
    set(prev => ({ ...prev, cards: newCards }));
  };

  const handleEditCard = (panel: PanelName, id: string, newLabel: string, newUrl?: string) => {
    const { state, set, conf } = getSetters(panel);
    const currentCards = state.cards ?? conf.cards;
    const newCards = currentCards.map(c => c.id === id ? { ...c, label: newLabel, url: newUrl } : c);
    set(prev => ({ ...prev, cards: newCards }));
  };

  const handleEditButton = (panel: PanelName, id: string, newLabel: string, newUrl: string) => {
    const { state, set, conf } = getSetters(panel);
    const currentButtons = state.buttons ?? conf.buttons;
    const newButtons = currentButtons.map(b => b.id === id ? { ...b, label: newLabel, url: newUrl } : b);
    set(prev => ({ ...prev, buttons: newButtons }));
  };

  // Método de guardado expuesto en el objeto window
  (window as any).__dashboardSave = async () => {
    const panels: PanelName[] = ["seguridad", "gente", "calidad", "elaboracion", "mantenimiento", "logistica", "ambiental"];
    for (const p of panels) {
      const { state, conf, set } = getSetters(p);
      if (state.cards || state.buttons) {
        await conf.saveCards(state.cards ?? conf.cards, state.buttons ?? conf.buttons);
      }
      set({ cards: null, buttons: null });
    }
  };

  (window as any).__dashboardCancel = () => {
    const panels: PanelName[] = ["seguridad", "gente", "calidad", "elaboracion", "mantenimiento", "logistica", "ambiental"];
    for (const p of panels) {
      getSetters(p).set({ cards: null, buttons: null });
    }
  };

  const col1Visible = hasItems(dSeguridad) || hasItems(dGente);
  const col2Visible = hasItems(dCalidad) || hasItems(dElaboracion);
  const col3Visible = hasItems(dMantenimiento) || hasItems(dLogistica) || hasItems(dAmbiental);
  
  const visibleCount = [col1Visible, col2Visible, col3Visible].filter(Boolean).length;

  return (
    <div className={`grid grid-cols-1 ${visibleCount === 2 ? 'md:grid-cols-2 md:max-w-[66.666%] mx-auto' : 'md:grid-cols-3'} gap-3 md:gap-4 w-full px-2 pb-6 pt-4 flex-1 items-start`}>
      
      {/* Columna 1 */}
      {col1Visible && (
        <div className={`flex flex-col gap-3 md:gap-4 ${visibleCount === 1 ? 'md:col-start-2' : ''}`}>
          {hasItems(dSeguridad) && (
            <PanelColumn
              title="Seguridad"
              accentColor="red"
              delay={0.1}
              headerIcon={
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-red-500 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 text-red-500" strokeWidth={1.5} />
                </div>
              }
          cards={dSeguridad.cards}
          buttons={dSeguridad.buttons}
          editMode={editMode}
          gridCols="grid-cols-3"
          onReorder={(c) => handleReorder("seguridad", c)}
          onEditCard={(id, lbl, url) => handleEditCard("seguridad", id, lbl, url)}
              onEditButton={(id, lbl, url) => handleEditButton("seguridad", id, lbl, url)}
            />
          )}
          
          {hasItems(dGente) && (
            <PanelColumn
              title="Gente y Gestion"
              accentColor="zinc"
              delay={0.2}
          headerIcon={
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-zinc-400 flex items-center justify-center shadow-[0_0_20px_rgba(161,161,170,0.2)]">
              <Users className="h-5 w-5 md:h-6 md:w-6 text-zinc-400" strokeWidth={1.5} />
            </div>
          }
          cards={dGente.cards}
          buttons={dGente.buttons}
          editMode={editMode}
          gridCols="grid-cols-3"
          onReorder={(c) => handleReorder("gente", c)}
          onEditCard={(id, lbl, url) => handleEditCard("gente", id, lbl, url)}
              onEditButton={(id, lbl, url) => handleEditButton("gente", id, lbl, url)}
            />
          )}
        </div>
      )}

      {/* Columna 2 */}
      {col2Visible && (
        <div className={`flex flex-col gap-3 md:gap-4 ${visibleCount === 1 ? 'md:col-start-2' : ''}`}>
          {hasItems(dCalidad) && (
            <PanelColumn
              title="Calidad"
              accentColor="blue"
              delay={0.3}
          headerIcon={
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <Target className="h-5 w-5 md:h-6 md:w-6 text-blue-500" strokeWidth={1.5} />
            </div>
          }
          cards={dCalidad.cards}
          buttons={dCalidad.buttons}
          editMode={editMode}
          gridCols="grid-cols-3"
          onReorder={(c) => handleReorder("calidad", c)}
          onEditCard={(id, lbl, url) => handleEditCard("calidad", id, lbl, url)}
              onEditButton={(id, lbl, url) => handleEditButton("calidad", id, lbl, url)}
            />
          )}

          {hasItems(dElaboracion) && (
            <PanelColumn
              title="Elaboracion"
              accentColor="sky"
              delay={0.4}
          headerIcon={
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-sky-500 flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.2)]">
              <Droplet className="h-5 w-5 md:h-6 md:w-6 text-sky-500" strokeWidth={1.5} />
            </div>
          }
          cards={dElaboracion.cards}
          buttons={dElaboracion.buttons}
          editMode={editMode}
          gridCols="grid-cols-3"
          onReorder={(c) => handleReorder("elaboracion", c)}
          onEditCard={(id, lbl, url) => handleEditCard("elaboracion", id, lbl, url)}
              onEditButton={(id, lbl, url) => handleEditButton("elaboracion", id, lbl, url)}
            />
          )}
        </div>
      )}

      {/* Columna 3 */}
      {col3Visible && (
        <div className={`flex flex-col gap-3 md:gap-4 ${visibleCount === 1 ? 'md:col-start-2' : ''}`}>
          {hasItems(dMantenimiento) && (
            <PanelColumn
              title="Mantenimiento"
              accentColor="yellow"
              delay={0.5}
          headerIcon={
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-yellow-500 flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.2)]">
              <Settings className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" strokeWidth={1.5} />
            </div>
          }
          cards={dMantenimiento.cards}
          buttons={dMantenimiento.buttons}
          editMode={editMode}
          gridCols="grid-cols-3"
          onReorder={(c) => handleReorder("mantenimiento", c)}
          onEditCard={(id, lbl, url) => handleEditCard("mantenimiento", id, lbl, url)}
              onEditButton={(id, lbl, url) => handleEditButton("mantenimiento", id, lbl, url)}
            />
          )}

          {hasItems(dLogistica) && (
            <PanelColumn
              title="Logistica"
              accentColor="orange"
              delay={0.6}
          headerIcon={
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-orange-500 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)]">
              <Truck className="h-5 w-5 md:h-6 md:w-6 text-orange-500" strokeWidth={1.5} />
            </div>
          }
          cards={dLogistica.cards}
          buttons={dLogistica.buttons}
          editMode={editMode}
          gridCols="grid-cols-3"
          onReorder={(c) => handleReorder("logistica", c)}
          onEditCard={(id, lbl, url) => handleEditCard("logistica", id, lbl, url)}
              onEditButton={(id, lbl, url) => handleEditButton("logistica", id, lbl, url)}
            />
          )}

          {hasItems(dAmbiental) && (
            <PanelColumn
              title="Ambiental"
              accentColor="green"
              delay={0.7}
          headerIcon={
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-green-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.2)]">
              <CloudRain className="h-5 w-5 md:h-6 md:w-6 text-green-500" strokeWidth={1.5} />
            </div>
          }
          cards={dAmbiental.cards}
          buttons={dAmbiental.buttons}
          editMode={editMode}
          gridCols="grid-cols-3"
          onReorder={(c) => handleReorder("ambiental", c)}
          onEditCard={(id, lbl, url) => handleEditCard("ambiental", id, lbl, url)}
              onEditButton={(id, lbl, url) => handleEditButton("ambiental", id, lbl, url)}
            />
          )}
        </div>
      )}

    </div>
  );
}
