import { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Tooltip } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Caver from "caver-js";
import { contractABI, contractAddress } from "./../contract/transferContract";

import qs from "qs";
axios.default.paramsSerializer = (params) => {
  return qs.stringify(params);
};

const ReservationCard = ({
  account,
  reservation_id,
  product_id,
  reservationMapping_id,
  image,
  name,
  checkin,
  checkout,
  password_check,
}) => {
  const [isPast, setIsPast] = useState(false);
  const [disabled, setDisabled] = useState(true);

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

  const isTodayCheckin = () => {
    const today = getDate(new Date());
    if (today === checkin) {
      setDisabled(false);
    }
  };

  const getPasswordFromServer = async () => {
    const data = {
      account: account,
      product_id: product_id,
      reservation_id: reservation_id,
    };

    axios.get("http://localhost:5000/get_password", { params: { data: data } }).then((res) => {
      if (res.data.success) {
        if (password_check === 0) {
          Swal.fire({ icon: "success", title: `비밀번호 : ${res.data.password}`, width: 600 }).then(
            () => {
              window.location.reload();
            }
          );
        } else {
          Swal.fire({ icon: "success", title: `비밀번호 : ${res.data.password}`, width: 600 });
        }
      } else {
        if (res.data.alert_message) {
          Swal.fire({ icon: "error", title: res.data.alert_message, width: 800 });
        }
      }
    });
  };

  const getPassword = async () => {
    const caver = new Caver(window.klaytn);
    const contract = caver.contract.create(contractABI, contractAddress);

    if (password_check === 0) {
      caver.klay
        .sendTransaction({
          type: "SMART_CONTRACT_EXECUTION",
          from: window.klaytn.selectedAddress,
          to: contractAddress,
          data: contract.methods
            .transferToOwner(reservationMapping_id, window.klaytn.selectedAddress)
            .encodeABI(),
          gas: 8000000,
        })
        .on("receipt", async (receipt) => {
          if (receipt.status) {
            await axios({
              method: "PUT",
              url: "http://localhost:5000/update_passwordcheck",
              data: { reservation_id: reservation_id, password_check: 1 },
            }).then((res) => {
              if (res.data.success) {
                getPasswordFromServer();
              } else {
                console.log(res.data);
              }
            });
          }
        })
        .on("error", (e) => {
          console.log(e);
        });
    } else {
      getPasswordFromServer();
    }
  };

  useEffect(() => {
    checkPast();
  }, [isPast]);

  useEffect(() => {
    isTodayCheckin();
  }, [disabled]);

  return (
    <Box w="17vw" h="40vh" bg="pink.50" opacity={isPast ? "0.6" : ""}>
      <Link to={`/detail/${product_id}`}>
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
        <Tooltip
          hasArrow
          label="체크인 하는 날에 비밀번호를 확인할 수 있습니다."
          shouldWrapChildren
          mt="3"
          isDisabled={!disabled}
        >
          <Button
            colorScheme="purple"
            size="lg"
            display="block"
            m="1vw auto auto auto"
            onClick={getPassword}
            disabled={disabled}
          >
            비밀번호 확인
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ReservationCard;
