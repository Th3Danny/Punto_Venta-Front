import { store } from '@/redux/store';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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
const Sales = lazy(() => import('@/pages/sales/sales'));
const Reports = lazy(() => import('@/pages/reports/reports'));
const Product = lazy(() => import('@/pages/product/product'));
const Users = lazy(() => import('@/pages/users/users'));
const SalesDetails = lazy(() => import('@/pages/sales-details/sales-details'));

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
                          path="/sales"
                          element={
                            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER", "CASHIER", "GERENTE", "CAJERO"]}>
                              <Sales />
                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="/reports"
                          element={
                            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER", "GERENTE"]}>
                              <Reports />
                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="/product"
                          element={
                            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER", "GERENTE"]}>
                              <Product />
                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="/users"
                          element={
                            <ProtectedRoute allowedRoles={["ADMIN"]}>
                              <Users />
                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="/sales-details"
                          element={
                            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER", "CASHIER", "GERENTE", "CAJERO"]}>
                              <SalesDetails />
                            </ProtectedRoute>
                          }
                        />
                        {/* Compatibility: keep /pos redirecting to /sales if needed */}
                        <Route path="/pos" element={<Navigate to="/sales" replace />} />
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