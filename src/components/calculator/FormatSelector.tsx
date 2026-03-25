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
  const labelColor = useColorModeValue('gray.700', 'gray.300');

  const formats: { value: TimeFormat; label: string }[] = [
    { value: 'dd:hh:mm:ss', label: t('formats.full') },
    { value: 'hh:mm:ss', label: t('formats.hours') },
    { value: 'mm:ss', label: t('formats.minutes') },
    { value: 'ss', label: t('formats.seconds') },
  ];

  return (
    <FormControl mb={0}>
      <FormLabel color={labelColor}>{t('format')}</FormLabel>
      <Select
        value={format}
        onChange={(e) => onFormatChange(e.target.value as TimeFormat)}
        width="full"
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
