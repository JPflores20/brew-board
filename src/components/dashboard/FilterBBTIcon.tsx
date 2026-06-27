import React from 'react';

/**
 * Componente SVG que dibuja un ícono representativo de los filtros BBT (Bright Beer Tanks).
 * Se utiliza para las tarjetas y botones del dashboard relacionados con los procesos de filtrado.
 *
 * @param {React.SVGProps<SVGSVGElement>} props - Propiedades estándar de un elemento SVG de React.
 * @returns {JSX.Element} El ícono SVG de los tanques de filtrado.
 */
export const FilterBBTIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Barra horizontal superior que conecta los 3 tanques */}
    <line x1="10" y1="18" x2="90" y2="18" />

    {/* ── Tanque izquierdo ── */}
    {/* Cuerpo */}
    <rect x="10" y="18" width="22" height="44" rx="3" />
    {/* Punta cónica inferior */}
    <path d="M10 62 L21 76 L32 62" />
    {/* Pata izquierda */}
    <line x1="18" y1="76" x2="14" y2="92" />
    {/* Pata derecha */}
    <line x1="24" y1="76" x2="28" y2="92" />

    {/* ── Tanque central ── */}
    {/* Cuerpo */}
    <rect x="39" y="18" width="22" height="44" rx="3" />
    {/* Punta cónica inferior */}
    <path d="M39 62 L50 76 L61 62" />
    {/* Pata izquierda */}
    <line x1="47" y1="76" x2="43" y2="92" />
    {/* Pata derecha */}
    <line x1="53" y1="76" x2="57" y2="92" />

    {/* ── Tanque derecho ── */}
    {/* Cuerpo */}
    <rect x="68" y="18" width="22" height="44" rx="3" />
    {/* Punta cónica inferior */}
    <path d="M68 62 L79 76 L90 62" />
    {/* Pata izquierda */}
    <line x1="76" y1="76" x2="72" y2="92" />
    {/* Pata derecha */}
    <line x1="82" y1="76" x2="86" y2="92" />
  </svg>
);
