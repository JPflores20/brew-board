import React from 'react';

export const GrainIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Tallo central */}
    <line x1="50" y1="96" x2="50" y2="8" />

    {/* Hoja punta superior */}
    <ellipse cx="50" cy="8" rx="5" ry="8" />

    {/* Fila 1 - hojas pequeñas */}
    <ellipse cx="36" cy="20" rx="9" ry="5" transform="rotate(-40 36 20)" />
    <ellipse cx="64" cy="20" rx="9" ry="5" transform="rotate(40 64 20)" />

    {/* Fila 2 */}
    <ellipse cx="32" cy="36" rx="11" ry="5.5" transform="rotate(-35 32 36)" />
    <ellipse cx="68" cy="36" rx="11" ry="5.5" transform="rotate(35 68 36)" />

    {/* Fila 3 */}
    <ellipse cx="28" cy="53" rx="13" ry="6" transform="rotate(-30 28 53)" />
    <ellipse cx="72" cy="53" rx="13" ry="6" transform="rotate(30 72 53)" />

    {/* Fila 4 - hojas grandes inferiores */}
    <ellipse cx="25" cy="71" rx="14" ry="6.5" transform="rotate(-25 25 71)" />
    <ellipse cx="75" cy="71" rx="14" ry="6.5" transform="rotate(25 75 71)" />
  </svg>
);
