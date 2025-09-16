import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export let ClientContext = createContext();

export default function ClientContextProvider({ children }) {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    const getClients = async () => {
        try {
            let { data } = await axios.get("http://localhost:5098/api/clients");
            setClients(data);
            // console.log(data);
            return data;
        } catch (err) {
            console.error("Failed to fetch clients", err);
        } finally {
            setLoading(false);
        }
    };

    const addClient = async (values, { resetForm, setSubmitting }) => {
        try {
            setSubmitting(true);
            await axios.post("http://localhost:5098/api/clients", values);
            toast.success("Client added successfully");
            resetForm();
        } catch (err) {
            console.error("Error Response:", err.response?.data);
            let errorMessage = "Failed to add client";
            if (err.response) {
                const data = err.response.data;
                if (typeof data === "string") {
                    if (data.includes("duplicate key")) {
                        errorMessage = "This National ID or Account Number already exists!";
                    } else {
                        errorMessage = data.split("\r\n")[0];
                    }
                } else if (data?.message) {
                    errorMessage = data.message;
                }
            }

            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <ClientContext.Provider
            value={{
                clients,
                getClients,
                loading,
                addClient
            }}
        >
            {children}
        </ClientContext.Provider>
    );
};
