import { Box, Typography, Avatar, Alert, Divider } from "@mui/material";
import { LockOutlined, PeopleAltOutlined, FaceOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup'
import styles from "./Login.module.css"
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";


export default function Login() {

  //! Function to handle form submission
  const { login, loading, apiError } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      await login(values);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  }

  //! Validation schema for form inputs
  let validationSchema = Yup.object().shape({
    username: Yup.string().min(3, "Username must be at least 3 characters").max(20, "Username must be at most 20 characters").required("Username is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, "Password must contain at least one letter and one number").required("Password is required"),
  })

  //! Formik configuration
  let formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin
  })

  return (
    <Box sx={{
      display: "flex", alignItems: "center",
      justifyContent: "center", height: "100vh", flexDirection: "column",
      background: "linear-gradient(135deg, #ffffff 0%, #e6e6e6 50%, #cccccc 100%)",
    }}>
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <Avatar sx={{ bgcolor: "#333", width: 60, height: 60, mb: 1, mx: "auto" }}> <PeopleAltOutlined fontSize="large" /> </Avatar>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333", textAlign: "center" }}> Client Management </Typography>
          <Divider sx={{ backgroundColor: "#333", mb: 1, height: 3, width: "50%", mx: "auto" }} />

          <form onSubmit={formik.handleSubmit}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333", textAlign: "left" }}> Welcome back </Typography>

            {apiError && <Alert sx={{ mt: 0, py: 0, borderRadius: "40px" }} severity="error">{apiError}</Alert>}

            <div className="username">
              <div className={styles.inputBox}>
                <div className="relative">
                  <input className={styles.input} placeholder="Username" name="username" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} margin="normal" variant="outlined" label="Username" type="text" />
                  <label className={styles.label} htmlFor="username">Username</label>
                  <FaceOutlined sx={{ color: "gray", mr: 1, position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }} />
                </div>
                {formik.touched.username && formik.errors.username && <Alert sx={{ mt: 1, py: 0, borderRadius: "40px" }} severity="error">{formik.errors.username}</Alert>}
              </div>
            </div>

            <div className="password">
              <div className={styles.inputBox}>
                <div className="relative">
                  <input className={styles.input} placeholder="Password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} margin="normal" variant="outlined" label="Password" type="password" />
                  <label className={styles.label} htmlFor="password">Password</label>
                  <LockOutlined sx={{ color: "gray", mr: 1, position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }} />
                </div>
                {formik.touched.password && formik.errors.password && <Alert sx={{ mt: 1, py: 0, borderRadius: "40px" }} severity="error">{formik.errors.password}</Alert>}
              </div>
            </div>

            <div className={styles.additional}>
              {loading ?
                <button type="submit" className={styles.btn}>
                  <p>Loading...</p>
                </button>
                : <button type="submit" className={styles.btn}> Sign in </button>}
            </div>
          </form>
        </div>

        {[...Array(50)].map((_, i) => (
          <span key={i} style={{ "--i": i }}></span>
        ))}
      </div>
      {/* <ToastContainer /> */}
    </Box>
  );
}
