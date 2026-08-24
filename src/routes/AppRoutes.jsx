import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import ShopLayout from '../layouts/ShopLayout';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import Home from '../pages/shop/Home';
import Shop from '../pages/shop/Shop';
import ProductDetails from '../pages/shop/ProductDetails';
import CartPage from '../pages/shop/Cart';
import Checkout from '../pages/shop/Checkout';
import OrderSuccess from '../pages/shop/OrderSuccess';
import AdminRoutes from './AdminRoutes';
import UserRoutes from './UserRoutes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
      </Route>

      <Route path="/" element={<ShopLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:id" element={<ProductDetails />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-success" element={<OrderSuccess />} />
      </Route>

      {AdminRoutes()}
      {UserRoutes()}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
