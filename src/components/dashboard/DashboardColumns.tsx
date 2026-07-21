import React, { useRef, useState } from "react";
import { ColumnButton } from "./ColumnButton";
import {
  Droplet, Leaf, Database, Filter, Target,
  Calendar, BarChart2, ClipboardList, Gauge, Settings, PenTool,
  Shield, MessageSquare, Hexagon, Circle, Cog, CalendarClock,
  Users, FlaskConical, Layers, ListChecks, DollarSign, Monitor, Wrench, Wheat, Map, Flame, Landmark, BookOpen
} from "lucide-react";
import { GrafanaIcon } from "./GrafanaIcon";
import { SorbaIcon } from "./SorbaIcon";
import { TankIcon } from "./TankIcon";
import { FilterBBTIcon } from "./FilterBBTIcon";
import { GrainIcon } from "./GrainIcon";
import { motion } from "framer-motion";
import { useDashboardConfig, type CardConfig } from "@/hooks/useDashboardConfig";

// Mapa fijo de id a icono. Los iconos no se guardan en la base de datos (Firestore),
// solo el nombre (label) y el orden de los elementos.
const ICON_MAP: Record<string, React.ElementType | React.ReactNode> = {
  "higiene": Droplet,
  "materias-primas": Wheat,
  "boc": Monitor,
  "tccs": Database,
  "filtros": Filter,
  "bbts": FilterBBTIcon,
  "blender": TankIcon,
  "precision-brewing": Target,
  "agenda-purgas": CalendarClock,
  "prospectos": Users,
  "pruebas": FlaskConical,
  "planificacion": Calendar,
  "capacidades": BarChart2,
  "ato": ClipboardList,
  "efectividad": Gauge,
  "cocimientos": Flame,
  "talleres": Wrench,
  "costos": DollarSign,
  "guardian": (props: any) => <div className="border-2 border-current rounded-full w-7 h-7 flex items-center justify-center"><Shield className="w-4 h-4" /></div>,
  "interaction-log": MessageSquare,
  "acadia": (props: any) => <div className="border-2 border-current rounded-full w-7 h-7 flex items-center justify-center font-bold">A</div>,
  "splan": (props: any) => <div className="border-2 border-current rounded-full w-7 h-7 flex items-center justify-center font-bold text-xs">SP</div>,
  "autonomia": (props: any) => <div className="border-2 border-current rounded-full w-7 h-7 flex items-center justify-center font-bold text-xs">AU</div>,
  "pilares": Landmark,
  "etos": BookOpen,
  "core": Hexagon,
  "suite360": (props: any) => <div className="border-2 border-current rounded-full w-7 h-7 flex items-center justify-center"></div>,
  "brewinsights": BarChart2,
  "grafana-vpo": GrafanaIcon,
  "sorba": SorbaIcon,
  "fms": Layers,
  "gops": ListChecks,
  "pro-one-view": Map,
  "sap": "SAP",
  "pml-cleanpro": Droplet,
};

/**
 * Propiedades para configurar una columna/panel individual en el dashboard.
 */
interface PanelProps {
  title: string;
  accentColor: "green" | "blue" | "teal";
  headerIcon: React.ReactNode;
  cards: CardConfig[];
  editMode: boolean;
  onReorder: (newCards: CardConfig[]) => void;
  onEditCard: (id: string, newLabel: string, newUrl?: string) => void;
  dashboardButtonLabel: string;
  dashboardButtonUrl?: string;
  secondaryButtonLabel?: string;
  secondaryButtonUrl?: string;
  gridCols?: string;
  footer?: React.ReactNode;
  delay: number;
}

/**
 * Componente que representa un panel o columna en el dashboard.
 * Maneja la lógica de arrastrar y soltar (drag & drop) para reordenar sus tarjetas internas.
 *
 * @param {PanelProps} props - Propiedades del componente de panel.
 * @returns {JSX.Element} El panel renderizado con sus respectivas tarjetas.
 */
