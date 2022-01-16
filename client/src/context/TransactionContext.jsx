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
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);

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

  const getAllTransactions = async () => {
    try {
      if (!ethereum) {
        return alert("Please connect install MetaMask");
      }
      const transactionContract = getEthereumContract();

      const avaliableTransactions =
        await transactionContract.getAllTransactions();

      const structredTransactions = avaliableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18),
        })
      );

      setTransactions(structredTransactions);
    } catch (e) {
      throw new Error(e);
    }
  };

  const checkIfWalletConnected = async () => {
    if (!ethereum) {
      return alert("Please connect install MetaMask");
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });
    getAllTransactions();
  };

  const checkIfTransactionExists = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTranscationCount();
      localStorage.setItem("transactionCount", transactionCount);
    } catch (e) {
      console.error(e);
    }
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
        localStorage.setItem("connectedAccount", account[0]);
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
        const transactionCount =
          await transactionContract.getTranscationCount();
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
    checkIfTransactionExists();
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
        setConnectAccount,
        transactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
