import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import AccountBalanceOutlined from "@mui/icons-material/AccountBalanceOutlined";
import SwapHorizOutlined from "@mui/icons-material/SwapHorizOutlined";
import StarOutlineOutlined from "@mui/icons-material/StarOutlineOutlined";
import { Link } from "react-router-dom";
import { ClientContext } from "../../../Context/ClientContext";
import { TransactionContext } from "../../../Context/TransactionContext";
import dayjs from "dayjs";

export default function HomePage() {
  const theme = useTheme();

  const [stats, setStats] = useState({
    totalClients: 0,
    totalBalance: 0,
    totalTransactions: 0,
    topClientName: "N/A",
    topClientBalance: 0,
  });
  const [recentTxns, setRecentTxns] = useState([]);
  const { getClients } = useContext(ClientContext);
  const { getTransactions } = useContext(TransactionContext);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const clientsData = await getClients();
        const transactionsData = await getTransactions();

        // الحسابات
        const totalClients = clientsData.length;
        const totalBalance = clientsData.reduce(
          (sum, client) => sum + Number(client?.currentBalance || 0),
          0
        );
        const totalTransactions = transactionsData.length;

        // top client
        let topClient = null;
        if (clientsData.length > 0) {
          topClient = clientsData.reduce((max, client) =>
            Number(client.currentBalance) > Number(max.currentBalance)
              ? client
              : max
          );
        }

        setStats({
          totalClients,
          totalBalance,
          totalTransactions,
          topClientName: topClient ? topClient.name : "N/A",
          topClientBalance: topClient ? topClient.currentBalance : 0,
        });

        // The last 5 transactions
        setRecentTxns( transactionsData
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-6 md:p-10">
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}> Dashboard </Typography>

      {/* Quick Stats */}
      <Grid container spacing={3}>
        {[
          {
            title: "Total Clients",
            value: stats.totalClients,
            icon: <PeopleAltOutlined fontSize="large" />,
            color: theme.palette.primary.main,
          },
          {
            title: "Total Balance",
            value: `${stats.totalBalance} EGP`,
            icon: <AccountBalanceOutlined fontSize="large" />,
            color: theme.palette.success.main,
          },
          {
            title: "Transactions",
            value: stats.totalTransactions,
            icon: <SwapHorizOutlined fontSize="large" />,
            color: theme.palette.warning.main,
          },
          {
            title: "Top Client",
            value: `${stats.topClientName} (${stats.topClientBalance} EGP)`,
            icon: <StarOutlineOutlined fontSize="large" />,
            color: theme.palette.secondary.main,
          },
        ].map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: i * 0.25 }}
            >
              <Card
                className="shadow-lg rounded-2xl"
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderLeft: `6px solid ${item.color}`,
                }}
              >
                {item.icon}
                <div>
                  <Typography variant="body2" color="text.secondary">
                    {item.title}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {item.value}
                  </Typography>
                </div>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="mt-8 shadow-xl rounded-3xl overflow-hidden">
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Recent Transactions
            </Typography>
            <Table>
              <TableHead className="bg-gray-200">
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Client Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Date & Time</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Balance After</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {recentTxns.length > 0 ? (
                  recentTxns.map((txn) => (
                    <TableRow key={txn.id}>
                      <TableCell>{txn.clientName || "N/A"}</TableCell>
                      <TableCell>{txn.transactionType}</TableCell>
                      <TableCell>{txn.amount}</TableCell>
                      <TableCell>
                        {dayjs(txn.transactionDate).format("YYYY-MM-DD (HH:mm:ss)")}
                      </TableCell>
                      <TableCell>{txn.balanceAfter}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No transactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/client-management">
            <Button variant="contained" color="primary">
              Add Client
            </Button>
          </Link>

          <Link to="/transaction-recording">
            <Button variant="contained" color="secondary">
              New Transaction
            </Button>
          </Link>

          <Link to="/transaction-log">
            <Button variant="outlined" color="inherit">
              View Transaction Log
            </Button>
          </Link>

          <Link to="/client-list">
            <Button variant="outlined" color="inherit">
              View Client List
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