function PanelColumn({
  title, accentColor, headerIcon, cards, editMode,
  onReorder, onEditCard, dashboardButtonLabel, dashboardButtonUrl, secondaryButtonLabel, secondaryButtonUrl, gridCols = "grid-cols-2 lg:grid-cols-3",
  footer, delay
}: PanelProps) {
  // Referencia al elemento actualmente siendo arrastrado
  const dragItem = useRef<number | null>(null);
  // Control de tiempo para evitar parpadeos visuales al hacer múltiples intercambios (swaps) rápidos
  const lastSwapTime = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const borderColor = {
    green: "border-green-500/20 hover:border-green-500/40",
    blue: "border-blue-500/20 hover:border-blue-500/40",
    teal: "border-teal-500/20 hover:border-teal-500/40",
  }[accentColor];

  const accentBar = {
    green: "bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)]",
    blue: "bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]",
    teal: "bg-teal-500 shadow-[0_0_20px_rgba(20,184,166,0.8)]",
  }[accentColor];

  const btnStyles = {
    green: "border-green-500/30 text-green-500 hover:bg-green-500/10 hover:border-green-500/60 shadow-[0_0_10px_rgba(34,197,94,0.1)] hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]",
    blue: "border-blue-500/30 text-blue-500 hover:bg-blue-500/10 hover:border-blue-500/60 shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]",
    teal: "border-teal-500/30 text-teal-500 hover:bg-teal-500/10 hover:border-teal-500/60 shadow-[0_0_10px_rgba(20,184,166,0.1)] hover:shadow-[0_0_15px_rgba(20,184,166,0.2)]",
  }[accentColor];

  const handleDragStart = (idx: number) => (e: React.DragEvent) => {
    dragItem.current = idx;
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => setIsDragging(true), 0);
  };

  const handleDragEnter = (idx: number) => (e: React.DragEvent) => {
    e.preventDefault();
    if (dragItem.current === null) return;
    if (dragItem.current === idx) return;

    // Limitar la frecuencia de intercambios (throttle) para prevenir comportamientos erráticos en animaciones de framer-motion
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
      className={`flex flex-col rounded-[2rem] border ${borderColor} bg-[#061017]/90 backdrop-blur-md p-6 sm:p-8 relative group transition-colors duration-500 shadow-2xl`}
    >
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 ${accentBar} rounded-b-md`}></div>

      <div className="flex flex-col items-center mb-8 mt-2">
        {headerIcon}
        <h2 className={`text-${accentColor}-500 font-bold tracking-[0.15em] text-sm md:text-base uppercase`}>{title}</h2>
      </div>

      <div className={`grid ${gridCols} gap-4 mb-8 flex-1`}>
        {cards.map((card, idx) => {
          const iconDef = ICON_MAP[card.id];
          const isReactEl = React.isValidElement(iconDef);
          const icon = isReactEl ? iconDef : (iconDef ?? Database);

          return (
            <motion.div
              layout
              key={card.id}
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

      {secondaryButtonLabel ? (
        <div className="flex gap-4 mt-auto">
          <a href={dashboardButtonUrl || "#"} target={dashboardButtonUrl ? "_blank" : "_self"} className={`relative flex-1 py-4 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${btnStyles}`}>
            <div className="absolute top-2 right-2" title={dashboardButtonUrl ? "Link asignado" : "Sin link asignado"}>
              <div className={`w-2 h-2 rounded-full ${dashboardButtonUrl ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]'}`} />
            </div>
            <BarChart2 className="h-5 w-5" /> {dashboardButtonLabel}
          </a>
          <a href={secondaryButtonUrl || "#"} target={secondaryButtonUrl ? "_blank" : "_self"} className={`relative flex-1 py-4 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${btnStyles}`}>
            <div className="absolute top-2 right-2" title={secondaryButtonUrl ? "Link asignado" : "Sin link asignado"}>
              <div className={`w-2 h-2 rounded-full ${secondaryButtonUrl ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]'}`} />
            </div>
            <BarChart2 className="h-5 w-5" /> {secondaryButtonLabel}
          </a>
        </div>
      ) : (
        <a href={dashboardButtonUrl || "#"} target={dashboardButtonUrl ? "_blank" : "_self"} className={`relative w-full py-4 mt-auto rounded-xl border font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${btnStyles}`}>
          <div className="absolute top-2 right-2" title={dashboardButtonUrl ? "Link asignado" : "Sin link asignado"}>
            <div className={`w-2 h-2 rounded-full ${dashboardButtonUrl ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]'}`} />
          </div>
          <BarChart2 className="h-5 w-5" /> {dashboardButtonLabel}
        </a>
      )}
    </motion.div>
  );
}

/**
 * Propiedades del componente principal DashboardColumns.
 */
interface DashboardColumnsProps {
  editMode: boolean;
}

/**
 * Componente principal que agrupa las diferentes columnas del dashboard.
 * Lee la configuración desde Firestore y maneja el estado de edición global.
 *
 * @param {DashboardColumnsProps} props - Contiene un booleano para el modo de edición.
 * @returns {JSX.Element} Las columnas renderizadas.
 */
