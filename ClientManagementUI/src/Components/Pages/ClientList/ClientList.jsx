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
import { ClientContext } from "../../../Context/ClientContext";

export default function ClientListPage() {
  const theme = useTheme();
  const {clients, getClients, loading} = useContext(ClientContext)
  
  useEffect(() => {
    getClients();
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
              Client List
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 5 }}>
              <Table>
                <TableHead className="bg-gray-200">
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}> # </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}> Name </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}> National ID </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}> Age </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}> Account Number </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}> Current Balance </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {clients?.map((client, index) => (
                    <motion.tr
                      key={client.id}
                      initial={{ opacity: 0, x: -60 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.nationalId}</TableCell>
                      <TableCell>{client.age}</TableCell>
                      <TableCell>{client.accountNumber}</TableCell>
                      <TableCell>{client.currentBalance?.toLocaleString() || 0} EGP </TableCell>
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
