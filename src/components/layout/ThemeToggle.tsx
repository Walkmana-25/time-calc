import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

export function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();
  const bgColor = useColorModeValue('gray.200', 'gray.700');
  const hoverColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <IconButton
      aria-label={t('theme.toggle')}
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      bg={bgColor}
      _hover={{ bg: hoverColor }}
      isRound
    />
  );
}
