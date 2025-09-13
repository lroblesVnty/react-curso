import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { ThemeProvider } from "@mui/material/styles";
import theme from './constants/theme'
import { AuthProvaider } from './context/authContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <React.StrictMode>
        <BrowserRouter>
         <ThemeProvider theme={theme}>
            <AuthProvaider>
                <div className='app'>
                    <App />
                </div>
            </AuthProvaider>
         </ThemeProvider> 
        </BrowserRouter>           
    </React.StrictMode>
  
)
