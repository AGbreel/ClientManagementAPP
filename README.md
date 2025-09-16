💳 Banking Management System
📌 Overview

A full-stack project for managing clients and banking transactions.
It provides a web interface to add clients, record transactions, and view detailed logs.
The project is built with React (MUI + TailwindCSS) for the frontend, and ASP.NET Core + SQL Server for the backend.
#=======================================================================================================================
⚙️ Features
🔑 Authentication: Sign in with a predefined user.
👥 Client Management:
  - Add a new client (AddClient).
  - View all clients (GetClients).
  - Get client details by ID (GetClientById).
💰 Transactions:
  - Add new transaction (AddTransaction).
  - View all transactions (GetTransactions).
📊 Dashboard: Overview of clients and transactions.
#=======================================================================================================================
🗄️ Database (SQL Server)
Stored Procedures:
  - AddClient → Insert a new client.
  - GetClients → Fetch all clients.
  - GetClientById → Get client details by ID.
  - AddTransaction → Insert a new transaction (deposit/withdraw).
  - GetTransactions → Fetch all transactions.
  - SignIn → Handle login authentication.

Tables:
  - Clients → Stores client info (ClientId, Name, NationalId, Age, AccountNumber, MaxCreditBalance, CurrentBalance).
  - Transactions → Stores transactions (TransactionId, ClientId, TransactionType, TransactionAmount, TransactionDate, BalanceAfterTransaction).
  - Users → Stores login credentials.
#=======================================================================================================================
🖥️ Backend (ASP.NET Core Web API)
Stack: C#, ASP.NET Core, SQL Server.

Endpoints:
  - POST /api/Auth/login → Sign in.
  - POST /api/clients → Add client.
  - GET /api/clients → Get all clients.
  - GET /api/clients/{id} → Get client by ID.
  - POST /api/transactions → Add transaction.
  - GET /api/transactions → Get all transactions.
#=======================================================================================================================
🎨 Frontend (React)
Stack: React, MUI, TailwindCSS, Axios.

Pages:
  - Login Page → User authentication.
  - Dashboard → General overview.
  - Client List → Displays all clients.
  - Client Management → Add clients.
  - Transaction Log → View all transactions.
  - Transaction Records → Add transaction for specific Client.
#=======================================================================================================================
🚀 How to Run
Backend
--------------
cd ClientManagementApi
dotnet restore
dotnet run
--------------

Frontend
--------------
cd ClientManagementUI
npm install
npm start
--------------
#=======================================================================================================================
📷 Screenshots
<img width="1222" height="913" alt="API" src="https://github.com/user-attachments/assets/59815a4d-ab1e-46c2-9e3e-c187bb101025" />
