import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { contractAbi, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const singer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    singer
  );

  console.log({ provider, singer, transactionContract });
};

export const TransactionProvider = ({ children }) => {
const [connectedAccount, setConnectAccount] = useState([]);

  const checkIfWalletConnected = async () => {
    if (!ethereum) {
      return alert("Please connect install MetaMask");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    console.log( accounts );
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert("Please connect install MetaMask");
      }
      const account = await ethereum.request({ method: "eth_requestAccounts" });
      if(connectedAccount.length === 0) {
          alert("You're already Connected to wallet");
      }
      if (account.length > 0) {
        setConnectAccount(account[0]);
      }
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);
  return (
    <TransactionContext.Provider value={{ connectWallet }}>
      {children}
    </TransactionContext.Provider>
  );
};
