import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

export default function SimplePage() {
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading as="h1" size="xl" mb={2}>
            Simple Chakra UI Page
          </Heading>
          <Text fontSize="lg" color="gray.600">
            A simple page to test Chakra UI integration with Remix
          </Text>
        </Box>

        <Box bg={bg} p={4} borderRadius="md" shadow="md">
          <VStack spacing={4}>
            <Text>This is a simple page using Chakra UI components</Text>
            <Button colorScheme="blue">Click Me</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
