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

export interface ButtonConfig {
  id: string;
  label: string;
  url?: string;
}

/**
 * Interfaz que define la estructura del panel completo con múltiples tarjetas.
 */
export interface PanelConfig {
  cards: CardConfig[];
  buttons?: ButtonConfig[];
}

export type PanelName =
  | "seguridad"
  | "gente"
  | "calidad"
  | "elaboracion"
  | "mantenimiento"
  | "logistica"
  | "ambiental";

// Configuraciones por defecto para cada panel
const DEFAULTS: Record<PanelName, { cards: CardConfig[]; buttons: ButtonConfig[] }> = {
  seguridad: {
    cards: [
      {
        id: "fms",
        label: "FMS",
        url: "https://www.geomov.com/geomaq/?nstoken=7SOY%2FFbMog3%2FTQb%2FcY4WvewaTMOY9St5S36FmIGAvssHkThOMV%2F%2Bf9OfldJ1%2F3qCilyv%2B9L8eKoasOE0PATE3%2Fmmb5xCtTH1c4hfKLGaHEZe3sfzbrj3JhzsV0socw%2FJVry0iARU81cRPka1ukIEFyBBXZwNWPTqHi0Lsz7irstau4AkZIhZ1Nhvxcg9HIbW3wpxxj0OMwC%2F6U1G4k0dQPjhVeFl6HYnBA1GrwITDWm%2FR2eB1xocm6WRtQrvlDF0RaynXhgEO38psXjPjMq3aOOgyKVYK%2BrjUsWhgLEPbCuuW%2Fj59OlUL%2B4kcg90%2B5rHuivmg4xTlg6wes3bjL9YfDdRusQ5%2F9Oa9BMVJ%2Bj3xzxuSsnqrwHXFWW4xbPVMKvAy%2F3LW95eCVX7Bmmk5PYuC1BviNaQzdrhwFS1PJtUmIZ%2FPR%2BY1Za9gowyNZn9N5I1t6u8M4osHVOAo7HyPU7uPBNSHFzHVT12sFNusotHwdq5obBs34QBvt9gz8CryliuvYo8bCaZjhuCHbkrxtivcMRygfYGwkFleA%3D%3D&nscheck=4J3iBuBZFs3%2B%2BMpDMqFkdg%3D%3D",
      },
      { id: "guardian", label: "GUARDIAN", url: "https://guardian.ab-inbev.com/home" },
      { id: "seguridad-territorial", label: "SEGURIDAD TERRITORIAL" },
      { id: "monitoreos-seguridad", label: "MONITOREOS DE SEGURIDAD" },
      {
        id: "dashboards-seguridad",
        label: "DASHBOARDS DE SEGURIDAD",
        url: "https://app.powerbi.com/groups/me/reports/8e210ab1-b1bf-4acd-a4c5-9aeb76c22862/b6ac030f8fa422d55420?ctid=cef04b19-7776-4a94-b89b-375c77a8f936&experience=power-bi",
      },
      { id: "supply-training", label: "SUPPLY TRAINING" },
    ],
    buttons: [],
  },
  gente: {
    cards: [
      { id: "autonomia", label: "AUTONOMIA", url: "https://preview-bbe71.web.app/" },
      {
        id: "personal-ctrl",
        label: "PERSONAL CTRL",
        url: "https://breawing-operator-control.web.app/",
      },
      {
        id: "menu-reportes-people",
        label: "MENU GyG",
        url: "https://app.powerbi.com/groups/me/reports/6f572032-8948-4b05-a177-12ee3c7cfd0c/bbc144a519bc8fdc8d88?ctid=cef04b19-7776-4a94-b89b-375c77a8f936&experience=power-bi&bookmarkGuid=3ce7219b-bf42-4684-a6b9-2f2725ac8138",
      },
      {
        id: "interaction-log",
        label: "INTERACTION LOG",
        url: "https://supplyportal.ab-inbev.com/login/sso_login.asp",
      },
      {
        id: "splan",
        label: "SPLAN",
        url: "https://abinbevww.service-now.com/abiex?id=sc_cat_item_abi&sys_id=18a2cecedb9ad0d0faa711494b96197a",
      },
      { id: "acadia", label: "ACADIA", url: "https://ab-inbev.acadia.sysalli.com/browse/" },
      {
        id: "pilares",
        label: "PILARES",
        url: "https://anheuserbuschinbev.sharepoint.com/:f:/r/sites/MAZ3/bo/Fbrica%20Zacatecas/ELABORACI%C3%93N?csf=1&web=1&e=LvJUdD",
      },
      { id: "usabilidad-vpo", label: "USABILIDAD VPO" },
      {
        id: "gops",
        label: "GOPS",
        url: "https://app.powerbi.com/groups/me/reports/5593fd9b-f2e9-4b59-9663-feee785345cd/694f1aecb073d87b9364?experience=power-bi",
      },
      { id: "estrategia", label: "ESTRATEGIA" },
      { id: "farol-kpis", label: "FAROL KPIS" },
      { id: "evolucion-vpo", label: "EVOLUCION VPO" },
      { id: "pdca", label: "PDCA", url: "https://maz-pdca-hub.web.app/" },
    ],
    buttons: [],
  },
  calidad: {
    cards: [
      { id: "pro-one-view", label: "PRP ONE VIEW", url: "https://safety-map-907c2.web.app" },
      { id: "cmp", label: "CMP" },
      { id: "pml-cleanpro", label: "PML CLEANPRO", url: "https://pml-cleanpro.web.app/" },
      {
        id: "precision-brewing",
        label: "PRECISION BREWING",
        url: "https://estadistic-dashboard.web.app/",
      },
      { id: "core", label: "CORE", url: "https://mazmeszac.gmodelo.com.mx/TS/pages/abi/?ts_rurl=" },
      { id: "suite360", label: "SUITE 360", url: "https://abinbev.optiplan.co/" },
      {
        id: "pts",
        label: "AGENDA DE LIMPIEZA COCTOS",
        url: "https://agenda-de-control-de-procesos.web.app/",
      },
      { id: "sensory-one", label: "SENSORY ONE" },
      { id: "prospectos-pruebas", label: "PROSPECTOS Y PRUEBAS" },
    ],
    buttons: [],
  },
  elaboracion: {
    cards: [
      { id: "brewinsights", label: "BREWINSIGHTS", url: "https://brew-insights.web.app/login" },
      { id: "quas", label: "QUAS" },
      { id: "analisis-kpis-calidad", label: "ANALISIS DE KPIS DE CALIDAD" },
      {
        id: "ctrl-coctos",
        label: "CTRL DE COCTOS",
        url: "https://agenda-de-control-de-procesos.web.app",
      },
      {
        id: "ctrl-tccs",
        label: "CTRL DE TCCS",
        url: "https://craft-brew-insight-137b8.web.app/login",
      },
      {
        id: "smart-yeast",
        label: "LEVADURA",
        url: "https://app--levadura-7427a.us-central1.hosted.app/",
      },
      { id: "cmf", label: "CMF" },
      {
        id: "ctrl-filtros-cerveza",
        label: "FILTRACION BREWING",
        url: "https://filtracion-beer.web.app/",
      },
      { id: "ctrl-bbts", label: "CTRL DE BBTS", url: "https://gobierno-6a1c3.web.app/" },
    ],
    buttons: [],
  },
  mantenimiento: {
    cards: [
      {
        id: "capacity",
        label: "Gestor De Valvulas y Motores",
        url: "http://10.40.11.18/dashboard",
      },
      {
        id: "kpis-mantenimiento",
        label: "KPIS MANTENIMIENTO",
        url: "https://app.powerbi.com/groups/me/apps/b667a787-a8ff-426e-84b3-ea79efd05f79/reports/4215164b-cea3-4672-ac33-14c8ea136e5e/cfb8e3560411e0080045?ctid=cef04b19-7776-4a94-b89b-375c77a8f936&experience=power-bi",
      },
      { id: "talleres", label: "TALLERES" },
      { id: "planeacion", label: "PLANEACION" },
      { id: "ctrl-costos", label: "CTRL COSTOS" },
      { id: "ato", label: "ATO" },
      { id: "grafana", label: "GRAFANA", url: "https://10.182.4.106/?orgId=1&search=open" },
      { id: "sorba", label: "SORBA (FILTROS)" },
      { id: "ctrol-fugas", label: "CTROL DE FUGAS" },
    ],
    buttons: [],
  },
  logistica: {
    cards: [
      {
        id: "sap",
        label: "SAP",
        url: "https://azuevp04.modelo.gmodelo.com.mx/irj/portal?NavigationTarget=navurl://334834ed11204abf6f9fb249edec621b&NavMode=10&sap-ie=EDGE",
      },
      { id: "control-materias-primas", label: "CONTROL DE MATERIAS PRIMAS" },
      { id: "materias-aux-quimicos", label: "MATERIAS AUX Y QUIMICOS" },
      { id: "inve", label: "INVE" },
      { id: "materias-aux-cfrios", label: "MATERIAS AUX C FRIOS" },
      { id: "blender", label: "BLENDER" },
    ],
    buttons: [],
  },
  ambiental: {
    cards: [
      {
        id: "ryncs",
        label: "RYNCS",
        url: "https://app.powerbi.com/groups/me/reports/6f572032-8948-4b05-a177-12ee3c7cfd0c/bbc144a519bc8fdc8d88?ctid=cef04b19-7776-4a94-b89b-375c77a8f936&experience=power-bi&bookmarkGuid=3ce7219b-bf42-4684-a6b9-2f2725ac8138",
      },
      { id: "ctrol-descargas", label: "CTROL DE DESCARGAS" },
      { id: "analisis-kpis-ambientales", label: "ANALISIS DE KPIS AMBIENTALES" },
      {
        id: "sorba-ollas",
        label: "SORBA (OLLAS)",
        url: "https://10.40.11.56/dashboard/d/9gkLh2oSk/cocimientos?orgId=1&refresh=5s&from=now-12h&to=now",
      },
    ],
    buttons: [],
  },
};

