// theme.ts (Create this file to store your theme)
import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF9800',  // Orange primary color
    accent: '#FF5722',   // Deep orange for secondary elements
    background: '#FFF3E0',  // Light orange background
    text: '#000000',     // Black text
  },
};

export default theme;
