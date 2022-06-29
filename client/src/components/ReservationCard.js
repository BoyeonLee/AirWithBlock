import { useState, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ReservationCard = ({ id, image, name, checkin, checkout }) => {
  const [isPast, setIsPast] = useState(false);

  const checkPast = () => {
    const today = new Date();
    const checkout_day = new Date(checkout);
    if (today > checkout_day) {
      setIsPast(true);
    }
  };

  useEffect(() => {
    checkPast();
  }, [checkout]);
  return (
    <Box w="17vw" h="35vh" bg="pink.50" opacity={isPast ? "0.6" : ""}>
      <Link to={`/detail/${id}`}>
        <Flex w="14vw" h="18vh" m="2vw auto 0 auto" justify="center">
          <img src={image} alt="main_image"></img>
        </Flex>
      </Link>
      <Box textAlign="center" mt="1vw">
        <Text fontSize="2xl" mb="0.5vw">
          {name}
        </Text>
        <Text fontSize="xl">
          예약 날짜 : {checkin} ~ {checkout}
        </Text>
      </Box>
    </Box>
  );
};

export default ReservationCard;
