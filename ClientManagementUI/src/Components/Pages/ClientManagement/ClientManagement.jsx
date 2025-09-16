import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  InputAdornment,
  useTheme,
  Stack,
  CircularProgress,
} from '@mui/material';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import BadgeOutlined from '@mui/icons-material/BadgeOutlined';
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import CreditCardOutlined from '@mui/icons-material/CreditCardOutlined';
import AccountBalanceWalletOutlined from '@mui/icons-material/AccountBalanceWalletOutlined';
import { ClientContext } from '../../../Context/ClientContext';


export default function AddClientPage() {
  const theme = useTheme();
  const { addClient } = useContext(ClientContext);

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Minimum 3 characters').required('Name is required'),
    nationalId: Yup.string()
      .matches(/^[0-9]{14}$/, 'National ID must be 14 digits')
      .required('National ID is required'),
    age: Yup.number()
      .min(0, 'Invalid age')
      .max(120, 'Invalid age')
      .required('Age is required'),
    accountNumber: Yup.string()
      .matches(/^[0-9]{6,20}$/, 'Account number should be 6-20 digits')
      .required('Account number is required'),
    maxCreditBalance: Yup.number()
      .min(0, 'Must be zero or positive')
      .required('Maximum credit balance is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      nationalId: '',
      age: '',
      accountNumber: '',
      maxCreditBalance: '',
    },
    validationSchema,
    onSubmit: addClient,
  });

  return (
    <div className="p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card elevation={6} className="max-w-5xl mx-auto overflow-hidden lg:mt-20" sx={{ borderRadius: 6 }}>
          <CardContent>
            <Stack direction={{ xs: "column", md: "row" }}
              spacing={4}
              alignItems={{ md: "end" }}
            >
              {/* The Image */}
              <motion.div
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 16 }}
                className="flex-1"
              >
                <Box
                  className="h-full flex flex-col justify-center p-6 rounded-3xl"
                  sx={{ background: `linear-gradient(135deg, ${theme.palette.primary.light}22, ${theme.palette.secondary.light}11)` }}
                >
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                    Add New Client
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fill the form to create a new client.
                  </Typography>

                  <img alt="Client"
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=60"
                    className="rounded-2xl w-full object-cover shadow-md mt-6"
                  />
                </Box>
              </motion.div>

              {/* The Form */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex-1"
              >
                <form onSubmit={formik.handleSubmit} className="p-2 md:p-4 mb-7">
                  <Stack spacing={3}>
                    <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
                      <TextField fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircleOutlined />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField fullWidth
                        id="nationalId"
                        name="nationalId"
                        label="National ID"
                        type="text"
                        value={formik.values.nationalId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.nationalId && Boolean(formik.errors.nationalId)}
                        helperText={formik.touched.nationalId && formik.errors.nationalId}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <BadgeOutlined />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Stack>

                    <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
                      <TextField fullWidth
                        id="age"
                        name="age"
                        label="Age"
                        type="number"
                        value={formik.values.age}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.age && Boolean(formik.errors.age)}
                        helperText={formik.touched.age && formik.errors.age}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarTodayOutlined />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField fullWidth
                        id="accountNumber"
                        name="accountNumber"
                        label="Account Number"
                        type="text"
                        value={formik.values.accountNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.accountNumber && Boolean(formik.errors.accountNumber)}
                        helperText={formik.touched.accountNumber && formik.errors.accountNumber}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CreditCardOutlined />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Stack>

                    <TextField fullWidth
                      id="maxCreditBalance"
                      name="maxCreditBalance"
                      label="Maximum Credit Balance"
                      type="number"
                      value={formik.values.maxCreditBalance}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.maxCreditBalance && Boolean(formik.errors.maxCreditBalance)}
                      helperText={formik.touched.maxCreditBalance && formik.errors.maxCreditBalance}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountBalanceWalletOutlined />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                      <Button variant="outlined"
                        onClick={() => formik.resetForm()}
                        disabled={formik.isSubmitting}
                      >
                        Reset
                      </Button>

                      <Button type="submit" variant="contained"
                        disabled={formik.isSubmitting}
                        sx={{ px: 4 }}
                      >
                        {formik.isSubmitting ? <CircularProgress size={20} /> : "Add Client"}
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </motion.div>
            </Stack>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
