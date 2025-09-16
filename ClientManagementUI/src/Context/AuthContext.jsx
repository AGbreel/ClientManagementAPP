import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export let AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [apiError, setApiError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userToken, setUserToken] = useState(localStorage.getItem("userToken") || null);

    const login = async (values) => {
        try {
            setLoading(true);
            setApiError(null);

            let { data } = await axios.post("http://localhost:5098/api/Auth/login", values);

            localStorage.setItem("userToken", data.token);
            setUserToken(data.token);
            toast.success("Login successfully")

        } catch (error) {
            console.log("Error Occurred: ", error);
            setApiError(error.response?.data?.message || "Login failed");
            toast.error(error.response?.data?.message || "Login failed")
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("userToken");
        setUserToken(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setUserToken(token);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                userToken,
                apiError,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
