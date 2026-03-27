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
    fontSize: { base: '2xl', md: '3xl' },
    height: { base: '24', md: '32' },
    minW: 0,
    borderRadius: "2xl",
    backdropFilter: "blur(12px)",
    border: "1.5px solid rgba(255, 255, 255, 0.15)",
    transition: "all 0.25s cubic-bezier(.08,.52,.52,1)",
    fontWeight: "600",
    boxShadow: "0 5px 18px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.1)",
    _active: { transform: "scale(0.96)" }
  };

  const getOpStyle = (op: Operation) => ({
    ...baseBtnStyle,
    bg: activeOperation === op
      ? "rgba(96, 165, 250, 0.9)"
      : "rgba(59, 130, 246, 0.6)",
    color: "white",
    borderColor: activeOperation === op
      ? "rgba(96, 165, 250, 0.4)"
      : "rgba(59, 130, 246, 0.3)",
    _hover: {
      bg: "rgba(96, 165, 250, 0.95)",
      transform: "translateY(-3px)",
      borderColor: "rgba(96, 165, 250, 0.5)",
      boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)"
    },
    ...(activeOperation === op && {
      boxShadow: "0 8px 20px rgba(59, 130, 246, 0.5), inset 0 2px 4px rgba(255,255,255,0.2)"
    })
  });

  const clearStyle = {
    ...baseBtnStyle,
    bg: "rgba(239, 68, 68, 0.6)",
    color: "white",
    borderColor: "rgba(239, 68, 68, 0.3)",
    _hover: {
      bg: "rgba(239, 68, 68, 0.85)",
      transform: "translateY(-3px)",
      borderColor: "rgba(239, 68, 68, 0.5)",
      boxShadow: "0 8px 20px rgba(239, 68, 68, 0.4)"
    },
  };

  const clearEntryStyle = {
    ...baseBtnStyle,
    bg: "rgba(245, 158, 11, 0.6)",
    color: "white",
    borderColor: "rgba(245, 158, 11, 0.3)",
    _hover: {
      bg: "rgba(245, 158, 11, 0.85)",
      transform: "translateY(-3px)",
      borderColor: "rgba(245, 158, 11, 0.5)",
      boxShadow: "0 8px 20px rgba(245, 158, 11, 0.4)"
    },
  };

  const calcStyle = {
    ...baseBtnStyle,
    bg: "linear-gradient(135deg, rgba(16, 185, 129, 0.85), rgba(5, 150, 105, 0.95))",
    color: "white",
    borderColor: "rgba(16, 185, 129, 0.4)",
    _hover: {
      filter: "brightness(1.15)",
      transform: "translateY(-3px)",
      boxShadow: "0 8px 24px rgba(16, 185, 129, 0.5)"
    },
    gridColumn: "3 / span 2",
    boxShadow: "0 5px 18px rgba(16, 185, 129, 0.3), inset 0 1px 2px rgba(255,255,255,0.2)"
  };

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
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
