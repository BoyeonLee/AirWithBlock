import { useState, useEffect } from "react";
import { Heading, Grid, Box, Flex, Text, Button } from "@chakra-ui/react";
import MyHouseCard from "./../components/MyHouseCard";
import axios from "axios";

const MyHouse = ({ account }) => {
  const [myHouseArray, setMyHouseArray] = useState([]);

  const getMyHouseArray = () => {
    axios
      .get("http://localhost:5000/host/my-house", { params: { account: account } })
      .then((res) => {
        if (res.status === 200) {
          setMyHouseArray(res.data.myHouseArray);
        } else {
          console.error(res.data);
        }
      });
  };

  useEffect(() => {
    getMyHouseArray();
  }, [account]);

  return (
    <>
      <Heading size="2xl">나의 집</Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap="2vw" w="75vw" h="78vh" mt="1vw">
        {myHouseArray &&
          myHouseArray.map((v, i) => {
            return (
              <MyHouseCard
                key={i}
                account={account}
                product_id={v.product_id}
                image={v.image}
                name={v.name}
                basic_addr={v.basic_addr}
                detailed_addr={v.detailed_addr}
              />
            );
          })}
      </Grid>
    </>
  );
};

export default MyHouse;
