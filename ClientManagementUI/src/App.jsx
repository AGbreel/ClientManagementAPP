import React, { useState } from "react";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Pages/Home/Home";
import Login from "./Components/Pages/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ClientManagement from "./Components/Pages/ClientManagement/ClientManagement";
import TransactionRecording from "./Components/Pages/TransactionRecording/TransactionRecording";
import ClientList from "./Components/Pages/ClientList/ClientList";
import TransactionLog from "./Components/Pages/TransactionLog/TransactionLog";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AuthContextProvider from "./Context/AuthContext";
// import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import ClientContextProvider from "./Context/ClientContext";
import TransactionContextProvider from "./Context/TransactionContext";


function App() {

  let routers = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: 'client-management', element: <ProtectedRoute> <ClientManagement /> </ProtectedRoute> },
        { path: 'transaction-recording', element: <ProtectedRoute> <TransactionRecording /> </ProtectedRoute> },
        { path: 'client-list', element: <ProtectedRoute> <ClientList /> </ProtectedRoute> },
        { path: 'transaction-log', element: <ProtectedRoute> <TransactionLog /> </ProtectedRoute> },
        { path: 'login', element: <Login /> },
        { path: '*', element: <NotFound /> }
      ]
    }
  ])

  return (
    <>
      <AuthContextProvider>
        <ClientContextProvider>
          <TransactionContextProvider>
            <RouterProvider router={routers} />
            {/* <Toaster /> */}
            <ToastContainer />
          </TransactionContextProvider>
        </ClientContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
