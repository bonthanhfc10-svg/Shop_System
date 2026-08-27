import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import Home from '../pages/vibe/Home';
import Shop from '../pages/vibe/Shop';
import Category from '../pages/vibe/Category';
import ProductDetails from '../pages/vibe/ProductDetails';
import CartPage from '../pages/vibe/Cart';
import Checkout from '../pages/vibe/Checkout';
import Wishlist from '../pages/vibe/Wishlist';
import VibeLogin from '../pages/vibe/Login';
import VibeRegister from '../pages/vibe/Register';
import NotFound from '../pages/vibe/NotFound';
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

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="category/:category" element={<Category />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="login" element={<VibeLogin />} />
        <Route path="register" element={<VibeRegister />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {AdminRoutes()}
      {UserRoutes()}

      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
