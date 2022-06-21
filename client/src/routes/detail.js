import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";
import Swal from "sweetalert2";
import Location from "./../components/Location";
import axios from "axios";

const Detail = ({ account }) => {
  const product_id = useParams().product_id;
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const [contents, setContents] = useState("");
  const [type, setType] = useState("");
  const [person, setPerson] = useState();
  const [postCode, setPostCode] = useState();
  const [basicAddr, setBasicAddr] = useState("");
  const [detailAddr, setDetailAddr] = useState("");
  const [price, setPrice] = useState();
  const [reserveArray, setReserveArray] = useState([]);

  const onChangeCheckOut = (e) => {
    const date = e.target.value;
    if (date <= checkIn) {
      Swal.fire({ icon: "error", title: "날짜를 다시 선택해주세요.", width: 600 });
      setCheckOut("");
    } else {
      setCheckOut(date);
    }
  };

  const getProductDetail = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:5000/detail/${product_id}`,
    }).then((res) => {
      if (res.data.success) {
        setImage(res.data.infoArray[0].image);
        setName(res.data.infoArray[0].info.product_name);
        setContents(res.data.infoArray[0].info.product_contents);
        setPerson(res.data.infoArray[0].info.people_number);
        setPostCode(res.data.infoArray[0].info.postal_code);
        setBasicAddr(res.data.infoArray[0].info.basic_addr);
        setDetailAddr(res.data.infoArray[0].info.detailed_addr);
        setPrice(res.data.infoArray[0].info.price);

        const product_type = res.data.infoArray[0].info.product_type;
        if (product_type === "apt") {
          setType("아파트");
        } else if (product_type === "officetel") {
          setType("오피스텔");
        } else if (product_type === "house") {
          setType("주택");
        } else if (product_type === "etc") {
          setType("기타");
        }
      } else {
        console.log(res.data);
      }
    });
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <Box w="50vw" h="80vh" borderWidth="8px" borderColor="pink.50" borderRadius="1vw">
      <Flex mt="2vw" justify="center">
        <Box w="20vw" h="25vh" textAlign="center" mr="2vw">
          <img src={image} alt="main_image"></img>
        </Box>
        <Box>
          <Flex>
            <Text fontSize="2xl" mr="1vw" mb="1vw">
              집 제목
            </Text>
            <Box
              w="16vw"
              h="4vh"
              borderWidth="4px"
              borderColor="BlackAlpha.50"
              borderRadius="1vh"
              textAlign="center"
            >
              <Text fontSize="2xl">{name}</Text>
            </Box>
          </Flex>
          <Flex>
            <Text fontSize="2xl" mr="1vw">
              집 설명
            </Text>
            <Box
              w="16vw"
              h="8vh"
              borderWidth="4px"
              borderColor="BlackAlpha.50"
              borderRadius="1vh"
              textAlign="center"
              mb="1vw"
            >
              <Text fontSize="2xl">{contents}</Text>
            </Box>
          </Flex>
          <Flex>
            <Text fontSize="2xl" mr="1vw" mb="1vw">
              집 유형
            </Text>
            <Box
              w="16vw"
              h="4vh"
              borderWidth="4px"
              borderColor="BlackAlpha.50"
              borderRadius="1vh"
              textAlign="center"
            >
              <Text fontSize="2xl">{type}</Text>
            </Box>
          </Flex>
          <Flex>
            <Text fontSize="2xl" mr="1vw" mb="1vw">
              최대 가능 인원
            </Text>
            <Box
              w="16vw"
              h="4vh"
              borderWidth="4px"
              borderColor="BlackAlpha.50"
              borderRadius="1vh"
              textAlign="center"
            >
              <Text fontSize="2xl">{person} 명</Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Box mt="1vw" ml="3vw">
        <Flex>
          <Text fontSize="2xl" mr="1vw">
            집 주소
          </Text>
          <Box
            w="24vw"
            h="7vh"
            borderWidth="4px"
            borderColor="BlackAlpha.50"
            borderRadius="1vh"
            textAlign="center"
            mr="1vw"
          >
            <Text fontSize="xl">
              ({postCode}) {basicAddr} {detailAddr}
            </Text>
          </Box>
          <Text fontSize="2xl" mr="1vw" mb="1vw">
            가격
          </Text>
          <Box
            w="10vw"
            h="4vh"
            borderWidth="4px"
            borderColor="BlackAlpha.50"
            borderRadius="1vh"
            textAlign="center"
          >
            <Text fontSize="2xl">{price} KLAY / 1박</Text>
          </Box>
        </Flex>
      </Box>
      <Flex justify="center" mt="1vw">
        <Location basicAddr={basicAddr} />
        <Box ml="3vw">
          <Flex mb="1vh">
            <Box w="6vw" h="4vh">
              <Text fontSize="2xl">체크인</Text>
            </Box>
            <Input
              type="date"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
              }}
            ></Input>
          </Flex>
          <Flex mb="1vw">
            <Box w="8vw" h="4vh">
              <Text fontSize="2xl">체크아웃</Text>
            </Box>
            <Input type="date" value={checkOut} onChange={onChangeCheckOut}></Input>
          </Flex>
          <Box textAlign="center">
            <Button colorScheme="pink" size="md">
              예약 가능 여부
            </Button>
          </Box>
          <Flex mt="2vw" mb="1vw">
            <Text fontSize="3xl" mr="1vw">
              총 가격
            </Text>
            <Box
              w="8vw"
              h="5vh"
              borderWidth="4px"
              borderColor="BlackAlpha.50"
              borderRadius="1vh"
              textAlign="center"
            >
              <Text fontSize="3xl">200 KLAY</Text>
            </Box>
          </Flex>
          <Box textAlign="center">
            <Button colorScheme="purple" size="lg">
              예약하기
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Detail;