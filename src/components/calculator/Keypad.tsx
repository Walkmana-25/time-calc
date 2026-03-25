import { Button, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';

interface KeypadProps {
  onDigit: (digit: number) => void;
}

export function Keypad({ onDigit }: KeypadProps) {
  const btnBg = useColorModeValue('gray.200', 'gray.600');
  const btnHoverBg = useColorModeValue('gray.300', 'gray.500');
  const textColor = useColorModeValue('gray.900', 'white');

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={2}>
      {digits.map((digit) => (
        <GridItem key={digit}>
          <Button
            size="lg"
            fontSize="2xl"
            height="16"
            width="100%"
            minW={0}
            bg={btnBg}
            color={textColor}
            _hover={{ bg: btnHoverBg }}
            _active={{ bg: btnHoverBg, transform: 'scale(0.98)' }}
            boxShadow="sm"
            borderRadius="md"
            onClick={() => onDigit(digit)}
          >
            {digit}
          </Button>
        </GridItem>
      ))}
      <GridItem colSpan={3}>
        <Button
          size="lg"
          fontSize="2xl"
          height="16"
          width="100%"
          minW={0}
          bg={btnBg}
          color={textColor}
          _hover={{ bg: btnHoverBg }}
          _active={{ bg: btnHoverBg, transform: 'scale(0.98)' }}
          boxShadow="sm"
          borderRadius="md"
          onClick={() => onDigit(0)}
        >
          0
        </Button>
      </GridItem>
    </Grid>
  );
}
