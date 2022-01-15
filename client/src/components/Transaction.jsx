import {useContext} from "react";
import {TransactionContext} from "../context/TransactionContext";
import dummyData from "../utils/dummyData";
const Transaction = () => {
    const {connectedAccount} = useContext(TransactionContext);
    console.log("connectedAccount", connectedAccount || localStorage.getItem("connectedAccount"));
    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {
                    connectedAccount.length > 0 && (
                        <div className="text-white text-3xl text-center my-2">
                            Latest Transactions
                        </div>
                    )
                }
                {
                    connectedAccount.length === 0 && (
                        <div className="text-white text-3xl text-center my-2">
                            Please connect to wallet to view transactions
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Transaction;