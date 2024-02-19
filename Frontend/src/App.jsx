import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import HomeScreen from './pages/HomeScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
  // Define your theme properties here
  // For example: palette: { primary: { main: '#3498db' }, secondary: { main: '#2ecc71' } }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
          <Routes>
            <Route path="/" element={<HomeScreen/>}/>
            <Route path="/login" component={<Login/>} />
          </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

