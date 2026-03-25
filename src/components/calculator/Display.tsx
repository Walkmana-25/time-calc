import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import type { TimeValue } from '../../types/time';
import { formatTime } from '../../utils/timeCalculator';

interface DisplayProps {
  value: TimeValue;
  format: 'dd:hh:mm:ss' | 'hh:mm:ss' | 'mm:ss' | 'ss';
}

export function Display({ value, format }: DisplayProps) {
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.900', 'white');

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="lg"
      boxShadow="sm"
      textAlign="right"
      minH="80px"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
    >
      <Text
        fontSize="4xl"
        fontWeight="bold"
        color={textColor}
        fontFamily="mono"
        noOfLines={1}
      >
        {formatTime(value, format)}
      </Text>
    </Box>
  );
}
