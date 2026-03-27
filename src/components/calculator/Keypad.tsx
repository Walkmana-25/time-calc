import { Button, Grid, GridItem } from '@chakra-ui/react';

interface KeypadProps {
  onDigit: (digit: number) => void;
}

export function Keypad({ onDigit }: KeypadProps) {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const glassButtonStyle = {
    bg: "rgba(255, 255, 255, 0.12)",
    color: "white",
    backdropFilter: "blur(12px)",
    border: "1.5px solid rgba(255, 255, 255, 0.15)",
    _hover: {
      bg: "rgba(255, 255, 255, 0.22)",
      transform: "translateY(-3px)",
      borderColor: "rgba(255, 255, 255, 0.25)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
    },
    _active: {
      bg: "rgba(255, 255, 255, 0.3)",
      transform: "scale(0.96)"
    },
    transition: "all 0.25s cubic-bezier(.08,.52,.52,1)",
    boxShadow: "0 5px 18px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.1)"
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      {digits.map((digit) => (
        <GridItem key={digit}>
          <Button
            fontSize={{ base: '3xl', md: '4xl' }}
            height={{ base: '24', md: '32' }}
            width="100%"
            minW={0}
            borderRadius="2xl"
            fontWeight="600"
            onClick={() => onDigit(digit)}
            {...glassButtonStyle}
          >
            {digit}
          </Button>
        </GridItem>
      ))}
      <GridItem colSpan={3}>
        <Button
          fontSize={{ base: '3xl', md: '4xl' }}
          height={{ base: '24', md: '32' }}
          width="100%"
          minW={0}
          borderRadius="2xl"
          fontWeight="600"
          onClick={() => onDigit(0)}
          {...glassButtonStyle}
        >
          0
        </Button>
      </GridItem>
    </Grid>
  );
}

