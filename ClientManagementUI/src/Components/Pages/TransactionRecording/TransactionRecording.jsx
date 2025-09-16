import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { ClientContext } from "../../../Context/ClientContext";
import { TransactionContext } from "../../../Context/TransactionContext";

export default function TransactionRecordingPage() {
  const theme = useTheme();
  const { clients, getClients, loading } = useContext(ClientContext);
  const { addTransaction } = useContext(TransactionContext);

  useEffect(() => {
    getClients();
  }, []);

  const validationSchema = Yup.object({
    clientId: Yup.string().required("Client is required"),
    transactionType: Yup.string().required(),
    amount: Yup.number()
      .positive("Amount must be positive")
      .required("Amount is required"),
  });

  const formik = useFormik({
    initialValues: {
      clientId: "",
      transactionType: "deposit",
      amount: "",
    },
    validationSchema: validationSchema,
    onSubmit: addTransaction,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 flex justify-center bg-gradient-to-br from-blue-50 to-blue-100 min-h-[90vh]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full md:w-2/3 lg:w-1/2"
      >
        <Card elevation={8}
          sx={{ borderRadius: 5, overflow: "hidden", background: "white", }} >
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <AccountBalanceWalletIcon
                sx={{ fontSize: 35, color: theme.palette.primary.main }}
              />
              <Typography variant="h5"
                sx={{ fontWeight: "bold", color: theme.palette.primary.main, }} >
                Record Transaction
              </Typography>
            </div>

            <form className="space-y-5" onSubmit={formik.handleSubmit}>
              <TextField sx={{ mb: 2 }}
                select
                fullWidth
                label="Select Client"
                name="clientId"
                value={formik.values.clientId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.clientId && Boolean(formik.errors.clientId)}
                helperText={formik.touched.clientId && formik.errors.clientId}
              >
                {clients?.map((client) => (
                  <MenuItem key={client.id} value={client.id}>
                    {client.name} — 💰 {client.currentBalance?.toLocaleString() || 0}
                  </MenuItem>
                ))}
              </TextField>

              <TextField sx={{ mb: 2 }}
                select
                fullWidth
                label="Transaction Type"
                name="transactionType"
                value={formik.values.transactionType}
                onChange={formik.handleChange}
              >
                <MenuItem value="deposit">Deposit</MenuItem>
                <MenuItem value="withdraw">Withdraw</MenuItem>
              </TextField>

              <TextField sx={{ mb: 2 }}
                fullWidth
                type="number"
                label="Amount"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={formik.isSubmitting}
                  sx={{
                    borderRadius: "12px",
                    py: 1.5,
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {formik.isSubmitting ? <CircularProgress size={24} /> :
                    "Submit Transaction"
                  }
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div >
  );
}
