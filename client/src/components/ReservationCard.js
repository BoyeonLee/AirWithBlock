import { useState, useEffect } from "react";
import { Box, Flex, Text, Link } from "@chakra-ui/react";

const ReservationCard = ({ id, image, name, checkin, checkout }) => {
  const [isPast, setIsPast] = useState(false);

  const checkPast = () => {
    const today = new Date();
    const checkout_day = new Date(checkout);
    if (today > checkout_day) {
      setIsPast(true);
    }
  };

  const getDate = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    const dateString = year + "/" + month + "/" + day;
    return dateString;
  };
  const re_checkin = getDate(new Date(checkin));
  const re_checkout = getDate(new Date(checkout));

  useEffect(() => {
    checkPast();
  }, [checkout]);
  return (
    <Box w="17vw" h="35vh" bg="pink.50" opacity={isPast ? "0.6" : ""}>
      <Link to={`detail/${id}`}>
        <Flex w="14vw" h="18vh" m="2vw auto 0 auto" justify="center">
          <img src={image} alt="main_image"></img>
        </Flex>
      </Link>
      <Box textAlign="center" mt="1vw">
        <Text fontSize="2xl" mb="0.5vw">
          {name}
        </Text>
        <Text fontSize="xl">
          예약 날짜 : {re_checkin} ~ {re_checkout}
        </Text>
      </Box>
    </Box>
  );
};

export default ReservationCard;
