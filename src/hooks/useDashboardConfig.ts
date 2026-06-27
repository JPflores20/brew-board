/**
 * @file useDashboardConfig.ts
 * @description Hook para administrar la configuración de los paneles del dashboard.
 * Permite cargar y guardar la disposición de las tarjetas (cards) usando Firebase Firestore.
 */
import { useState, useEffect, useCallback } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * Interfaz que define la estructura de una tarjeta de configuración.
 */
export interface CardConfig {
  id: string;
  label: string;
  url?: string;
}

/**
 * Interfaz que define la estructura del panel completo con múltiples tarjetas.
 */
export interface PanelConfig {
  cards: CardConfig[];
}

// Configuraciones por defecto para cada panel en caso de no existir datos remotos
const DEFAULTS: Record<string, CardConfig[]> = {
  procesos: [
    { id: "higiene", label: "Higiene" },
    { id: "materias-primas", label: "Materias Primas" },
    { id: "boc", label: "B.O.C (Breawing Operator Control)", url: "https://breawing-operator-control.web.app/" },
    { id: "tccs", label: "TCCs" },
    { id: "filtros-bbts", label: "Filtros-BBTs" },
    { id: "blender", label: "Blender" },
    { id: "precision-brewing", label: "Precisión Brewing" },
    { id: "agenda-purgas", label: "Agenda de Purgas", url: "https://craft-brew-insight-137b8.web.app/login" },
    { id: "prospectos", label: "Prospectos" },
    { id: "pruebas", label: "Pruebas" },
  ],
  mantenimiento: [
    { id: "planificacion", label: "Planificación" },
    { id: "capacidades", label: "Capacidades" },
    { id: "ato", label: "ATO" },
    { id: "efectividad", label: "Efectividad-Eficiencia" },
    { id: "grafana-mant", label: "Grafana" },
    { id: "talleres", label: "Talleres de Mantenimiento" },
    { id: "costos", label: "Costos" },
  ],
  vpo: [
    { id: "guardian", label: "GUARDIAN", url: "https://guardian.ab-inbev.com/home" },
    { id: "interaction-log", label: "Interaction Log", url: "https://supplyportal.ab-inbev.com/login/sso_login.asp" },
    { id: "acadia", label: "Acadia", url: "https://ab-inbev.acadia.sysalli.com/browse/" },
    { id: "splan", label: "Splan" },
    { id: "autonomia", label: "Autonomía", url: "https://preview-bbe71.web.app/" },
    { id: "core", label: "Core" },
    { id: "suite360", label: "Suite 360" },
    { id: "brewinsights", label: "Brewinsights", url: "https://brew-insights.web.app/login" },
    { id: "grafana-vpo", label: "Grafana" },
    { id: "sorba", label: "Sorba" },
    { id: "fms", label: "FMS" },
    { id: "gops", label: "GOPs" },
    { id: "pro-one-view", label: "PRO ONE VIEW", url: "https://safety-map-907c2.web.app" },
    { id: "sap", label: "SAP", url: "https://azuevp04.modelo.gmodelo.com.mx/irj/portal?NavigationTarget=navurl://334834ed11204abf6f9fb249edec621b&NavMode=10&sap-ie=EDGE" },
  ],
};

/**
 * Hook principal para obtener y actualizar la configuración de un panel específico.
 * @param panel - Nombre del panel a gestionar ("procesos", "mantenimiento" o "vpo").
 * @returns Objeto con las tarjetas configuradas, estado de carga y función para guardar cambios.
 */
export function useDashboardConfig(panel: "procesos" | "mantenimiento" | "vpo") {
  // Estado para mantener la configuración actual de las tarjetas
  const [cards, setCards] = useState<CardConfig[]>(DEFAULTS[panel]);
  // Estado que indica si se están obteniendo los datos desde Firestore
  const [loading, setLoading] = useState(true);

  // Efecto para cargar la configuración desde Firestore al montar el hook
  useEffect(() => {
    const ref = doc(db, "dashboardConfig", panel);
    getDoc(ref).then((snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data?.cards && Array.isArray(data.cards)) {
          // Asegurar que las tarjetas nuevas (como SAP) se agreguen a las configuraciones existentes
          // para no perder elementos agregados recientemente en DEFAULTS
          const existingIds = new Set(data.cards.map(c => c.id));
          const missingCards = DEFAULTS[panel].filter(c => !existingIds.has(c.id));
          setCards([...data.cards, ...missingCards]);
        }
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [panel]);

  /**
   * Guarda una nueva distribución de tarjetas en Firestore y actualiza el estado local.
   * @param newCards - Nuevo arreglo de tarjetas a persistir.
   */
  const saveCards = useCallback(async (newCards: CardConfig[]) => {
    setCards(newCards);
    const ref = doc(db, "dashboardConfig", panel);
    await setDoc(ref, { cards: newCards }, { merge: true });
  }, [panel]);

  return { cards, loading, saveCards };
}
