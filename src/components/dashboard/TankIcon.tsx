import React from 'react';

export const TankIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    {/* Boquilla superior */}
    <rect x="42" y="4" width="16" height="8" rx="3" />

    {/* Cúpula superior (semielipse) */}
    <path d="M18 34 Q18 12 50 12 Q82 12 82 34" />

    {/* Cuerpo del tanque (ancho y alto) */}
    <rect x="18" y="34" width="64" height="38" rx="4" />

    {/* Línea separadora horizontal */}
    <line x1="18" y1="34" x2="82" y2="34" />

    {/* Diamante central */}
    <path d="M50 44 L62 53 L50 62 L38 53 Z" />

    {/* Pata izquierda */}
    <line x1="32" y1="72" x2="24" y2="94" />
    <line x1="16" y1="94" x2="33" y2="94" />

    {/* Pata derecha */}
    <line x1="68" y1="72" x2="76" y2="94" />
    <line x1="67" y1="94" x2="84" y2="94" />
  </svg>
);
