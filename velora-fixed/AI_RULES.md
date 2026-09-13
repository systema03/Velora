# AI_RULES.md — Velora

## Producto

Velora es una aplicación de productividad corporativa para organizar documentos, recibos, tareas y recordatorios. Incluye, en fases posteriores, espacios sincronizados privados con cifrado en el dispositivo.

La función pública debe ser completamente útil y real. La privacidad es discreta, pero la aplicación no debe presentarse como herramienta de espionaje ni hacer promesas técnicas imposibles.

## Stack obligatorio

- React + Vite + TypeScript en modo estricto.
- Tailwind CSS.
- Componentes accesibles y reutilizables.
- Lucide React para iconos.
- React Router para navegación.
- Supabase solo cuando una fase lo solicite expresamente.
- Capacitor únicamente en una fase móvil posterior.

## Identidad

- Usar los archivos de `/public/brand/` sin redibujar ni sustituir el logo.
- Marca escrita exactamente como `VELORA` en el logotipo y `Velora` en texto normal.
- Tipografía: Inter con `system-ui` como alternativa.
- Colores:
  - `#164E63` petroleum.
  - `#0891B2` teal.
  - `#F4F6F8` background.
  - `#FFFFFF` surface.
  - `#172033` text.
  - `#15803D` success.
  - `#B45309` warning.
- Estilo corporativo elegante, sobrio y ligero.
- Evitar neón, glassmorphism excesivo, degradados decorativos intensos, emojis e ilustraciones infantiles.
- No usar candados, ojos, máscaras, calculadoras, estética de espionaje ni burbujas similares a WhatsApp.

## Experiencia pública

- Inicio basado en una lista sencilla de actividad, no en un dashboard recargado.
- Combinar documentos, recibos, tareas y recordatorios.
- Navegación inferior móvil: Actividad, Documentos, Pendientes y Ajustes.
- En escritorio usar una barra lateral equivalente.
- El icono de sincronización funciona normalmente con toque simple.
- No implementar todavía acceso privado hasta que una fase posterior lo solicite.
- No mostrar opciones llamadas Chat, Secreto, Oculto, Bóveda o Sala privada.

## Privacidad y seguridad

- Nunca guardar contraseñas, frases, PIN, claves de cifrado o contenido privado en texto claro.
- Nunca guardar secretos en código, repositorio, URLs, logs, analytics, localStorage o sessionStorage.
- Nunca exponer `service_role` al navegador.
- No crear políticas RLS con `USING (true)` para contenido privado.
- No afirmar que una PWA impide capturas de pantalla o garantiza borrado físico de memoria.
- No implementar criptografía casera. Usar Web Crypto según la especificación de la fase correspondiente.
- No inventar seguridad visual sin protección real del servidor.
- Toda migración debe mostrarse para revisión antes de aplicarse.
- No ejecutar migraciones destructivas sin autorización explícita.

## Calidad del código

- Evitar `any`; definir tipos e interfaces.
- Mantener componentes pequeños y con una responsabilidad.
- Separar datos, lógica, estado y presentación.
- No introducir datos simulados fuera de una capa identificada como demo.
- No reemplazar archivos completos cuando baste una modificación localizada.
- No instalar dependencias sin explicar su finalidad.
- No dejar `console.log`, secretos, errores TypeScript ni imports rotos.
- Ejecutar build y comprobaciones disponibles después de cada fase.
- Informar archivos creados o modificados y asuntos pendientes.

## Accesibilidad y adaptación

- Contraste WCAG AA.
- Áreas táctiles mínimas de 44 × 44 px.
- Etiquetas accesibles para iconos.
- Navegación por teclado y foco visible.
- Respetar `prefers-reduced-motion`.
- Usar safe areas y `100dvh` en móvil.
- No bloquear el zoom del usuario.
- Diseñar primero para móvil y verificar escritorio.

## Forma de trabajar

1. Leer este archivo antes de cada cambio.
2. Auditar el estado actual antes de modificar.
3. Implementar solo la fase solicitada.
4. No adelantarse al backend ni a fases privadas.
5. Detenerse al terminar la fase y presentar validación.

