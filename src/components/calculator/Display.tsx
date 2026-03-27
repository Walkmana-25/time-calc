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
      bg="rgba(0, 0, 0, 0.5)"
      backdropFilter="blur(8px)"
      px={{ base: 6, md: 8 }}
      pt={{ base: 5, md: 6 }}
      pb={{ base: 6, md: 7 }}
      borderRadius="3xl"
      boxShadow="inset 0 3px 15px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.2)"
      border="2px solid rgba(255, 255, 255, 0.12)"
      textAlign="right"
      minH={{ base: "140px", md: "160px" }}
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      justifyContent="flex-end"
      position="relative"
      overflow="hidden"
    >
      {/* Top gradient line */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="3px"
        bgGradient="linear(to-r, transparent, rgba(59, 130, 246, 0.6), transparent)"
      />
      {/* Subtle glow effect */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="80%"
        h="80%"
        bgGradient="radial(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)"
        pointerEvents="none"
      />
      {/* Expression row */}
      <Text
        fontSize={{ base: "lg", md: "xl" }}
        color="whiteAlpha.700"
        fontFamily="'Inter', sans-serif"
        letterSpacing="wider"
        noOfLines={1}
        minH={{ base: "28px", md: "32px" }}
        mb={2}
        fontWeight="500"
        position="relative"
        zIndex={1}
      >
        {expression ?? ''}
      </Text>
      {/* Current value */}
      <Text
        fontSize={{ base: '4xl', md: '6xl' }}
        fontWeight="800"
        color="white"
        fontFamily="'Inter', sans-serif"
        letterSpacing="tight"
        noOfLines={1}
        style={{
          textShadow: "0 0 30px rgba(59, 130, 246, 0.5), 0 2px 4px rgba(0,0,0,0.3)"
        }}
        position="relative"
        zIndex={1}
      >
        {formatTime(value, format)}
      </Text>
    </Box>
  );
}

