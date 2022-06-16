import { useState, useEffect } from "react";
import ProductCard from "./../components/ProductCard";
import { Grid } from "@chakra-ui/react";
import axios from "axios";

const Main = () => {
  const [productArray, setProductArray] = useState([]);

  const getProductInfo = async () => {
    await axios({
      method: "GET",
      url: "http://localhost:5000/",
    }).then((res) => {
      if (res.data.success) {
        setProductArray(res.data.infoArray);
      } else {
        console.log(res.data);
      }
    });
  };

  useEffect(() => {
    getProductInfo();
  }, []);

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="2vw">
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
