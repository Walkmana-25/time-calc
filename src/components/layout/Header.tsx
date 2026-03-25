import {
  Box,
  Flex,
  Heading,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from '../i18n/LanguageSelector';

export function Header() {
  const { t } = useTranslation();
  const textColor = useColorModeValue('gray.900', 'white');

  return (
    <Box mb={8}>
      <Flex align="center" gap={4}>
        <Heading size="lg" color={textColor}>
          {t('title')}
        </Heading>
        <Spacer />
        <LanguageSelector />
        <ThemeToggle />
      </Flex>
    </Box>
  );
}
