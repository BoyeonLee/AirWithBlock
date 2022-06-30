import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Host from "./routes/host";
import Register from "./routes/register";
import Main from "./routes/main";
import Detail from "./routes/detail";
import MyReservation from "./routes/my_reservation";
import ReservationStatus from "./routes/reservation_status";
import Swal from "sweetalert2";
import axios from "axios";

function App() {
  const [account, setAccount] = useState("");

  async function getAccount() {
    if (typeof window.klaytn !== "undefined") {
      // const provider = window["klaytn"];
      try {
        const networkVersion = await window.klaytn.networkVersion;
        if (networkVersion !== 1001) {
          return Swal.fire({ icon: "error", title: "test network로 변경해 주세요.", width: 600 });
        }
        const account = await window.klaytn.enable();
        setAccount(account[0]);

        await axios({
          method: "POST",
          url: "http://localhost:5000/get_keys",
          data: { account: account[0] },
        }).then((res) => {
          if (res.data.success) {
            return;
          } else {
            console.log(res.data.message);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <BrowserRouter>
      <Layout account={account}>
        <Routes>
          <Route path="/" element={<Main account={account} />} />
          <Route path="/host" element={<Host />} />
          <Route path="/host/register" element={<Register account={account} />} />
          <Route path="/detail/:product_id" element={<Detail account={account} />} />
          <Route path="/my-reservation" element={<MyReservation account={account} />} />
          <Route
            path="/host/reservation-status"
            element={<ReservationStatus account={account} />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
