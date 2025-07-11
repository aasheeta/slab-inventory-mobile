// Web-compatible theme configuration
export const colors = {
  primary: '#2E7D32',
  primaryVariant: '#1B5E20',
  secondary: '#FF6F00',
  secondaryVariant: '#E65100',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  error: '#B00020',
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  onBackground: '#000000',
  onSurface: '#000000',
  onError: '#FFFFFF',
  accent: '#4CAF50',
  text: '#212121',
  textSecondary: '#757575',
  border: '#E0E0E0',
  card: '#FFFFFF',
  notification: '#FF6F00',
};

// Simple theme object that works well with web
export const theme = {
  colors: {
    primary: colors.primary,
    primaryContainer: colors.primaryVariant,
    secondary: colors.secondary,
    secondaryContainer: colors.secondaryVariant,
    surface: colors.surface,
    background: colors.background,
    error: colors.error,
    onPrimary: colors.onPrimary,
    onSecondary: colors.onSecondary,
    onSurface: colors.onSurface,
    onBackground: colors.onBackground,
    outline: colors.border,
  },
  roundness: 8,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};