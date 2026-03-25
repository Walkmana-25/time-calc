import { Button, Grid, GridItem } from '@chakra-ui/react';

interface KeypadProps {
  onDigit: (digit: number) => void;
}

export function Keypad({ onDigit }: KeypadProps) {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const glassButtonStyle = {
    bg: "rgba(255, 255, 255, 0.1)",
    color: "white",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    _hover: { bg: "rgba(255, 255, 255, 0.2)", transform: "translateY(-2px)" },
    _active: { bg: "rgba(255, 255, 255, 0.3)", transform: "scale(0.95)" },
    transition: "all 0.2s cubic-bezier(.08,.52,.52,1)",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={3}>
      {digits.map((digit) => (
        <GridItem key={digit}>
          <Button
            size="lg"
            fontSize="2xl"
            height="16"
            width="100%"
            minW={0}
            borderRadius="xl"
            onClick={() => onDigit(digit)}
            {...glassButtonStyle}
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
          borderRadius="xl"
          onClick={() => onDigit(0)}
          {...glassButtonStyle}
        >
          0
        </Button>
      </GridItem>
    </Grid>
  );
}
