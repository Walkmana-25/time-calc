import { Box, ChakraProvider, ColorModeScript, Container } from '@chakra-ui/react';
import { I18nextProvider } from 'react-i18next';
import { Header } from './components/layout/Header';
import { Calculator } from './components/calculator/Calculator';
import theme from './theme';
import i18n from './i18n';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <Box minH="100vh" bg="gray.50" py={8}>
          <Container maxW="container.lg">
            <Header />
            <Calculator />
          </Container>
        </Box>
      </ChakraProvider>
    </I18nextProvider>
  );
}

export default App;
