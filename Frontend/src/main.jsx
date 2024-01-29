import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


import HomeScreen from './pages/HomeScreen.jsx'
const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const router =createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <App/>}>
    <Route index={true} path="/" element={ <HomeScreen/>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}/>
      </ThemeProvider>
  </React.StrictMode>
);
