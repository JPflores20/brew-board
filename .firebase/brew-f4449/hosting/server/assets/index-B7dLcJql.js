import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Star, ExternalLink, Database, Cog, BarChart3, Server, ClipboardList, Box, BookOpen, ShieldCheck, X, Search, Sun, Moon, Clock } from "lucide-react";
import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Command as Command$1 } from "cmdk";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as DialogPrimitive from "@radix-ui/react-dialog";
function ProjectCard({
  project,
  index = 0,
  isFavorite = false,
  onToggleFavorite
}) {
  const Icon = project.icon;
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);
  };
  return /* @__PURE__ */ jsxs(
    "a",
    {
      ref: cardRef,
      href: project.url,
      target: "_blank",
      rel: "noopener noreferrer",
      onMouseMove: handleMouseMove,
      style: { animationDelay: `${500 + index * 100}ms` },
      className: "group animate-fade-up relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-lg shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100",
            style: {
              background: `radial-gradient(500px circle at var(--x, 0) var(--y, 0), rgba(59,130,246,0.15), transparent 40%)`
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "absolute right-4 top-4 z-20 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite?.();
              },
              className: `transition-all duration-300 hover:scale-110 ${isFavorite ? "text-yellow-400 opacity-100 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" : "text-zinc-500 opacity-40 hover:text-yellow-400 group-hover:opacity-100"}`,
              title: isFavorite ? "Quitar de favoritos" : "Añadir a favoritos",
              children: /* @__PURE__ */ jsx(Star, { className: "h-[18px] w-[18px]", fill: isFavorite ? "currentColor" : "none" })
            }
          ),
          /* @__PURE__ */ jsx(
            ExternalLink,
            {
              className: "h-4 w-4 text-zinc-400 opacity-60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-300 group-hover:opacity-100",
              "aria-hidden": "true"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative z-10 mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br from-blue-500/20 via-indigo-500/10 to-violet-500/20 text-blue-200 shadow-inner shadow-white/5 transition-colors duration-300 group-hover:text-cyan-200", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsx("h2", { className: "relative z-10 text-lg font-semibold tracking-tight text-zinc-50", children: project.name }),
        /* @__PURE__ */ jsxs("p", { className: "relative z-10 mt-1.5 text-sm leading-relaxed text-zinc-400", children: [
          project.description,
          project.tagline ? /* @__PURE__ */ jsx("span", { className: "mt-1 block italic text-zinc-500", children: project.tagline }) : null
        ] })
      ]
    }
  );
}
const projects = [
  {
    name: "Brew Insights",
    description: "Herramienta de visualización y análisis de tendencias.",
    tagline: "MAZ allá del cielo.",
    stack: ["React", "TypeScript", "Firebase"],
    url: "https://brew-insights.web.app/login",
    icon: Database
  },
  {
    name: "Brewing Operator Control",
    description: "Herramienta para el control operativo y gestión cervecera.",
    stack: ["React", "TypeScript", "Tailwind"],
    url: "https://breawing-operator-control.web.app/",
    icon: Cog
  },
  {
    name: "Dashboard de autonomía",
    description: "Dashboard de autonomía cervecera",
    stack: ["Bun", "React", "TypeScript", "Tailwind"],
    url: "https://preview-bbe71.web.app/",
    icon: BarChart3
  },
  {
    name: "SAP",
    description: "Plataforma de gestión y recursos empresariales.",
    stack: ["Enterprise", "Portal"],
    url: "https://azuevp04.modelo.gmodelo.com.mx/irj/portal?NavigationTarget=navurl://334834ed11204abf6f9fb249edec621b&NavMode=10&sap-ie=EDGE",
    icon: Server
  },
  {
    name: "Interaction Log",
    description: "Registro y control de interacciones logísticas.",
    stack: ["Logistics", "Portal"],
    url: "https://supplyportal.ab-inbev.com/login/sso_login.asp",
    icon: ClipboardList
  },
  {
    name: "SupplyPortal",
    description: "Portal centralizado de cadena de suministro y abastecimiento.",
    stack: ["Supply Chain", "Portal"],
    url: "https://supplyportal.ab-inbev.com/login/sso_login.asp",
    icon: Box
  },
  {
    name: "ACADIA",
    description: "Plataforma de documentación, procedimientos y entrenamiento.",
    stack: ["Training", "Platform"],
    url: "https://ab-inbev.acadia.sysalli.com/browse/",
    icon: BookOpen
  },
  {
    name: "GUARDIAN",
    description: "Sistema de seguridad y monitoreo Guardian.",
    stack: ["Security", "Portal"],
    url: "https://guardian.ab-inbev.com/home",
    icon: ShieldCheck
  }
];
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const Command = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = Command$1.displayName;
const CommandDialog = ({ children, ...props }) => {
  return /* @__PURE__ */ jsx(Dialog, { ...props, children: /* @__PURE__ */ jsx(DialogContent, { className: "overflow-hidden p-0", children: /* @__PURE__ */ jsx(Command, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children }) }) });
};
const CommandInput = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsx(
    Command$1.Input,
    {
      ref,
      className: cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = Command$1.Input.displayName;
const CommandList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = Command$1.List.displayName;
const CommandEmpty = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(Command$1.Empty, { ref, className: "py-6 text-center text-sm", ...props }));
CommandEmpty.displayName = Command$1.Empty.displayName;
const CommandGroup = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = Command$1.Group.displayName;
const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = Command$1.Separator.displayName;
const CommandItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    ),
    ...props
  }
));
CommandItem.displayName = Command$1.Item.displayName;
function SearchPalette() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open2) => !open2);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  const handleSelect = (url) => {
    setOpen(false);
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setOpen(true),
        className: "inline-flex h-10 items-center justify-between gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-zinc-400 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/10 hover:text-zinc-200",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Search, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { children: "Buscar proyecto..." })
          ] }),
          /* @__PURE__ */ jsxs("kbd", { className: "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-zinc-400", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs", children: "⌘" }),
            "K"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(CommandDialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsx(CommandInput, { placeholder: "Escribe el nombre de un proyecto..." }),
      /* @__PURE__ */ jsxs(CommandList, { children: [
        /* @__PURE__ */ jsx(CommandEmpty, { children: "No se encontraron proyectos." }),
        /* @__PURE__ */ jsx(CommandGroup, { heading: "Aplicaciones", children: projects.map((project) => {
          const Icon = project.icon;
          return /* @__PURE__ */ jsxs(
            CommandItem,
            {
              value: project.name,
              onSelect: () => handleSelect(project.url),
              className: "flex items-center gap-3 py-3 cursor-pointer",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5", children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 text-blue-300" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: project.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-zinc-400", children: project.description })
                ] })
              ]
            },
            project.name
          );
        }) })
      ] })
    ] })
  ] });
}
function DashboardIndex() {
  const [isDark, setIsDark] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [time, setTime] = useState(/* @__PURE__ */ new Date());
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const isDarkTheme = document.documentElement.classList.contains("dark");
    setIsDark(isDarkTheme);
    const savedFavs = localStorage.getItem("brew-board-favorites");
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch (e) {
      }
    }
    const interval = setInterval(() => {
      setTime(/* @__PURE__ */ new Date());
    }, 1e3);
    return () => clearInterval(interval);
  }, []);
  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setIsDark(!isDark);
  };
  const toggleFavorite = (url) => {
    setFavorites((prev) => {
      const isFav = prev.includes(url);
      const newFavs = isFav ? prev.filter((f) => f !== url) : [...prev, url];
      localStorage.setItem("brew-board-favorites", JSON.stringify(newFavs));
      return newFavs;
    });
  };
  const getGreeting = () => {
    const hour = time.getHours();
    if (hour >= 5 && hour < 12) return "Buenos días, Equipo";
    if (hour >= 12 && hour < 19) return "Buenas tardes, Equipo";
    return "Buenas noches, Equipo";
  };
  const formattedTime = time.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const sortedProjects = [...projects].sort((a, b) => {
    const aFav = favorites.includes(a.url);
    const bFav = favorites.includes(b.url);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return 0;
  });
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen text-zinc-100", children: [
    /* @__PURE__ */ jsxs("div", { "aria-hidden": "true", className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.04]", style: {
        backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage: "radial-gradient(ellipse at 50% 0%, black 40%, transparent 75%)"
      } }),
      /* @__PURE__ */ jsx("div", { className: "animate-orb-a absolute -top-[10vw] -left-[10vw] h-[45vw] w-[45vw] rounded-full bg-blue-600 opacity-40 blur-[120px]" }),
      /* @__PURE__ */ jsx("div", { className: "animate-orb-b absolute top-[10vh] -right-[12vw] h-[40vw] w-[40vw] rounded-full bg-violet-600 opacity-40 blur-[130px]" }),
      /* @__PURE__ */ jsx("div", { className: "animate-orb-c absolute -bottom-[10vw] left-[20vw] h-[42vw] w-[42vw] rounded-full bg-cyan-500 opacity-30 blur-[140px]" }),
      /* @__PURE__ */ jsx("div", { className: "animate-orb-d absolute bottom-[5vh] right-[15vw] h-[30vw] w-[30vw] rounded-full bg-fuchsia-500 opacity-25 blur-[120px]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-slate-950/30" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none", style: {
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      } })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16", children: [
      /* @__PURE__ */ jsxs("header", { className: "relative mb-16 flex flex-col items-center justify-center text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute right-0 top-0 flex items-center gap-3 animate-fade-up", style: {
          animationDelay: "400ms"
        }, children: [
          /* @__PURE__ */ jsx(SearchPalette, {}),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: toggleTheme, "aria-label": "Alternar tema", className: "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-200 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/10", children: isDark ? /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Moon, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "group relative mb-8 cursor-pointer animate-fade-up", style: {
            animationDelay: "100ms"
          }, children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -inset-6 animate-pulse rounded-full bg-linear-to-r from-blue-600 via-cyan-400 to-violet-600 opacity-40 blur-2xl transition-all duration-700 group-hover:scale-110 group-hover:opacity-80 group-hover:blur-3xl" }),
            /* @__PURE__ */ jsx("img", { src: "/logos/BREWMAN.jpeg", alt: "BREWMAN Logo", className: "relative h-40 w-40 rounded-[2rem] object-cover shadow-2xl ring-2 ring-white/10 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-105 group-hover:-rotate-3 group-hover:shadow-[0_20px_50px_rgba(8,-112,184,0.4)] group-hover:ring-white/30" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md animate-fade-up transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`, style: {
            animationDelay: "150ms",
            animationFillMode: "both"
          }, children: [
            /* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5 text-blue-400" }),
            /* @__PURE__ */ jsx("span", { children: mounted ? formattedTime : "--:--" })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "bg-linear-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text pb-2 text-4xl font-semibold tracking-tight text-transparent sm:text-5xl animate-fade-up", style: {
            animationDelay: "200ms",
            animationFillMode: "both"
          }, children: mounted ? getGreeting() : "Cargando..." }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-zinc-400 sm:text-base animate-fade-up", style: {
            animationDelay: "300ms",
            animationFillMode: "both"
          }, children: "Panel de herramientas" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3", children: sortedProjects.map((project, project_index) => /* @__PURE__ */ jsx(ProjectCard, { project, index: project_index, isFavorite: favorites.includes(project.url), onToggleFavorite: () => toggleFavorite(project.url) }, project.name)) })
    ] })
  ] });
}
export {
  DashboardIndex as component
};
