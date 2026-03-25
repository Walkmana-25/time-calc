import { Box, Text } from '@chakra-ui/react';
import type { TimeValue } from '../../types/time';
import { formatTime } from '../../utils/timeCalculator';

interface DisplayProps {
  value: TimeValue;
  format: 'dd:hh:mm:ss' | 'hh:mm:ss' | 'mm:ss' | 'ss';
  expression?: string;
}

export function Display({ value, format, expression }: DisplayProps) {
  return (
    <Box
      bg="rgba(0, 0, 0, 0.4)"
      px={6}
      pt={4}
      pb={5}
      borderRadius="2xl"
      boxShadow="inset 0 2px 10px rgba(0,0,0,0.5)"
      border="1px solid rgba(255, 255, 255, 0.1)"
      textAlign="right"
      minH="120px"
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      justifyContent="flex-end"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="2px"
        bgGradient="linear(to-r, transparent, whiteAlpha.400, transparent)"
      />
      {/* Expression row */}
      <Text
        fontSize="md"
        color="whiteAlpha.600"
        fontFamily="'Inter', sans-serif"
        letterSpacing="wide"
        noOfLines={1}
        minH="24px"
        mb={1}
      >
        {expression ?? ''}
      </Text>
      {/* Current value */}
      <Text
        fontSize={{ base: '4xl', md: '5xl' }}
        fontWeight="700"
        color="white"
        fontFamily="'Inter', sans-serif"
        letterSpacing="tight"
        noOfLines={1}
        style={{ textShadow: "0 0 20px rgba(255,255,255,0.3)" }}
      >
        {formatTime(value, format)}
      </Text>
    </Box>
  );
}

