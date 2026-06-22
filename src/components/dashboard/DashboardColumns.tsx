import { ColumnButton } from "./ColumnButton";
import { 
  Droplet, Leaf, Database, Filter, Target, 
  Calendar, BarChart2, ClipboardList, Gauge, Settings, PenTool,
  Shield, MessageSquare, Hexagon, Circle, Cog, CalendarClock
} from "lucide-react";
import { projects } from "@/lib/projects_data";
import { GrafanaIcon } from "./GrafanaIcon";
import { SorbaIcon } from "./SorbaIcon";
import { motion } from "framer-motion";

export function DashboardColumns() {
  const getUrl = (name: string) => projects.find(p => p.name.toLowerCase().includes(name.toLowerCase()))?.url;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1400px] mx-auto w-full px-4 pb-12 pt-8 flex-1">
      
      {/* Control de Procesos */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="flex flex-col rounded-[2rem] border border-green-500/20 bg-[#061017]/90 backdrop-blur-md p-6 sm:p-8 relative overflow-hidden group hover:border-green-500/40 transition-colors duration-500 shadow-2xl"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-green-500 rounded-b-md shadow-[0_0_20px_rgba(34,197,94,0.8)]"></div>
        
        <div className="flex flex-col items-center mb-8 mt-2">
           <div className="w-20 h-20 rounded-full border-2 border-green-500 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
             <Droplet className="h-10 w-10 text-green-500" strokeWidth={1.5} />
           </div>
           <h2 className="text-green-500 font-bold tracking-[0.15em] text-sm md:text-base uppercase">Control de Procesos</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8 flex-1">
          <ColumnButton accentColor="green" icon={Droplet} label="Higiene" />
          <ColumnButton accentColor="green" icon={Leaf} label="Materias Primas" />
          <ColumnButton accentColor="green" icon={Database} label="B.O.C (Breawing Operator Control)" url={getUrl("Brewing Operator")} />
          <ColumnButton accentColor="green" icon={Database} label="TCCs" />
          <ColumnButton accentColor="green" icon={Filter} label="Filtros-BBTs" />
          <ColumnButton accentColor="green" icon={Gauge} label="Blender" />
          <ColumnButton accentColor="green" icon={Target} label="Precisión Brewing" />
          <ColumnButton accentColor="green" icon={CalendarClock} label="Agenda de Purgas" url="https://craft-brew-insight-137b8.web.app/login" />
        </div>

        <button className="w-full py-4 mt-auto rounded-xl border border-green-500/30 text-green-500 font-semibold text-sm hover:bg-green-500/10 hover:border-green-500/60 flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_10px_rgba(34,197,94,0.1)] hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]">
          <BarChart2 className="h-5 w-5" /> DASHBOARD DE PROCESOS
        </button>
      </motion.div>

      {/* Mantenimiento */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
        className="flex flex-col rounded-[2rem] border border-blue-500/20 bg-[#061017]/90 backdrop-blur-md p-6 sm:p-8 relative overflow-hidden group hover:border-blue-500/40 transition-colors duration-500 shadow-2xl"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-blue-500 rounded-b-md shadow-[0_0_20px_rgba(59,130,246,0.8)]"></div>
        
        <div className="flex flex-col items-center mb-8 mt-2">
           <div className="w-20 h-20 rounded-full border-2 border-blue-500 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
             <Settings className="h-10 w-10 text-blue-500" strokeWidth={1.5} />
           </div>
           <h2 className="text-blue-500 font-bold tracking-[0.15em] text-sm md:text-base uppercase">Mantenimiento</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 flex-1">
          <ColumnButton accentColor="blue" icon={Calendar} label="Planificación" />
          <ColumnButton accentColor="blue" icon={BarChart2} label="Capacidades" />
          <ColumnButton accentColor="blue" icon={ClipboardList} label="ATO" />
          <ColumnButton accentColor="blue" icon={Gauge} label="Efectividad-Eficiencia" />
          <ColumnButton accentColor="blue" icon={GrafanaIcon} label="Grafana" />
          <ColumnButton accentColor="blue" icon={PenTool} label="Talleres de Mantenimiento" />
        </div>

        <button className="w-full py-4 mt-auto rounded-xl border border-blue-500/30 text-blue-500 font-semibold text-sm hover:bg-blue-500/10 hover:border-blue-500/60 flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <BarChart2 className="h-5 w-5" /> DASHBOARD DE MANTENIMIENTO
        </button>
      </motion.div>

      {/* VPO Digital */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        className="flex flex-col rounded-[2rem] border border-teal-500/20 bg-[#061017]/90 backdrop-blur-md p-6 sm:p-8 relative overflow-hidden group hover:border-teal-500/40 transition-colors duration-500 shadow-2xl"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-teal-500 rounded-b-md shadow-[0_0_20px_rgba(20,184,166,0.8)]"></div>
        
        <div className="flex flex-col items-center mb-8 mt-2">
           <div className="w-20 h-20 rounded-full border-2 border-teal-500 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(20,184,166,0.2)]">
             <div className="w-10 h-8 flex items-center justify-center border-2 border-teal-500 rounded">
               <span className="text-[9px] font-mono leading-none tracking-tight text-teal-500">010<br/>101</span>
             </div>
           </div>
           <h2 className="text-teal-500 font-bold tracking-[0.15em] text-sm md:text-base uppercase">VPO Digital</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4 flex-1">
          <ColumnButton accentColor="teal" icon={(props: any) => <div className="border-2 border-current rounded-full w-7 h-7 flex items-center justify-center"><Shield className="w-4 h-4" /></div>} label="Guardia" url={getUrl("guardian")} />
          <ColumnButton accentColor="teal" icon={MessageSquare} label="Interaction Log" url={getUrl("interaction")} />
          <ColumnButton accentColor="teal" icon={(props: any) => <div className="border-2 border-current rounded-full w-7 h-7 flex items-center justify-center font-bold">A</div>} label="Acadia" url={getUrl("acadia")} />
          <ColumnButton accentColor="teal" icon={(props: any) => <div className="border-2 border-current rounded-full w-7 h-7 flex items-center justify-center font-bold">S</div>} label="Dashboard Autonomía" url={getUrl("autonomía")} />
          <ColumnButton accentColor="teal" icon={Hexagon} label="Core" />
          <ColumnButton accentColor="teal" icon={(props: any) => <div className="border-2 border-current rounded-full w-7 h-7 flex items-center justify-center"></div>} label="Suite 360" />
          <ColumnButton accentColor="teal" icon={BarChart2} label="Brewinsights" url={getUrl("insights")} />
          <ColumnButton accentColor="teal" icon={GrafanaIcon} label="Grafana" />
          <ColumnButton accentColor="teal" icon={SorbaIcon} label="Sorba" />
        </div>
        
        <div className="w-full flex justify-center pb-2">
            <ColumnButton className="w-1/2 py-2 flex-row border-none shadow-none bg-transparent hover:bg-teal-500/10" accentColor="teal" icon={(props: any) => <div className="bg-teal-900/60 text-teal-400 font-bold px-4 py-2 rounded-lg border border-teal-500/30 tracking-widest text-lg">SAP</div>} label="" url={getUrl("sap")} />
        </div>
      </motion.div>

    </div>
  );
}
