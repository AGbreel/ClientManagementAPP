import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { TransactionContext } from "../../../Context/TransactionContext";

export default function TransactionLogPage() {
  const theme = useTheme();
  const { transactions, getTransactions, loading } = useContext(TransactionContext);

  useEffect(() => {
    getTransactions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        {/* <CircularProgress /> */}
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Card elevation={6} sx={{ borderRadius: 5 }}>
          <CardContent>
            <Typography variant="h5"
              sx={{ fontWeight: "bold", mb: 3, color: theme.palette.primary.main }} >
              Transaction Log
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 5 }}>
              <Table>
                <TableHead className="bg-gray-200">
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}> Client </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}> Transaction Type </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}> Amount </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}> Date & Time </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}> Balance After </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {transactions?.map((t, index) => (
                    <motion.tr
                      key={t.id}
                      initial={{ opacity: 0, x: -60 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <TableCell>{t.clientName}</TableCell>
                      <TableCell
                        sx={{
                          color:
                            t.transactionType?.toLowerCase().trim() === "deposit"
                              ? "green"
                              : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {t.transactionType}
                      </TableCell>
                      <TableCell>{t.amount.toLocaleString()} EGP</TableCell>
                      <TableCell>
                        {/* {new Date(t.date).toLocaleString()} */}
                        {dayjs(t.transactionDate).format("YYYY-MM-DD (HH:mm:ss)")}
                      </TableCell>
                      <TableCell>
                        {t.balanceAfter?.toLocaleString() || 0} EGP
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
