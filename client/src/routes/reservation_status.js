import { useState, useEffect } from "react";
import ReserveStatusCard from "./../components/ReserveStatusCard";
import { Heading, Grid } from "@chakra-ui/react";
import axios from "axios";

const ReservationStatus = ({ account }) => {
  const [reserveStatusArray, setReserveStatusArray] = useState([]);

  const getReserveStatus = () => {
    axios
      .get("http://localhost:5000/host/reservation-status", { params: { account: account } })
      .then((res) => {
        if (res.data.success) {
          setReserveStatusArray(res.data.reserveStatusArray);
        } else {
          console.log(res.data);
        }
      });
  };

  useEffect(() => {
    getReserveStatus();
  }, [account]);

  return (
    <>
      <Heading size="2xl">예약 현황</Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap="2vw" w="75vw" h="78vh" mt="1vw">
        {reserveStatusArray &&
          reserveStatusArray.map((v, i) => {
            return (
              <ReserveStatusCard
                key={i}
                owner_account={account}
                reservation_id={v.reservation_id}
                product_id={v.product_id}
                image={v.image}
                name={v.name}
                checkin={v.checkin}
                checkout={v.checkout}
                totalPrice={v.totalPrice}
              />
            );
          })}
      </Grid>
    </>
  );
};

export default ReservationStatus;
