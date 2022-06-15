import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Host from "./routes/host";
import Register from "./routes/register";
import Caver from "caver-js";

function App() {
  const [account, setAccount] = useState("");

  async function getAccount() {
    if (typeof window.klaytn !== "undefined") {
      const provider = window["klaytn"];
      try {
        const account = await window.klaytn.enable();
        setAccount(account[0]);

        // const caver = new Caver(window.klaytn);
        // const balance = await caver.klay.getBalance(account);
        // console.log(balance);
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    getAccount();
  }, [account]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<Main />} /> */}
          <Route path="/host" element={<Host />} />
          <Route path="/host/register" element={<Register account={account} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
