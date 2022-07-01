import { useState, useEffect } from "react";
import ProductCard from "./../components/ProductCard";
import { Grid } from "@chakra-ui/react";
import axios from "axios";

const Main = ({ account }) => {
  const [productArray, setProductArray] = useState([]);

  const getProductInfo = async () => {
    await axios({
      method: "GET",
      url: "http://localhost:5000/",
    }).then((res) => {
      if (res.status === 200) {
        setProductArray(res.data.infoArray);
      } else {
        console.error(res.data);
      }
    });
  };

  useEffect(() => {
    getProductInfo();
  }, []);

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="2vw" w="75vw" h="78vh">
      {productArray &&
        productArray.map((v, i) => {
          return (
            <ProductCard key={i} id={v.id} mainImage={v.image} name={v.name} price={v.price} />
          );
        })}
    </Grid>
  );
};

export default Main;
