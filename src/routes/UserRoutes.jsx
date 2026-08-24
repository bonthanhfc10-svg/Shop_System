import { Route } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import UserDashboard from '../pages/user/Dashboard';
import Profile from '../pages/user/Profile';
import MyOrders from '../pages/user/MyOrders';
import UserOrderDetails from '../pages/user/OrderDetails';
import Wishlist from '../pages/user/Wishlist';
import Addresses from '../pages/user/Addresses';
import PaymentMethods from '../pages/user/PaymentMethods';
import UserCoupons from '../pages/user/Coupons';
import UserReviews from '../pages/user/Reviews';
import Notifications from '../pages/user/Notifications';
import Support from '../pages/user/Support';
import ProtectedRoute from '../components/ProtectedRoute';

export default function UserRoutes() {
  return (
    <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<MyOrders />} />
        <Route path="orders/:id" element={<UserOrderDetails />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="addresses" element={<Addresses />} />
        <Route path="payment-methods" element={<PaymentMethods />} />
        <Route path="coupons" element={<UserCoupons />} />
        <Route path="reviews" element={<UserReviews />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="support" element={<Support />} />
      </Route>
    </Route>
  );
}
