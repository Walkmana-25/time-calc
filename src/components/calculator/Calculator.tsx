import { useState } from 'react';
import { Box, VStack, useColorModeValue } from '@chakra-ui/react';
import { useCalculator } from '../../hooks/useCalculator';
import { Display } from './Display';
import { Keypad } from './Keypad';
import { OperationButtons } from './OperationButtons';
import { FormatSelector } from './FormatSelector';
import type { TimeFormat } from '../../types/time';

export function Calculator() {
  const {
    displayValue,
    operation,
    inputDigit,
    setOperation,
    calculate,
    clear,
    clearEntry,
  } = useCalculator();

  const [format, setFormat] = useState<TimeFormat>('dd:hh:mm:ss');
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={cardBg} p={6} borderRadius="xl" boxShadow="lg">
      <FormatSelector format={format} onFormatChange={setFormat} />
      <VStack spacing={4} align="stretch">
        <Display value={displayValue} format={format} />
        <Keypad onDigit={inputDigit} />
        <OperationButtons
          onOperation={setOperation}
          onCalculate={calculate}
          onClear={clear}
          onClearEntry={clearEntry}
          activeOperation={operation}
        />
      </VStack>
    </Box>
  );
}
