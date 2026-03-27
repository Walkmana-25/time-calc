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
      bg="rgba(255, 255, 255, 0.08)"
      backdropFilter="blur(32px) saturate(200%)"
      p={{ base: 6, md: 10 }}
      borderRadius="4xl"
      boxShadow="0 12px 48px 0 rgba(0, 0, 0, 0.4), 0 2px 12px 0 rgba(0, 0, 0, 0.2)"
      border="1px solid rgba(255, 255, 255, 0.15)"
      position="relative"
      overflow="hidden"
      maxW="480px"
      mx="auto"
    >
      <Box
        position="absolute"
        top="-50%" left="-50%" w="200%" h="200%"
        bgGradient="radial(circle, rgba(255,255,255,0.08) 0%, transparent 70%)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top="0" right="0" w="60%" h="60%"
        bgGradient="radial(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)"
        pointerEvents="none"
        filter="blur(40px)"
      />
      <VStack spacing={6} align="stretch" position="relative" zIndex={1}>
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

