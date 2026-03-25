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
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={2}>
      {/* Row 1 */}
      <Button
        size="lg"
        fontSize="xl"
        height="16"
        minW={0}
        bg="orange.400"
        color="white"
        _hover={{ bg: 'orange.500' }}
        _active={{ transform: 'scale(0.98)' }}
        boxShadow="sm"
        borderRadius="md"
        onClick={onClear}
      >
        C
      </Button>

      <Button
        size="lg"
        fontSize="xl"
        height="16"
        minW={0}
        bg="orange.300"
        color="white"
        _hover={{ bg: 'orange.400' }}
        _active={{ transform: 'scale(0.98)' }}
        boxShadow="sm"
        borderRadius="md"
        onClick={onClearEntry}
      >
        CE
      </Button>

      <Button
        size="lg"
        fontSize="xl"
        height="16"
        minW={0}
        bg={activeOperation === 'add' ? 'blue.600' : 'blue.500'}
        color="white"
        _hover={{ bg: 'blue.600' }}
        _active={{ transform: 'scale(0.98)' }}
        boxShadow="sm"
        borderRadius="md"
        onClick={() => onOperation('add')}
      >
        +
      </Button>

      <Button
        size="lg"
        fontSize="xl"
        height="16"
        minW={0}
        bg={activeOperation === 'subtract' ? 'blue.600' : 'blue.500'}
        color="white"
        _hover={{ bg: 'blue.600' }}
        _active={{ transform: 'scale(0.98)' }}
        boxShadow="sm"
        borderRadius="md"
        onClick={() => onOperation('subtract')}
      >
        -
      </Button>

      {/* Row 2 */}
      <Button
        size="lg"
        fontSize="xl"
        height="16"
        minW={0}
        bg={activeOperation === 'multiply' ? 'blue.600' : 'blue.500'}
        color="white"
        _hover={{ bg: 'blue.600' }}
        _active={{ transform: 'scale(0.98)' }}
        boxShadow="sm"
        borderRadius="md"
        onClick={() => onOperation('multiply')}
      >
        ×
      </Button>

      <Button
        size="lg"
        fontSize="xl"
        height="16"
        minW={0}
        bg={activeOperation === 'divide' ? 'blue.600' : 'blue.500'}
        color="white"
        _hover={{ bg: 'blue.600' }}
        _active={{ transform: 'scale(0.98)' }}
        boxShadow="sm"
        borderRadius="md"
        onClick={() => onOperation('divide')}
      >
        ÷
      </Button>

      <Button
        size="lg"
        fontSize="xl"
        height="16"
        minW={0}
        bg="green.500"
        color="white"
        _hover={{ bg: 'green.600' }}
        _active={{ transform: 'scale(0.98)' }}
        boxShadow="sm"
        borderRadius="md"
        gridColumn="3 / span 2"
        onClick={onCalculate}
      >
        =
      </Button>
    </Grid>
  );
}
