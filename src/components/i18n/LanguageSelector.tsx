import { Button, ButtonGroup, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const bgColor = useColorModeValue('gray.200', 'gray.700');
  const hoverColor = useColorModeValue('gray.300', 'gray.600');
  const activeColor = useColorModeValue('brand.500', 'brand.600');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ButtonGroup size="sm" isAttached>
      <Button
        bg={i18n.language === 'en' ? activeColor : bgColor}
        color={i18n.language === 'en' ? 'white' : undefined}
        _hover={{ bg: hoverColor }}
        onClick={() => changeLanguage('en')}
      >
        EN
      </Button>
      <Button
        bg={i18n.language === 'ja' ? activeColor : bgColor}
        color={i18n.language === 'ja' ? 'white' : undefined}
        _hover={{ bg: hoverColor }}
        onClick={() => changeLanguage('ja')}
      >
        日本語
      </Button>
    </ButtonGroup>
  );
}
