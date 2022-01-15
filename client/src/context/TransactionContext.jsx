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

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectAccount] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (e, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const checkIfWalletConnected = async () => {
    if (!ethereum) {
      return alert("Please connect install MetaMask");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    console.log(accounts);
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert("Please connect install MetaMask");
      }
      const account = await ethereum.request({ method: "eth_requestAccounts" });
      if (connectedAccount.length === 0) {
        alert("You're already Connected to wallet");
      }
      if (account.length > 0) {
        setConnectAccount(account[0]);
        localStorage.setItem('connectedAccount', account[0]);
      }
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) {
        return alert("Plese connect or install MetaMask");
      }
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();

      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });

      setIsLoading(true);
      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      await transactionHash.wait();

      if (transactionHash) {
        setIsLoading(false);
        console.info("Transaction Successful");
        const transactionCount = await transactionContract.getTranscationCount();
        setTransactionCount(transactionCount.toNumber());
        // localStorage.setItem
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
    <TransactionContext.Provider
      value={{
        connectWallet,
        formData,
        connectedAccount,
        handleChange,
        sendTransaction,
        isLoading,
        setConnectAccount
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
