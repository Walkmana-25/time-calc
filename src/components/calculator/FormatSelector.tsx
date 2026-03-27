import {
  Select,
  FormControl,
  FormLabel,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import type { TimeFormat } from '../../types/time';

interface FormatSelectorProps {
  format: TimeFormat;
  onFormatChange: (format: TimeFormat) => void;
}

export function FormatSelector({ format, onFormatChange }: FormatSelectorProps) {
  const { t } = useTranslation();
  const labelColor = useColorModeValue('whiteAlpha.900', 'whiteAlpha.900');
  const selectBg = useColorModeValue('rgba(255, 255, 255, 0.12)', 'rgba(255, 255, 255, 0.12)');
  const selectHoverBg = useColorModeValue('rgba(255, 255, 255, 0.18)', 'rgba(255, 255, 255, 0.18)');
  const selectFocusBg = useColorModeValue('rgba(255, 255, 255, 0.22)', 'rgba(255, 255, 255, 0.22)');

  const formats: { value: TimeFormat; label: string }[] = [
    { value: 'dd:hh:mm:ss', label: t('formats.full') },
    { value: 'hh:mm:ss', label: t('formats.hours') },
    { value: 'mm:ss', label: t('formats.minutes') },
    { value: 'ss', label: t('formats.seconds') },
  ];

  return (
    <FormControl mb={0}>
      <FormLabel
        color={labelColor}
        fontWeight="600"
        fontSize={{ base: "md", md: "lg" }}
        mb={3}
        letterSpacing="wide"
      >
        {t('format')}
      </FormLabel>
      <Select
        value={format}
        onChange={(e) => onFormatChange(e.target.value as TimeFormat)}
        width="full"
        bg={selectBg}
        backdropFilter="blur(12px)"
        border="1.5px solid rgba(255, 255, 255, 0.15)"
        borderRadius="xl"
        color="white"
        fontWeight="500"
        fontSize={{ base: "md", md: "lg" }}
        height={{ base: "12", md: "14" }}
        _hover={{
          bg: selectHoverBg,
          borderColor: "rgba(255, 255, 255, 0.25)"
        }}
        _focus={{
          bg: selectFocusBg,
          borderColor: "rgba(59, 130, 246, 0.5)",
          boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)"
        }}
        sx={{
          option: {
            bg: "gray.800",
            color: "white",
            _hover: {
              bg: "gray.700"
            }
          }
        }}
      >
        {formats.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
