import { store } from '@/redux/store';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AppContainer } from './styled-components';
import { theme } from '@/theme';
import { SnackbarUtilsConfigurator } from '@/utils';
import { Navbar, Footer, ProtectedRoute } from '@/components';
import { Box } from '@mui/material';

// Routes
const Login = lazy(() => import('@/pages/login/login'));
const Register = lazy(() => import('@/pages/register/register'));
const Home = lazy(() => import('@/pages/home/home'));
const POS = lazy(() => import('@/pages/sales/POS'));

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <SnackbarUtilsConfigurator />
          <Suspense fallback={<div>Loading ...</div>}>
            <Provider store={store}>
              <BrowserRouter>
                <AppContainer className="App">
                  {/* Layout con Navbar y Footer */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
                    <Navbar />

                    {/* Contenido principal */}
                    <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
                      <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route 
                          path="/home" 
                          element={
                            <ProtectedRoute>
                              <Home />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/pos" 
                          element={
                            <ProtectedRoute>
                              <POS />
                            </ProtectedRoute>
                          } 
                        />
                      </Routes>
                    </Box>

                    <Footer />
                  </Box>
                </AppContainer>
              </BrowserRouter>
            </Provider>
          </Suspense>
        </SnackbarProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;