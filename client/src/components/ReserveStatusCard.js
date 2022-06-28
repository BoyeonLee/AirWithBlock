import { Link, Box, Flex, Text, Button } from "@chakra-ui/react";

const ReserveStatusCard = ({ id, image, name, checkin, checkout, totalPrice }) => {
  return (
    <Box w="17vw" h="40vh" bg="pink.50">
      <Link to={`detail/${id}`}>
        <Flex w="14vw" h="18vh" m="1.5vw auto 0 auto" justify="center">
          <img src={image} alt="main_image"></img>
        </Flex>
      </Link>
      <Box textAlign="center" mt="0.5vw">
        <Text fontSize="2xl" mb="0.5vw">
          {name}
        </Text>
        <Text fontSize="xl" mb="0.2vw">
          예약 날짜 : {checkin} ~ {checkout}
        </Text>
        <Text fontSize="xl" mb="0.5vw">
          총 금액 : {totalPrice} KLAY
        </Text>
        <Button colorScheme="purple" size="md" display="block" m="auto">
          비밀번호 등록
        </Button>
      </Box>
    </Box>
  );
};

export default ReserveStatusCard;
