import { Button, Grid } from '@chakra-ui/react';
import type { Operation } from '../../types/time';

interface OperationButtonsProps {
  onOperation: (op: Operation) => void;
  onCalculate: () => void;
  onClear: () => void;
  onClearEntry: () => void;
  activeOperation: Operation | null;
}

export function OperationButtons({
  onOperation,
  onCalculate,
  onClear,
  onClearEntry,
  activeOperation,
}: OperationButtonsProps) {

  const baseBtnStyle = {
    fontSize: { base: '2xl', md: '2xl' },
    height: { base: '20', md: '20' },
    minW: 0,
    borderRadius: "xl",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "all 0.2s cubic-bezier(.08,.52,.52,1)",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    _active: { transform: "scale(0.95)" }
  };

  const getOpStyle = (op: Operation) => ({
    ...baseBtnStyle,
    bg: activeOperation === op ? "rgba(96, 165, 250, 0.8)" : "rgba(59, 130, 246, 0.5)",
    color: "white",
    _hover: { bg: "rgba(96, 165, 250, 0.9)", transform: "translateY(-2px)" },
  });

  const clearStyle = {
    ...baseBtnStyle,
    bg: "rgba(239, 68, 68, 0.5)",
    color: "white",
    _hover: { bg: "rgba(239, 68, 68, 0.8)", transform: "translateY(-2px)" },
  };

  const clearEntryStyle = {
    ...baseBtnStyle,
    bg: "rgba(245, 158, 11, 0.5)",
    color: "white",
    _hover: { bg: "rgba(245, 158, 11, 0.8)", transform: "translateY(-2px)" },
  };

  const calcStyle = {
    ...baseBtnStyle,
    bg: "linear-gradient(135deg, rgba(16, 185, 129, 0.8), rgba(5, 150, 105, 0.9))",
    color: "white",
    _hover: { filter: "brightness(1.1)", transform: "translateY(-2px)" },
    gridColumn: "3 / span 2"
  };

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={3}>
      <Button {...clearStyle} onClick={onClear}>C</Button>
      <Button {...clearEntryStyle} onClick={onClearEntry}>CE</Button>
      <Button {...getOpStyle('add')} onClick={() => onOperation('add')}>+</Button>
      <Button {...getOpStyle('subtract')} onClick={() => onOperation('subtract')}>-</Button>

      <Button {...getOpStyle('multiply')} onClick={() => onOperation('multiply')}>×</Button>
      <Button {...getOpStyle('divide')} onClick={() => onOperation('divide')}>÷</Button>
      <Button {...calcStyle} onClick={onCalculate}>=</Button>
    </Grid>
  );
}
