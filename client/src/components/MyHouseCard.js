import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const MyHouseCard = ({ account, product_id, image, name, basic_addr, detailed_addr }) => {
  return (
    <Box w="17vw" h="40vh" bg="pink.50">
      <Link to={`/detail/${product_id}`}>
        <Flex w="14vw" h="18vh" m="1vw auto 0 auto" justify="center">
          <img src={image} alt="main_image"></img>
        </Flex>
      </Link>
      <Box textAlign="center" mt="1vw">
        <Text fontSize="2xl" mb="0.5vw">
          {name}
        </Text>
        <Text fontSize="md">
          {basic_addr}
          <br />
          {detailed_addr}
        </Text>
        <Flex justify="center" mt="1vw">
          <Button colorScheme="purple" size="md" display="block" mr="1vh">
            수정하기
          </Button>
          <Button colorScheme="blue" size="md" display="block">
            삭제하기
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default MyHouseCard;