/**
 * Hook principal para obtener y actualizar la configuración de un panel específico.
 * @param panel - Nombre del panel a gestionar.
 * @returns Objeto con las tarjetas configuradas, estado de carga y función para guardar cambios.
 */
export function useDashboardConfig(panel: PanelName) {
  const [cards, setCards] = useState<CardConfig[]>(DEFAULTS[panel].cards);
  const [buttons, setButtons] = useState<ButtonConfig[]>(DEFAULTS[panel].buttons);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = doc(db, "dashboardConfig", panel);
    getDoc(ref)
      .then((snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (data?.cards && Array.isArray(data.cards)) {
            const defaultIds = new Set(DEFAULTS[panel].cards.map((c) => c.id));
            const defaultMap = new Map(DEFAULTS[panel].cards.map((c) => [c.id, c]));
            const filteredCards = data.cards
              .filter((c) => defaultIds.has(c.id))
              .map((c: any) => ({
                ...c,
                url: c.url || defaultMap.get(c.id)?.url,
              }));
            const existingIds = new Set(filteredCards.map((c: any) => c.id));
            const missingCards = DEFAULTS[panel].cards.filter((c) => !existingIds.has(c.id));
            setCards([...filteredCards, ...missingCards]);
          }
          if (data?.buttons && Array.isArray(data.buttons)) {
            const defaultBtnIds = new Set(DEFAULTS[panel].buttons.map((b) => b.id));
            const filteredButtons = data.buttons.filter((b: any) => defaultBtnIds.has(b.id));
            const existingBtnIds = new Set(filteredButtons.map((b: any) => b.id));
            const missingButtons = DEFAULTS[panel].buttons.filter((b) => !existingBtnIds.has(b.id));
            setButtons([...filteredButtons, ...missingButtons]);
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [panel]);

  const saveCards = useCallback(
    async (newCards: CardConfig[], newButtons?: ButtonConfig[]) => {
      setCards(newCards);
      if (newButtons) setButtons(newButtons);
      const ref = doc(db, "dashboardConfig", panel);
      await setDoc(
        ref,
        { cards: newCards, ...(newButtons ? { buttons: newButtons } : {}) },
        { merge: true },
      );
    },
    [panel],
  );

  return { cards, buttons, loading, saveCards };
}
