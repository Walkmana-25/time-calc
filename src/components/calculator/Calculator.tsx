import { useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useCalculator } from '../../hooks/useCalculator';
import { Display } from './Display';
import { Keypad } from './Keypad';
import { OperationButtons } from './OperationButtons';
import { FormatSelector } from './FormatSelector';
import { formatTime } from '../../utils/timeCalculator';
import type { TimeFormat } from '../../types/time';

const MotionBox = motion(Box);

const OP_SYMBOL: Record<string, string> = {
  add: '+',
  subtract: '-',
  multiply: '×',
  divide: '÷',
};

export function Calculator() {
  const {
    displayValue,
    storedValue,
    operation,
    inputDigit,
    setOperation,
    calculate,
    clear,
    clearEntry,
  } = useCalculator();

  const [format, setFormat] = useState<TimeFormat>('dd:hh:mm:ss');

  // Build expression string shown above the display
  let expression = '';
  if (storedValue !== null && operation) {
    expression = `${formatTime(storedValue, format)} ${OP_SYMBOL[operation]}`;
  }

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      bg="rgba(255, 255, 255, 0.05)"
      backdropFilter="blur(24px) saturate(180%)"
      p={{ base: 4, md: 8 }}
      borderRadius="3xl"
      boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.37)"
      border="1px solid rgba(255, 255, 255, 0.1)"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-50%" left="-50%" w="200%" h="200%"
        bgGradient="radial(circle, rgba(255,255,255,0.05) 0%, transparent 60%)"
        pointerEvents="none"
      />
      <VStack spacing={5} align="stretch" position="relative" zIndex={1}>
        <FormatSelector format={format} onFormatChange={setFormat} />
        <Display value={displayValue} format={format} expression={expression} />
        <Keypad onDigit={inputDigit} />
        <OperationButtons
          onOperation={setOperation}
          onCalculate={calculate}
          onClear={clear}
          onClearEntry={clearEntry}
          activeOperation={operation}
        />
      </VStack>
    </MotionBox>
  );
}

