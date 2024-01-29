import { useState } from 'react'
import './App.css'
import Layout from './components/Layout.jsx'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <>
     <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Layout />
      <Outlet />
      </Box>
    </>
  )
}

export default App
