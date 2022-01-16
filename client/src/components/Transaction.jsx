import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { useFetch } from "../useHooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionCard = ({ item }) => {
  const { formData } = useContext(TransactionContext);
  const { keyword } = formData;
  const [gif, error, loading] = useFetch(keyword);
  return (
    <div className="bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] flex-col p-3 rounded-md hover:shadow-2xl">
      <div className="flex flex-col items-center w-full mt-3">
        <div className="w-full mb-6 p-2">
          <a
            href={`https://ropsten.etherscan.io/address/${item.addressFrom}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base">
              From: {shortenAddress(item.addressFrom)}
            </p>
          </a>
          <a
            href={`https://ropsten.etherscan.io/address/${item.addressTo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base">
              To: {shortenAddress(item.addressTo)}
            </p>
          </a>
          <p className="text-white text-base">Amount: {item.amount} ETH</p>
          {item?.message && (
            <>
              <br />
              <p className="text-white text-base">Message: {item.message}</p>
            </>
          )}
        </div>
        <img
          src={
            gif ||
            "https://media2.giphy.com/media/6wM4Zhs4h4PGo/giphy.gif?cid=ecf05e47vnzgwnsg18scojzckaooq8xb38utdlgxirbch6ex&rid=giphy.gif&ct=g"
          }
          alt={item.name || gif}
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{item?.timestamp}</p>
        </div>
      </div>
    </div>
  );
};
const Transaction = () => {
  const { connectedAccount, transactions } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {connectedAccount.length > 0 || localStorage.getItem("connectedAccount") > 0  && (
          <>
            <div className="text-white text-3xl text-center my-2">
              Latest Transactions
            </div>
            <div className="flex flex-wrap justify-center items-center mt-10">
              {transactions.reverse().map((item, index) => {
                return <TransactionCard item={item} key={index} />;
              })}
            </div>
          </>
        )}
        {connectedAccount.length === 0 || localStorage.getItem("connectedAccount") === 0  && (
          <div className="text-white text-3xl text-center my-2">
            Please connect to wallet to view transactions
          </div>
        )}
      </div>
    </div>
  );
};

export default Transaction;
