import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthentication, signup } from "../redux/auth/authActions";
import { Paper, TextField, Button, Typography, Container } from "@mui/material";

const Signup = ({ signup, loading, error }) => {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData, navigateTo);
  };
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(checkAuthentication());
    };

    fetchData();
  }, [dispatch]);
  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);
  return (
    <Container
      style={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        style={{
          width: 400,
          padding: 20,
        }}
      >
        {" "}
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
          {error && (
            <Typography style={{ color: "red", marginTop: 10 }}>
              {error.message}
            </Typography>
          )}
        </form>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
