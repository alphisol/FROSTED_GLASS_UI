// ============================================
// COMPONENTES PRINCIPALES
// ============================================

/**
 * Componente principal de la tarjeta con efecto glassmorphism
 * Incluye animación 3D tilt y parallax para el avatar
 */
export { FrostedGlassCard } from "../../FrostedGlassCard";

// ============================================
// SUB-COMPONENTES (Para uso avanzado)
// ============================================

/**
 * Avatar con efecto parallax 3D
 */
export { FrostedGlassAvatar } from "./FrostedGlassAvatar";

/**
 * Panel de iconos con animación staggered
 */
export { FrostedGlassIcons } from "./FrostedGlassIcons";

/**
 * Botón "Enter" con animación de altura
 */
export { FrostedGlassButton } from "./FrostedGlassButton";

/**
 * Contenido de texto (heading + párrafo)
 */
export { FrostedGlassContent } from "./FrostedGlassContent";

// ============================================
// CONSTANTES (Configuración)
// ============================================

export {
  // Constantes de transformación 3D
  REST_DEG,
  REST_Y_DEG,
  MAX_ROTATE_X,
  MAX_ROTATE_Y,
  LERP,
  AVATAR_LERP,
  
  // Valores de animación del avatar
  AVATAR_REST_Y,
  AVATAR_REST_Z,
  AVATAR_HOVER_Y,
  AVATAR_HOVER_Z,
  
  // Dimensiones
  CARD_WIDTH,
  CARD_HEIGHT,
  AVATAR_SIZE,
  
  // URLs de assets
  ICON_HEART_URL,
  ICON_COFFEE_URL,
  ICON_AT_URL,
  ICON_ARROW_URL,
  AVATAR_IMAGE_URL,
  BACKGROUND_IMG,
} from "./constants";

// ============================================
// UTILITIES (Funciones helper)
// ============================================

export { buildTransform, buildAvatarTransform } from "./utils";

// ============================================
// HOOKS (Disponibles para extensión)
// ============================================

/**
 * Hook para efecto 3D tilt
 * Nota: Actualmente no se usa, la lógica está en FrostedGlassCard
 */
export { useTiltEffect } from "./hooks/useTiltEffect";

/**
 * Hook para animación del avatar
 * Nota: Actualmente no se usa, la lógica está en FrostedGlassCard
 */
export { useAvatarAnimation } from "./hooks/useAvatarAnimation";