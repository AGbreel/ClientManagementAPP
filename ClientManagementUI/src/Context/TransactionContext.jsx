import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ClientContext } from "./ClientContext";

export let TransactionContext = createContext();

export default function TransactionContextProvider({ children }) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getClients } = useContext(ClientContext)

    const getTransactions = async () => {
        try {
            let { data } = await axios.get("http://localhost:5098/api/transactions");
            // sort by date (newest first)
            const sorted = data.sort(
                (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
            );
            setTransactions(sorted);
            // console.log(sorted);

            return sorted;
        } catch (err) {
            console.error("Failed to fetch transactions", err);
        } finally {
            setLoading(false);
        }
    };

    const addTransaction = async (values, { resetForm, setSubmitting }) => {
        try {
            setSubmitting(true);
            await axios.post("http://localhost:5098/api/transactions", values);
            toast.success("Transaction recorded successfully");
            await getClients();
            resetForm();
        } catch (err) {
            console.error("Transaction failed:", err.response?.data);
            toast.error(err.response?.data?.message || "Failed to record transaction");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <TransactionContext.Provider
            value={{
                transactions,
                getTransactions,
                loading,
                addTransaction
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};
