/**
 * @fileoverview Funciones del servidor (Server Functions) de ejemplo.
 * Proporciona endpoints del lado del servidor que pueden ser invocados desde el cliente
 * de forma transparente, manejando validaciones y lógica exclusiva del servidor.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getServerConfig } from "../config.server";

// Ejemplo de createServerFn. Manejador del lado del servidor invocado desde el cliente:
//   const result = await getGreeting({ data: { name: "Ada" } })
// El cuerpo del .handler se ejecuta exclusivamente en el servidor — las importaciones utilizadas
// solo dentro de este (como los módulos .server.ts) se eliminan del paquete del cliente (tree-shaken).
// El código a nivel de módulo aquí todavía se envía al cliente; para funciones de ayuda estrictamente
// del servidor, colócalas en un archivo .server.ts. Utiliza este patrón en lugar de Supabase Edge
// Functions para la lógica del servidor.

/**
 * Función de servidor para obtener un saludo personalizado.
 * Valida la entrada y retorna información junto al entorno actual.
 * @returns {Promise<{greeting: string, mode: string}>} Promesa que resuelve un objeto con el mensaje de saludo y el modo del entorno.
 */
export const getGreeting = createServerFn({ method: "POST" })
  .inputValidator(z.object({ name: z.string().min(1) }))
  .handler(async ({ data }) => {
    // Obtenemos la configuración del servidor
    const config = getServerConfig();
    
    // Retornamos el saludo y el modo del entorno
    return {
      greeting: `Hola, ${data.name}!`,
      mode: config.nodeEnv ?? "desconocido",
    };
  });
