import { theme as chakraTheme } from '@chakra-ui/react';

const config = chakraTheme.config;

const styles = {
  global: {
    body: {
      bg: 'gray.50',
      color: 'gray.900',
    },
  },
};

const colors = {
  brand: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3',
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
};

const semanticTokens = {
  colors: {
    'chakra-body-bg': {
      _light: 'gray.50',
      _dark: 'gray.900',
    },
    'chakra-body-text': {
      _light: 'gray.900',
      _dark: 'gray.50',
    },
    'chakra-placeholder-color': {
      _light: 'gray.500',
      _dark: 'gray.400',
    },
  },
};

const theme = {
  config,
  styles,
  colors,
  semanticTokens,
};

export default theme;
