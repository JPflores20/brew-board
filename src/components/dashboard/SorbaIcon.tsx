/**
 * @file SorbaIcon.tsx
 * @description Componente de icono SVG para representar el logo o concepto de Sorba.
 */
import React from 'react';

/**
 * Componente funcional que renderiza un icono SVG personalizado (Sorba).
 * 
 * @param {React.SVGProps<SVGSVGElement>} props - Propiedades estándar de un elemento SVG en React.
 * @returns {JSX.Element} El elemento SVG del icono de Sorba.
 */
export const SorbaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Conectores */}
    <line x1="11" y1="11" x2="16" y2="4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="11" y1="11" x2="5" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="11" y1="11" x2="16" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Círculo central (La letra O) */}
    <circle cx="11" cy="11" r="4.5" />
    
    {/* Nodos exteriores */}
    <circle cx="16" cy="4" r="2.5" />
    <circle cx="5" cy="18" r="2.5" />
    <circle cx="16" cy="18" r="2.5" />
  </svg>
);
