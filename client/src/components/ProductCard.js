import { Box, Text } from "@chakra-ui/react";

const ProductCard = ({ mainImage, name, price }) => {
  return (
    <Box w="17vw" h="38vh" bg="pink.50">
      <Box w="14vw" h="18vh" m="2vw auto 0 auto">
        <img src={mainImage} alt="main_image"></img>
        <Box textAlign="center" mt="1vw">
          <Text fontSize="2xl" mb="0.5vw">
            {name}
          </Text>
          <Text fontSize="xl">{price} KLAY / 1박</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
