import { useState, useEffect } from "react";
import { Grid, Heading } from "@chakra-ui/react";
import ReservationCard from "./../components/ReservationCard";
import axios from "axios";

const MyReservation = ({ account }) => {
  const [reservationArray, setReservationArray] = useState([]);
  const getReservation = () => {
    axios
      .get("http://localhost:5000/my-reservation", { params: { account: account } })
      .then((res) => {
        if (res.data.success) {
          setReservationArray(res.data.reservationArray);
        } else {
          console.log(res.data);
        }
      });
  };

  useEffect(() => {
    getReservation();
  }, [account]);

  return (
    <>
      <Heading size="2xl">나의 예약</Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap="2vw" w="75vw" h="75vh" mt="1vw">
        {reservationArray &&
          reservationArray.map((v, i) => {
            return (
              <ReservationCard
                key={i}
                id={v.id}
                image={v.image}
                name={v.name}
                checkin={v.checkin}
                checkout={v.checkout}
              />
            );
          })}
      </Grid>
    </>
  );
};

export default MyReservation;
