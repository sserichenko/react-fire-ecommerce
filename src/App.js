import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductInfo from './pages/ProductInfo';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrdersPage from './pages/OrdersPage';
import './stylesheets/layout.css';
import './stylesheets/products.css';
import './stylesheets/authentication.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
      <BrowserRouter>
        <Routes>
          
          <Route
            path="/"
            exact
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
          
          <Route
            path="/productinfo/:productID"
            element={
              <ProtectedRoutes>
                <ProductInfo />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                <CartPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoutes>
                <OrdersPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoutes>
                <AdminPage />
              </ProtectedRoutes>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem('currentUser')) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
