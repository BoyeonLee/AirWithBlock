import { useState, useEffect } from "react";
import {
  Heading,
  Box,
  Flex,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  CloseButton,
  Tooltip,
} from "@chakra-ui/react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

const ReserveStatusCard = ({
  owner_account,
  reservation_id,
  product_id,
  image,
  name,
  checkin,
  checkout,
  totalPrice,
  disabled,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [disabledState, setDisabledState] = useState(disabled);
  const [changeDisabled, setChangeDisabled] = useState(false);
  const [heading, setHeading] = useState("");
  const [changeLabel, setChangeLabel] = useState("");

  const modalStyle = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.45)",
      zIndex: 10,
    },
    content: {
      width: "30vw",
      height: "35vh",
      textAlign: "center",
      background: "#f8f0fc",
      overflow: "auto",
      margin: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "14px",
      outline: "none",
      zIndex: 10,
      paddingTop: "5vh",
    },
  };

  const checkPassword = async () => {
    if (password1 !== password2) {
      Swal.fire({ icon: "error", title: "비밀번호가 일치하지 않습니다.", width: 600 }).then(() => {
        setPassword1("");
        setPassword2("");
      });
      return;
    } else {
      const data = {
        product_id: product_id,
        reservation_id: reservation_id,
        owner_account: owner_account,
        password: password1,
      };

      await axios({
        method: "POST",
        url: "http://localhost:5000/host/password",
        data: data,
      }).then((res) => {
        if (res.status === 200) {
          Swal.fire({ icon: "success", title: res.data.message, width: 600 }).then(() => {
            setModalIsOpen(false);
            setDisabledState(true);
            window.location.reload();
          });
        } else {
          console.error(res.data);
        }
      });
    }
  };

  const changePassword = async () => {
    if (password1 !== password2) {
      Swal.fire({ icon: "error", title: "비밀번호가 일치하지 않습니다.", width: 600 }).then(() => {
        setPassword1("");
        setPassword2("");
      });
      return;
    } else {
      const data = {
        product_id: product_id,
        reservation_id: reservation_id,
        owner_account: owner_account,
        password: password1,
      };

      await axios({
        method: "PUT",
        url: "http://localhost:5000/change_password",
        data: data,
      }).then((res) => {
        if (res.status === 200) {
          Swal.fire({ icon: "success", title: res.data.message, width: 600 }).then(() => {
            setModalIsOpen(false);
            setDisabledState(true);
          });
        } else {
          console.error(res.data);
        }
      });
    }
  };

  const checkChange = () => {
    if (disabledState === false) {
      setChangeDisabled(true);
      setChangeLabel("비밀번호를 등록하고 수정할 수 있습니다.");
    } else if (new Date() > new Date(checkin)) {
      setChangeDisabled(true);
      setChangeLabel("체크인 이후에는 비밀번호를 수정할 수 없습니다.");
    }
  };

  useEffect(() => {
    checkChange();
  }, []);

  return (
    <Box w="17vw" h="40vh" bg="pink.50">
      <Link to={`/detail/${product_id}`}>
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
        <Flex justify="center">
          <Button
            disabled={disabledState}
            colorScheme="purple"
            size="md"
            mr="1vw"
            onClick={() => {
              setModalIsOpen(true);
              setHeading("비밀번호 등록");
            }}
          >
            비밀번호 등록
          </Button>
          <Tooltip
            hasArrow
            label={changeLabel}
            shouldWrapChildren
            mt="3"
            isDisabled={!changeDisabled}
          >
            <Button
              disabled={changeDisabled}
              colorScheme="blue"
              size="md"
              onClick={() => {
                setModalIsOpen(true);
                setHeading("비밀번호 수정");
              }}
            >
              비밀번호 수정
            </Button>
          </Tooltip>
        </Flex>
        <Modal isOpen={modalIsOpen} style={modalStyle}>
          <CloseButton
            size="lg"
            position="fixed"
            right="36vw"
            top="17vw"
            onClick={() => setModalIsOpen(false)}
          />
          <Heading size="xl">{heading}</Heading>
          <Box m="1.5vw auto auto 2vh">
            <FormControl isRequired>
              <Flex mb="1vw">
                <FormLabel w="8vw" fontSize="xl" ml="1vh">
                  비밀번호
                </FormLabel>
                <Input
                  size="md"
                  type="password"
                  w="16vw"
                  value={password1}
                  onChange={(e) => {
                    setPassword1(e.target.value);
                  }}
                />
              </Flex>
            </FormControl>
            <FormControl isRequired>
              <Flex mb="1vw">
                <FormLabel w="8vw" fontSize="xl" ml="1vh">
                  비밀번호 재확인
                </FormLabel>
                <Input
                  size="md"
                  type="password"
                  w="16vw"
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                />
              </Flex>
            </FormControl>
            {heading === "비밀번호 등록" ? (
              <Button
                colorScheme="purple"
                size="lg"
                display="block"
                m="2vw auto auto auto"
                onClick={checkPassword}
              >
                비밀번호 등록
              </Button>
            ) : (
              <Button
                colorScheme="purple"
                size="lg"
                display="block"
                m="2vw auto auto auto"
                onClick={changePassword}
              >
                비밀번호 수정
              </Button>
            )}
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default ReserveStatusCard;
