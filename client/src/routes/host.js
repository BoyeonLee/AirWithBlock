import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Host = () => {
  return (
    <Flex alignItems="center" w="70vw" h="75vh" justifyContent="space-evenly">
      <Link to="/host/reservation-status">
        <Box w="25vw" h="45vh" bg="pink.50" borderRadius={30} textAlign="center" lineHeight="45vh">
          <Text fontWeight="bold" fontSize="5xl" color="#495057">
            예약 현황
          </Text>
        </Box>
      </Link>
      <Link to="/host/register">
        <Box w="25vw" h="45vh" bg="pink.50" borderRadius={30} textAlign="center" lineHeight="45vh">
          <Text fontWeight="bold" fontSize="5xl" color="#495057">
            집 등록하기
          </Text>
        </Box>
      </Link>
    </Flex>
  );
};

export default Host;