export function DashboardColumns({ editMode }: DashboardColumnsProps) {
  const procesosConfig = useDashboardConfig("procesos");
  const mantConfig = useDashboardConfig("mantenimiento");
  const vpoConfig = useDashboardConfig("vpo");

  // Estado local temporal para el modo de edición (se confirma al guardar)
  const [procesosCards, setProcesosCards] = React.useState<CardConfig[] | null>(null);
  const [mantCards, setMantCards] = React.useState<CardConfig[] | null>(null);
  const [vpoCards, setVpoCards] = React.useState<CardConfig[] | null>(null);

  // Usa el borrador local si está editando, de lo contrario, usa el estado almacenado en Firestore
  const pc = procesosCards ?? procesosConfig.cards;
  const mc = mantCards ?? mantConfig.cards;
  const vc = vpoCards ?? vpoConfig.cards;

  const handleReorder = (panel: "procesos" | "mant" | "vpo", newCards: CardConfig[]) => {
    if (panel === "procesos") setProcesosCards(newCards);
    if (panel === "mant") setMantCards(newCards);
    if (panel === "vpo") setVpoCards(newCards);
  };

  const handleEditCard = (panel: "procesos" | "mant" | "vpo", id: string, newLabel: string, newUrl?: string) => {
    const updater = (prev: CardConfig[]) =>
      prev.map((c) => (c.id === id ? { ...c, label: newLabel, url: newUrl } : c));
    if (panel === "procesos") setProcesosCards(updater(pc));
    if (panel === "mant") setMantCards(updater(mc));
    if (panel === "vpo") setVpoCards(updater(vc));
  };

  // Método de guardado expuesto en el objeto window (es llamado desde el componente Header)
  (window as any).__dashboardSave = async () => {
    if (procesosCards) await procesosConfig.saveCards(procesosCards);
    if (mantCards) await mantConfig.saveCards(mantCards);
    if (vpoCards) await vpoConfig.saveCards(vpoCards);
    setProcesosCards(null);
    setMantCards(null);
    setVpoCards(null);
  };

  (window as any).__dashboardCancel = () => {
    setProcesosCards(null);
    setMantCards(null);
    setVpoCards(null);
  };

  const getUrl = (name: string) => {
    const urls: Record<string, string> = {
      "boc": "https://breawing-operator-control.web.app/",
      "agenda-purgas": "https://craft-brew-insight-137b8.web.app/login",
      "guardian": "https://guardian.ab-inbev.com/home",
      "interaction-log": "https://supplyportal.ab-inbev.com/login/sso_login.asp",
      "acadia": "https://ab-inbev.acadia.sysalli.com/browse/",
      "autonomia": "https://preview-bbe71.web.app/",
      "brewinsights": "https://brew-insights.web.app/login",
      "pro-one-view": "https://safety-map-907c2.web.app",
      "sap": "https://azuevp04.modelo.gmodelo.com.mx/irj/portal?NavigationTarget=navurl://334834ed11204abf6f9fb249edec621b&NavMode=10&sap-ie=EDGE",
    };
    return urls[name];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4 pb-12 pt-8 flex-1">

      {/* Control de Procesos */}
      <PanelColumn
        title="Control de Procesos"
        accentColor="green"
        delay={0.1}
        headerIcon={
          <div className="w-20 h-20 rounded-full border-2 border-green-500 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
            <Droplet className="h-10 w-10 text-green-500" strokeWidth={1.5} />
          </div>
        }
        cards={pc}
        editMode={editMode}
        onReorder={(c) => handleReorder("procesos", c)}
        onEditCard={(id, lbl, url) => handleEditCard("procesos", id, lbl, url)}
        dashboardButtonLabel="DASHBOARD DE PROCESOS"
        secondaryButtonLabel="Foro KPI's"
        secondaryButtonUrl="https://app.powerbi.com/groups/me/reports/9655be36-5ae3-4b74-bf6d-af783ce57db6/3e94e11001e4795e3ce6?ctid=cef04b19-7776-4a94-b89b-375c77a8f936&experience=power-bi"
      />

      {/* Mantenimiento */}
      <PanelColumn
        title="Mantenimiento"
        accentColor="blue"
        delay={0.25}
        headerIcon={
          <div className="w-20 h-20 rounded-full border-2 border-blue-500 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <Settings className="h-10 w-10 text-blue-500" strokeWidth={1.5} />
          </div>
        }
        cards={mc}
        editMode={editMode}
        gridCols="grid-cols-2"
        onReorder={(c) => handleReorder("mant", c)}
        onEditCard={(id, lbl, url) => handleEditCard("mant", id, lbl, url)}
        dashboardButtonLabel="DASHBOARD DE MANTENIMIENTO"
        secondaryButtonLabel="Overhoald"
      />

      {/* VPO Digital */}
      <PanelColumn
        title="VPO Digital"
        accentColor="teal"
        delay={0.4}
        headerIcon={
          <div className="w-20 h-20 rounded-full border-2 border-teal-500 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(20,184,166,0.2)]">
            <div className="w-10 h-8 flex items-center justify-center border-2 border-teal-500 rounded">
              <span className="text-[9px] font-mono leading-none tracking-tight text-teal-500">010<br />101</span>
            </div>
          </div>
        }
        cards={vc}
        editMode={editMode}
        onReorder={(c) => handleReorder("vpo", c)}
        onEditCard={(id, lbl, url) => handleEditCard("vpo", id, lbl, url)}
        dashboardButtonLabel="DASHBOARD VPO DIGITAL"
        secondaryButtonLabel="DASHBOARD VISIBILIDAD VPO"
      />
    </div>
  );
}
